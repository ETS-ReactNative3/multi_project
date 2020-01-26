const User = require('app/models/users');
const bcrypt = require('bcryptjs');
const ImageSize = require('image-size');
const FileType = require('file-type');
const mkdirp = require('mkdirp');
const path = require('path');
const fs = require('fs');

// const uniquestring = require('unique-string');
const nodemailer = require('nodemailer');

const MongoClient = require('mongodb').MongoClient;

const Multimedia = require('app/models/multimedia');
const Category = require('app/models/category');
const Survey = require('app/models/survey');
const Brand = require('app/models/brand');
const Product = require('app/models/product');
const Productspecs = require('app/models/p-specs');
const Productdetails = require('app/models/p-details');
const Details = require('app/models/details');
const Passwordreset = require('app/models/password-reset');

const resolvers = {
    Query : {
        login : async (param, args, { secretID }) => {
            const user = await User.findOne({ phone : args.input.phone, level : true});
            if(!user) {
                const error = new Error('اطلاعات کاربری که از آن برای ورود به حساب کاربری خود استفاده می کنید نامعتبر است!');
                error.code = 401;
                throw error
            }

            const isValid = await bcrypt.compare(args.input.password, user.password);
            if(!isValid) {
                const error = new Error('رمز عبور اشتباه است. مجددا تلاش نمایید و یا از بخش فراموشی رمز عبور نسبت به تغییر رمز خود اقدام کنید.');
                error.code = 401;
                throw error;
            }

            return {
                token : await User.CreateToken(user, secretID, '10h'),
            }
        },

        getUsers : async (param, args, { check }) => {
            
            if(!check) {
                const error = new Error('امکان دسترسی شما به اطلاعات وجود ندارد ابتدا در سیستم لاگین کنید و سپس اطلاعات مورد نظر را درخواست نمایید');
                error.code = 401;
                throw error;
            }

            const users = await User.find({});
            return users;
        },

        getProduct : async (param, args) => {
            const producs = await Product.find({});
            return producs
        },

        getAllCategory : async (param, args, { check }) => {
            if(check) {
                if(args.input.mainCategory == true) {
                    let page = args.input.page || 1;
                    let limit = args.input.limit || 10;
                    const categorys = await Category.find({ parent : null }).skip((page - 1) * limit).limit(limit).populate('parent').exec();
                    return categorys
                } else if (args.input.parentCategory == true) {
                        let page = args.input.page || 1;
                        let limit = args.input.limit || 10;
                        const categorys = await Category.find({ parent : args.input.catId }).skip((page - 1) * limit).limit(limit).populate('parent').exec();
                        return categorys
                } else {
                    let page = args.input.page || 1;
                    let limit = args.input.limit || 10;
                    const categorys = await Category.find({}).skip((page - 1) * limit).limit(limit).populate('parent').exec();
                    return categorys
                }
            } else {
                const error = new Error('دسترسی شما به اطلاعات مسدود شده است.');
                error.code = 401;
                throw error;
            }
        },


        // senMail : async (param, args) => {
        //     const transports = [];

        //     const directTransportOpts = {
        //         pool: false,
        //         direct: true,
        //         name: 'mail.example.com',
        //         from: 'no-reply@example.com',
        //       };
        //       transports.push(nodemailer.createTransport(directTransport(directTransportOpts)));
        //       // IMPORTANT: Copy-paste passed options from directTransport() to
        //       // transport's "options" property, to make sure it's available to MailTime package:
        //       transports[0].options = directTransportOpts;
              
        //         const email = ['m3hdi.sh71@gmail.com','hn.habibiyan@gmail.com','testesiiii@mail.com','miladmxm12@gmail.com','faribapanahpoore@rocketmail.com','kingamir_eh_2005@yahoo.com','errfgfdgtesttt@gmail.com','mohammad7979salehi@gmail.com']
        //             // create reusable transporter object using the default SMTP transport
        //         transports.push(nodemailer.createTransport({
        //             pool: false,
        //             direct: true,
        //             host: 'smtp.mailtrap.io',
        //             port: 587,
        //             secure: false, // true for 465, false for other ports
        //             auth: {
        //                 user: '07b731ed3a1449', // generated ethereal user
        //                 pass: 'f86bd85e55553e' // generated ethereal password
        //             },
        //             connectionTimeout: 30000,
        //             greetingTimeout: 15000,
        //             socketTimeout: 45000
        //         }));

        //         MongoClient.connect('mongodb://localhost', {useUnifiedTopology: true}, (error, client) => {
        //             const db = client.db('Digikala');
                   
        //             const mailQueue = new MailTime({
        //               db, // MongoDB
        //               type: 'server',
        //               strategy: 'balancer', // Transports will be used in round robin chain
        //               transports,
        //               maxTries : 60,
        //               interval : 10,
        //               revolvingInterval : 1536,
        //               minRevolvingDelay : 512,
        //               maxRevolvingDelay : 2048,
        //               from(transport) {
        //                 // To pass spam-filters `from` field should be correctly set
        //                 // for each transport, check `transport` object for more options
        //                 return '"Awesome App" <' + transport.options.from + '>';
        //               },
        //               concatEmails: true, // Concatenate emails to the same addressee
        //               concatDelimiter: '<h1>{{{subject}}}</h1>', // Start each concatenated email with it's own subject
        //               template: MailTime.Template // Use default template
        //             });

        //             for (let index = 0; index < email.length ; index++) {
        //                 mailQueue.sendMail({
        //                     to: `${email[index]}`,
        //                     subject: 'You\'ve got an email!',
        //                     text: 'Plain text message',
        //                     html: '<h1>HTML</h1><p>Styled message</p>',
        //                   });
        //             }
        //         });

        //     return {
        //         status : 200,
        //         message : 'email send'
        //     }

        // }

        getAllBrand : async (param, args, { check }) => {
            if(check) {
                let page = args.input.page || 1;
                let limit = args.input.limit || 10;
                if(args.input.getAll == true) {
                    const brands = await Brand.find({}).skip((page - 1) * limit).limit(limit).populate('category').exec();
                    return brands;
                } else {
                    const brands = await Brand.find({category : args.input.category});
                    return brands
                }
            } else {
                const error = new Error('این شماره تلفن قبلا در سیستم ثبت شده است!');
                error.code = 401;
                throw error;
            }
        }
    },

    Mutation : {
        register : async (param, args) => {            
            const person = await User.findOne({ phone : args.input.phone});
        
            if(!person) {
                const salt = await bcrypt.genSaltSync(15);
                const hash = await bcrypt.hashSync(args.input.password, salt);
                const user = await new User({
                    phone : args.input.phone,
                    password : hash,
                    ...args
                });
                
                await user.save();
                return {
                    status : 200,
                    message : 'اطلاعات شما با موفقیت ثبت شد. می توانید به حساب کاربری خود لاگین نمایید.'
                };
            } else {
                const error = new Error('این شماره تلفن قبلا در سیستم ثبت شده است!');
                error.code = 401;
                throw error
            }
        },

        multimedia : async (param, args, { check }) => {
            
            const { createReadStream, filename } = await args.file;
            const type = await FileType.fromFile(args.file);
            const stream = createReadStream();
            const { filePath } = await Multimedia.SaveFile({ stream, filename});
            if(!filePath) {
                const error = new Error('امکان ذخیره فایل در پرونده چند رسانه ای وجود ندارد.');
                error.code = 401;
                throw error;
            }

            const file = await new Multimedia({
                name : filename,
                dimwidth : getImageSize(type).dimwidth,
                dimheight :getImageSize(type).dimheight,
                dir : filePath
            })

            await file.save(err => {
                if(err) {
                    const error = new Error('امکان ذخیره فایل در پرونده چند رسانه ای وجود ندارد.');
                    error.code = 401;
                    throw error;
                }
            })

        },


        category : async (param, args, { check }) => {
            if(check) {
                const category = await Category.create({
                    name : args.input.name,
                    label : args.input.label,
                    parent : args.input.parent,
                })
                
                if(!category) {
                    const error = new Error('دسته بندی مورد نظر ذخیره نشد!');
                    error.code = 401;
                    throw error;
                
                } else {
                    return {
                        status : 200,
                        message : 'دسته بندی مورد نظر ایجاد شد.'
                    }
                }

            } else {
                const error = new Error('دسترسی شما به اطلاعات مسدود شده است.');
                error.code = 401;
                throw error;
            }
        },

        survey : async (param, args, { check }) => {
            if(check) {
                const ser = await new Survey({
                    category : args.input.category,
                    list : args.input.list,
                })
    
                await ser.save(err => {
                    if(err) {
                        const error = new Error('امکان ایجاد فیلد نظرسنجی برای این دسته بندی وجود ندارد.');
                        error.code = 401;
                        throw error;
                    }
                })
    
                return {
                    status : 200,
                    message : 'فیلد نظرسنجی برای این دسته بندی ایجاد شد.'
                }
            } else {
                const error = new Error('دسترسی شما به اطلاعات مسدود شده است.');
                error.code = 401;
                throw error;
            }
        },

        brand : async (param, args, { check }) => {
            if(check) { 
                const { createReadStream, filename } = await args.input.image;
                const stream = createReadStream();
                const { filePath } = await saveImage({ stream, filename});

                const brand = await Brand.create({
                    category : args.input.category,
                    name : args.input.name,
                    label : args.input.label,
                    image : filePath
                });

                if(!brand) {
                    if(err) {
                        const error = new Error('امکان ثبت برند مورد نظر برای این دسته بندی وجود ندارد.');
                        error.code = 401;
                        throw error;
                    }
                } else {
                    return {
                        status : 200,
                        message : 'برند برای دسته بندی مورد نظر ثبت شد.'
                    }
                }

            } else {
                const error = new Error('دسترسی شما به اطلاعات مسدود شده است.');
                error.code = 401;
                throw error;
            }
        },

        product : async (param, args, { check }) => {
            if(check) {
                const details = await saveDetailsValue(args.input.details);
                const pro = await Product({
                     fname : args.input.fname,
                     ename : args.input.ename,
                     details : details,
                     image : args.input.image
                })
    
                await pro.save(err => {
                    if(err) {
                        const error = new Error('امکان درج محصول جدید وجود ندارد.');
                        error.code = 401;
                        throw error;
                    }
                });
    
                return {
                    status : 200,
                    message : 'محصول مورد نظر ثبت شد.'
                }
            } else {
                const error = new Error('دسترسی شما به اطلاعات مسدود شده است.');
                error.code = 401;
                throw error;
            }
        },

        productSpecs : async (param, args, { check }) => {
            if(check) {
                const ProSpecs = await new Productspecs({
                    category : args.input.category,
                    specs : args.input.specs,
                    label : args.input.label
                })
    
                await ProSpecs.save(err => {
                    if(err) {
                        const error = new Error('امکان درج لست جزئیات مشخصات محصول وجود ندارد.');
                        error.code = 401;
                        throw error;
                    }
                });
    
                return {
                    status : 200,
                    message : 'لیست اصلی مربوط به مشخصات محصول ذخیره شد.'
                }
            } else {
                const error = new Error('دسترسی شما به اطلاعات مسدود شده است.');
                error.code = 401;
                throw error;
            }
        },

        productSpecsDetails : async (param, args, { check }) => {
            if(check) {
                const ProSpecsDetails = await new Productdetails({
                    specs : args.input.specs,
                    name : args.input.name,
                    label : args.input.label
                })
    
                ProSpecsDetails.save(err => {
                    if(err) {
                        const error = new Error('امکان درج لست جزئیات مشخصات محصول وجود ندارد.');
                        error.code = 401;
                        throw error;
                    }
                });
    
                return {
                    status : 200,
                    message : 'لیست جزئیات مربوط به مشخصات محصول ذخیره شد.'
                }
            } else {
                const error = new Error('دسترسی شما به اطلاعات مسدود شده است.');
                error.code = 401;
                throw error;
            }
        },

        productDetailsValue : async (param, args, { check }) => {
            if(check) {
                const detail = await new Details({
                    p_details : args.input.p_details,
                    value : args.input.value,
                    label : args.input.label
                })
    
                await detail.save(err =>{
                    if(err) {
                        const error = new Error('امکان درج جزئیات مشخصات محصول وجود ندارد.');
                        error.code = 401;
                        throw error;
                    }
                })
    
                return {
                    status : 200,
                    message : 'ok'
                }
            } else {
                const error = new Error('دسترسی شما به اطلاعات مسدود شده است.');
                error.code = 401;
                throw error;
            }
        },

        UserForgetPassword : async (param, args) => {
            const user = await User.findOne({ phone : args.input.phone});
            if(!user) {
                const error = new Error('کاربری با این شماره تلفن در سیستم ثبت نام نکرده است.');
                error.code = 401;
                throw error;
            }

            const password_reset = await new Passwordreset({
                phone : args.input.phone,
                code : Math.floor(Math.random() * (9999 - 999)) + 999
            });

            await password_reset.save(err => {
                if(err) {
                    const error = new Error('امکان درج لست جزئیات مشخصات محصول وجود ندارد.');
                    error.code = 401;
                    throw error;
                }
            })

            // send SMS

            return {
                status : 200,
                message : 'عبارت امنیتی تغییر گذر واژه برای شما ارسال شد.'
            }
        },

        UserResetPassword : async (param, args) => {
            const check = await Passwordreset.findOne({$and : [{ phone : args.input.phone}, { code : args.input.code}]});
            if(!check) {
                const error = new Error('امکان تغییر پسورد برای این حساب کاربری وجود ندارد.');
                error.code = 401;
                throw error;
            }

            if(check.use) {
                const error = new Error('این کد تغییر گذر واژه قبلا استفاده شده است!');
                error.code = 401;
                throw error;
            }

            return {
                status : 200,
                message : 'می توانید از طریق فرم زیر گذر واژه خود را تغییر دهید.'
            }
        },

        ResetPassword : async (param, args) => {
        
            if(args.input.password === args.input.repassword) {
                
                const salt = await bcrypt.genSaltSync(15);
                const hash = await bcrypt.hashSync(args.input.password, salt);
                const user = await User.findOneAndUpdate({ phone : args.input.phone}, { $set : { password : hash}});
                
                if(!user) {
                    const error = new Error('گاربری با این شماره همراه درسیستم ثبت نام نکرده است.');
                    error.code = 401;
                    throw error;
                }

                await Passwordreset.findOneAndUpdate({ phone  : args.input.phone}, { $set : { use : true}});

                return {
                    status : 200,
                    message : 'گذر واژه تغییر کرد. می توانید وارد حساب کاربری خود شوید.'
                }
            }
        },

    },
}

let saveDetailsValue = async (args) => {
    const arr = [];
    for (let index = 0; index < args.length; index++) {
        const element = args[index];
                    const op = await new Details({
                        p_details : element.p_details,
                        value : element.value,
                        label : element.label
                    })

                    await op.save(async err => {
                                                if(err) {
                                                    const error = new Error('امکان درج محصول جدید وجود ندارد.');
                                                    error.code = 401;
                                                    throw error;
                                                } 
                                            });

                    arr[index] = op._id

    }
    return arr;
}

let getImageSize = (type) => {
    if(type.ext === ('png' || 'jpg' || 'jpeg')) {
        ImageSize(args.file, (err, dimension) => {
            if(err) {
                const error = new Error('فایل نامعتبر است!');
                error.code = 401;
                throw error
            } else {

                return {
                    dimwidth : dimension.width,
                    dimheight : dimension.height
                }
            }
        })
    }
}

let saveImage = ({stream, filename}) => {
    let date = new Date();
    const dir = `/uploads/${date.getFullYear()}/${date.getMonth() + 1}`;
    mkdirp.sync(path.join(__dirname, `public/${dir}`));

    const filePath = `${dir}/${filename}`;

    return new Promise((resolve, reject) => {
        stream
            .pipe(fs.createWriteStream(path.join(__dirname, `/public/${filePath}`)))
            .on('error', error => reject(error))
            .on('finish', () => resolve({filePath}))
    })

}

module.exports = resolvers;