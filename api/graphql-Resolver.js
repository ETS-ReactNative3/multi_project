const User = require('app/models/users');
const bcrypt = require('bcryptjs');
const ImageSize = require('image-size');
const FileType = require('file-type');
const mkdirp = require('mkdirp');
const path = require('path');
const fs = require('fs');

// const uniquestring = require('unique-string');
// const nodemailer = require('nodemailer');
// const directTransport = require('nodemailer-direct-transport');
// const MailTime = require('mail-time');

// const MongoClient = require('mongodb').MongoClient;

const Multimedia = require('app/models/multimedia');
const Category = require('app/models/category');
const Survey = require('app/models/survey');
const Brand = require('app/models/brand');
const Product = require('app/models/product');
const Seller = require('app/models/seller');
const Warranty = require('app/models/warranty');
const Productspecs = require('app/models/p-specs');
const Productdetails = require('app/models/p-details');
const Details = require('app/models/details');
const Passwordreset = require('app/models/password-reset');
const Productattribute = require('app/models/p_attribute');
const Slider = require('app/models/slider');
const Comment = require('app/models/comment');
const Vsurvey = require('app/models/v-survey');


const resolvers = {
    Query : {
        login : async (param, args, { secretID }) => {
            const user = await User.findOne({ phone : args.input.phone});
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

        getUsers : async (param, args, { check, isAdmin }) => {

            if(check && isAdmin) {
                const users = await User.find({});
                return users;
            } else {
                const error = new Error('دسترسی شما به اطلاعات مسدود شده است.');
                error.code = 401;
                throw error;
            }
        },

        getProduct : async (param, args, { check, isAdmin }) => {
            if(check && isAdmin) {
                if(args.productId == null) {
                    let page = args.page || 1;
                    let limit = args.limit || 10;
                    const producs = await Product.paginate({}, {page, limit, sort : { createdAt : 1}, populate : [{ path : 'brand'}, { path : 'attribute', populate : [{path : 'seller'}, {path : 'warranty'}]}]});
                    return producs.docs
                } else {
                    const product = await Product.findById({ _id : args.productId}).populate([{ path : 'brand'}, { path : 'attribute', populate : [{path : 'seller'}, {path : 'warranty'}]}, { path : 'category', populate : { path : 'parent', populate : { path : "parent"}}}, { path : 'details', populate : { path : 'p_details', populate : { path : 'specs'}}}])
                    return [product]
                }
            } else {
                const error = new Error('دسترسی شما به اطلاعات مسدود شده است.');
                error.code = 401;
                throw error;
            }
        },

        getAllCategory : async (param, args, { check, isAdmin }) => {
            if(check && isAdmin) {
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

        getAllBrand : async (param, args, { check, isAdmin }) => {
            if(check && isAdmin) {
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
        },

        getAllSurvey : async (param, args, { check, isAdmin }) => {
            if(check) {
                const list = await Survey.findOne({ category : args.categoryId});
                if(list) {
                    return list
                } else {
                    const error = new Error('هیچ فیلد نظر سنجی برای این دسته بندی وجود ندارد!');
                    error.code = 401;
                    throw error;
                }
            } else {
                const error = new Error('این شماره تلفن قبلا در سیستم ثبت شده است!');
                error.code = 401;
                throw error;
            }
        },

        getAllProductSpecs : async (param, args, { check, isAdmin }) => {
            if(check && isAdmin) {
                const specs = await Productspecs.find({ category : args.categoryId});
                if(!specs) {
                    const error = new Error('برای دسسته بندی مورد نظر اطلاعاتی وجود ندارد!');
                    error.code = 401;
                    throw error;
                }
                return specs
            } else {
                const error = new Error('دسترسی شما به اطلاعات مسدود شده است.');
                error.code = 401;
                throw error;
            }
        },

        getAllProductSpecsDetails : async (param, args, { check, isAdmin }) => {
            if(check && isAdmin) {
                const specs_details = await Productdetails.find({ specs : args.specsId});
                if(!specs_details) {
                    const error = new Error('برای این دسته بندی و جزئیات آن اطلاعاتی ثبت نشده است!');
                    error.code = 401;
                    throw error;
                }
                return specs_details
            } else {
                const error = new Error('دسترسی شما به اطلاعات مسدود شده است.');
                error.code = 401;
                throw error;
            }
        },

        getAllSeller : async (param, args, { check, isAdmin }) => {
            if(check && isAdmin) {
                const sellers = await Seller.find({ category : args.categoryId});
                if(!sellers) {
                    const error = new Error('برای این دسته بندی فروشنده ای ثبت نشده است!');
                    error.code = 401;
                    throw error;
                } else {
                    return sellers;
                }
            } else {
                const error = new Error('دسترسی شما به اطلاعات مسدود شده است.');
                error.code = 401;
                throw error;
            }
        },

        getAllWarranty : async (param, args, { check, isAdmin }) => {
            if(check && isAdmin) {
                const warrantys = await Warranty.find();
                if(!warrantys) {
                    const error = new Error('هیچ گارانتی ثبت نشده است!');
                    error.code = 401;
                    throw error;
                }
                return warrantys;
            } else {
                const error = new Error('دسترسی شما به اطلاعات مسدود شده است.');
                error.code = 401;
                throw error;
            }
        },

        getAddProductInfo : async (parm, args, { check, isAdmin }) => {

            if(check && isAdmin) {

                if(args.getSubCategory == true && args.subCategoryId != null) {
                    const subcats = await Category.find({parent : args.subCategoryId});
                    const brands = await Brand.find({category : args.subCategoryId});
                    const specs = await Productspecs.find({category : args.subCategoryId}).populate('details').exec();
                    return {
                        subcats,
                        brands,
                        specs
                    }
                }

                else if(args.getSubCategory == false && args.categoryId != null) {
                    const sellers = await Seller.find({category : args.categoryId});
                        
                    if(!sellers) {
                        const error = new Error('هیچ فروشنده ای در این دسته بندی قرار ندارد!');
                        error.code = 401;
                        throw error;
                    } else {
                        return {
                            sellers
                        }
                    }
                } else {
                    const error = new Error('درخواست شما اعتبار لازم را نداید!');
                    error.code = 401;
                    throw error;
                }

            } else {
                const error = new Error('دسترسی شما به اطلاعات مسدود شده است.');
                error.code = 401;
                throw error;
            }
        },

        // MainPageApp : async (param, args, { check }) => {
        //     const slider = await Slider.find().limit(3).sort({created_at : -1}).exec();
        //     const category = await Category.find({ parent : null});
        //     const Asuggestion = await Product.paginate({}, { populate : {path : 'attribute', match : { discount : !null}}});
        //     const banerDiscount = await Product.paginate({}, { populate : [{path : 'attribute', match : { discount : !null}}, {path : 'category'}]});
            
        // }

        getAllComment : async (param, args, { check }) => {
            if(check) {
                    let page = args.page || 1;
                    let limit = args.limit || 10;
                    const comments = await Comment.paginate({product : args.productId}, {page, limit, populate : [{ path : 'user'}, { path : 'product'}, { path : 'survey' , populate : { path : 'survey'}}]})

                    if(!comments) {
                        return {
                            status : 401,
                            message : 'گامنتی برای این محصول ثبت نشده است!'
                        }
                    }

                    return comments.docs
            } else {
                const error = new Error('دسترسی شما به اطلاعات مسدود شده است.');
                error.code = 401;
                throw error;
            }
        }

    },

    Mutation : {
        register : async (param, args) => {            
            try {
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
            } catch {
                const error = new Error('ارنباط با سرور محدود شده است!!');
                error.code = 401;
                throw error
            }
        },

        multimedia : async (param, args, { check, isAdmin }) => {
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

        category : async (param, args, { check, isAdmin }) => {
            if(check && isAdmin) {
                    try {
                        await Category.create({
                            name : args.input.name,
                            label : args.input.label,
                            parent : args.input.parent,
                        })

                            return {
                                status : 200,
                                message : 'دسته بندی مورد نظر ایجاد شد.'
                            }
                        
        
                    } catch {
                        const error = new Error('دسته بندی مورد نظر ذخیره نشد!');
                        error.code = 401;
                        throw error;
                    }
            } else {
                const error = new Error('دسترسی شما به اطلاعات مسدود شده است.');
                error.code = 401;
                throw error;
            }
        },

        survey : async (param, args, { check, isAdmin }) => {
            if(check && isAdmin) {
                try {
                    if(!await Category.findOne({_id : args.input.category})) {
                            return {
                                status : 200,
                                message : 'چنین دسته بندی وجود ندارد!'
                            }
                    } else {
                        await Survey.create({
                            category : args.input.category,
                            name : args.input.name,
                            label : args.input.label
                        })
    
                            return {
                                status : 200,
                                message : 'فیلد نظرسنجی برای این دسته بندی ایجاد شد.'
                            }
                    }
                    
                } catch {
                    const error = new Error('امکان ایجاد فیلد نظرسنجی برای این دسته بندی وجود ندارد.');
                    error.code = 401;
                    throw error;
                }

            } else {
                const error = new Error('دسترسی شما به اطلاعات مسدود شده است.');
                error.code = 401;
                throw error;
            }
        },

        brand : async (param, args, { check, isAdmin }) => {
            if(check && isAdmin) { 
                try {
                    const { createReadStream, filename } = await args.input.image;
                    const stream = createReadStream();
                    const { filePath } = await saveImage({ stream, filename});
    
                    await Brand.create({
                        category : args.input.category,
                        name : args.input.name,
                        label : args.input.label,
                        image : filePath
                    });

                        return {
                            status : 200,
                            message : 'برند برای دسته بندی مورد نظر ثبت شد.'
                        }
                    
                } catch {
                    const error = new Error('امکان ثبت برند مورد نظر برای این دسته بندی وجود ندارد.');
                    error.code = 401;
                    throw error;
                }

            } else {
                const error = new Error('دسترسی شما به اطلاعات مسدود شده است.');
                error.code = 401;
                throw error;
            }
        },

        product : async (param, args, { check, isAdmin }) => {
            if(check && isAdmin) {

                try {
                    const details = await saveDetailsValue(args.input.details);
                    const attribute = await saveAttributeProduct(args.input.attribute);

                    if(details == null || attribute == null) {
                        return {
                            status : 401,
                            message : 'امکان درج محصول مورد نظر وجود ندارد!'
                        }
                    }

                    const { createReadStream, filename } = await args.input.image;
                    const stream = createReadStream();
                    const { filePath } = await saveImage({ stream, filename});

                    await Product.create({
                         fname : args.input.fname,
                         ename : args.input.ename,
                         brand : args.input.brand,
                         category : args.input.category,
                         attribute : attribute,
                         description : args.input.description,
                         details : details,
                         image : filePath
                    })

                        return {
                            status : 200,
                            message : 'محصول مورد نظر ثبت شد.'
                        }
    
                } catch {
                    deleteAttributeProduct(args.input.attribute)
                    deleteDetailsValue(args.input.details);
                    // const { filename } = await args.input.image;
                    // await deleteImage({filename})
                    const error = new Error('امکان درج محصول جدید وجود ندارد.');
                    error.code = 401;
                    throw error;
                }
    
            } else {
                const error = new Error('دسترسی شما به اطلاعات مسدود شده است.');
                error.code = 401;
                throw error;
            }
        },

        productSpecs : async (param, args, { check, isAdmin }) => {
            if(check && isAdmin) {
                try {
                    await Productspecs.create({
                        category : args.input.category,
                        specs : args.input.specs,
                        label : args.input.label
                    })
                        return {
                            _id : ProSpecs._id,
                            status : 200,
                            message : 'لیست اصلی مربوط به مشخصات محصول ذخیره شد.'
                        }
                } catch {
                    const error = new Error('امکان درج لیست مشخصات محصول وجود ندارد.');
                    error.code = 401;
                    throw error;
                }

            } else {
                const error = new Error('دسترسی شما به اطلاعات مسدود شده است.');
                error.code = 401;
                throw error;
            }
        },

        productSpecsDetails : async (param, args, { check, isAdmin }) => {
            if(check && isAdmin) {
                try {
                    await Productdetails.create({
                        specs : args.input.specs,
                        name : args.input.name,
                        label : args.input.label
                    })

                        return {
                            _id : ProSpecsDetails._id,
                            status : 200,
                            message : 'لیست جزئیات مربوط به مشخصات محصول ذخیره شد.'
                        }
                } catch {
                    const error = new Error('امکان درج لیست جزئیات مشخصات محصول وجود ندارد.');
                    error.code = 401;
                    throw error;
                }

            } else {
                const error = new Error('دسترسی شما به اطلاعات مسدود شده است.');
                error.code = 401;
                throw error;
            }
        },

        productDetailsValue : async (param, args, { check, isAdmin }) => {
            if(check && isAdmin) {
                try {
                    await Details.create({
                        p_details : args.input.p_details,
                        value : args.input.value,
                        label : args.input.label
                    })

                    return {
                        status : 200,
                        message : 'اطلاعات مورد نظر برای جزئیات مشخصات محصول ثبت شد.'
                    }
                } catch {
                    const error = new Error('امکان درج اطلاعات برای جزئیات مشخصات محصول وجود ندارد.');
                    error.code = 401;
                    throw error;
                }
                
            } else {
                const error = new Error('دسترسی شما به اطلاعات مسدود شده است.');
                error.code = 401;
                throw error;
            }
        },

        seller : async (param, args, { check, isAdmin }) => {
            if(check && isAdmin) {
                try {
                    const seller = await Seller.create({
                        category : args.category,
                        name : args.name,
                        label : args.label
                    })
    
                        return {
                            _id : seller._id,
                            status : 200,
                            message : 'ok'
                        }
                } catch {
                    const error = new Error('امکان درج فروشنده جدید وجود ندارد.');
                    error.code = 401;
                    throw error;
                }
    
            } else {
                const error = new Error('دسترسی شما به اطلاعات مسدود شده است.');
                error.code = 401;
                throw error;
            }
        },

        warranty : async (param, args, { check, isAdmin }) => {
            if(check && isAdmin) {
                const warr = await Warranty.create({
                    name : args.name,
                    label : args.label
                })

                if(!warr) {
                    if(err) {
                        const error = new Error('امکان گارانتی مورد نظر وجود ندارد.');
                        error.code = 401;
                        throw error;
                    }
                } else {
                    return {
                        _id : warr._id,
                        status : 200,
                        message : 'ok'
                    }
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

        comment : async (param, args, { check, isAdmin}) => {
            if(check) {
                try {
                    const product = await Product.findById(args.input.product);
                    if(!product) {
                        const error = new Error('این محصول در سیستم ثبت نشده است. نمی توانید کامنت ثبت کنید!');
                        error.code = 401;
                        throw error;
                    }
                    const surveyValue = await saveSurveyValue(args.input.survey);
                    
                    await Comment.create({
                        user : args.input.user,
                        product : args.input.product,
                        survey : surveyValue,
                        title : args.input.title,
                        description : args.input.description,
                        negative : args.input.negative,
                        positive : args.input.positive,
                    })

                    return {
                        status : 20,
                        message : 'کامنت شما برای این محصول ثبت شد.'
                    }
                    
                } catch {
                    const error = new Error('امکان درج کامنت در حال حاضر وجود ندارد!');
                    error.code = 401;
                    throw error;
                }
            } else {
                const error = new Error('دسترسی شما به اطلاعات مسدود شده است.');
                error.code = 401;
                throw error;
            }
        },

        // edit method for all section

        UpdateCategory : async (param, args, { check, isAdmin }) => {
            if(check && isAdmin) {
                try {
                    const cat = await Category.findByIdAndUpdate(args.input.id, {$set : {
                        name : args.input.name,
                        label : args.input.label,
                        parent : args.input.parent
                    }})
                    if(!cat) {
                        const error = new Error('این دسته بندی در سیستم ثبت نشده است.');
                        error.code = 401;
                        throw error;
                    } else {
                        return {
                            status : 200,
                            message : 'دسته بندی مورد نطر ویرایش شد.'
                        }
                    }

                } catch {
                    const error = new Error('امکان ویرایش دسته بندی وجود ندارد!');
                    error.code = 401;
                    throw error;
                }
            } else {
                const error = new Error('دسترسی شما به اطلاعات مسدود شده است.');
                error.code = 401;
                throw error;
            }
        },

        UpdateBrand : async (param, args, { check, isAdmin }) => {
            if(check && isAdmin) {
                try {
                    let img = "";
                    if(args.input.image) {
                        const { createReadStream, filename } = await args.input.image;
                        const stream = createReadStream();
                        const { filePath } = await saveImage({ stream, filename});
                        img = filePath
                    }

                    const brand = await Brand.findByIdAndUpdate(args.input.id, { $set : {
                        category : args.input.category,
                        name : args.input.name,
                        label : args.input.label,
                        image : img == "" ? this.image : img
                    }})

                    if(!brand) {
                        const error = new Error('چنین برندی در سیستم ثبت نشده است!');
                        error.code = 401;
                        throw error;
                    } else {
                        return {
                            status : 200,
                            message : 'برند مورد نطر ویرایش شد.'
                        }
                    }
                } catch {
                    const error = new Error('امکان ویرایش برند وجود ندارد!');
                    error.code = 401;
                    throw error;
                }
            } else {
                const error = new Error('دسترسی شما به اطلاعات مسدود شده است.');
                error.code = 401;
                throw error;
            }
        },

        UpdateProductSpecs : async (param, args, { check, isAdmin }) => {
            if(check && isAdmin) {
                try {
                    const specs = await Productspecs.findByIdAndUpdate(args.input.id, { $set : {
                        category : args.input.category,
                        specs : args.input.specs,
                        label : args.input.label
                    }})

                    if(!specs) {
                        const error = new Error('چنین مشخصاتی برای محصول در سیستم ثبت نشده است!');
                        error.code = 401;
                        throw error;
                    } else {
                        return {
                            status : 200,
                            message : 'مشخصات محصول ویرایش شد.'
                        }
                    }
                } catch {
                    const error = new Error('امکان ویرایش مشخصات محصول وجود ندارد!');
                    error.code = 401;
                    throw error;
                }
            } else {
                const error = new Error('دسترسی شما به اطلاعات مسدود شده است.');
                error.code = 401;
                throw error;
            }
        },

        UpdateProductSpecsDetails : async (param, args, { check, isAdmin }) => {
            if(check && isAdmin) {
                try {
                    const pd = await Productdetails.findByIdAndUpdate(args.input.id, { $set : {
                        specs : args.input.specs,
                        name : args.input.name,
                        label : args.input.label
                    }})

                    if(!pd) {
                        const error = new Error('چنین  موردی برای مشخصات مورد نظر در سیستم ثبت نشده است!');
                        error.code = 401;
                        throw error;
                    } else {
                        return {
                            status : 200,
                            message : 'جزئیات مشخصات مورد نظر ویرایش شد.'
                        }
                    }
                } catch {
                    const error = new Error('امکان ویرایش جزئیات مشخصات محصول وجود ندارد!');
                    error.code = 401;
                    throw error;
                }
            } else {
                const error = new Error('دسترسی شما به اطلاعات مسدود شده است.');
                error.code = 401;
                throw error;
            }
        },

        UpdateSeller : async (param, args, { check, isAdmin }) => {
            if(check && isAdmin) {
                try {
                    const seller = await Seller.findByIdAndUpdate(args.id, { $set : {
                        name : args.name,
                        label : args.label
                    }})

                    if(!seller) {
                        const error = new Error('چنین فروشنده ای در سیستم ثبت نشده است!');
                        error.code = 401;
                        throw error;
                    } else {
                        return {
                            status : 200,
                            message : 'فروشنده مورد نظر ویرایش شد.'
                        }
                    }
                } catch {
                    const error = new Error('امکان ویرایش فروشنده وجود ندارد!');
                    error.code = 401;
                    throw error;
                }
            } else {
                const error = new Error('دسترسی شما به اطلاعات مسدود شده است.');
                error.code = 401;
                throw error;
            }
        },

        UpdateWarranty : async (param, args, { check, isAdmin }) => {
            if(check && isAdmin) {
                try {
                    const warranty = await Warranty.findByIdAndUpdate(args.input.id, { $set : {
                        name : args.input.name,
                        label : args.input.label
                    }})

                    if(!warranty) {
                        const error = new Error('این گارانتی در سیستم ثبت نشده است!');
                        error.code = 401;
                        throw error;
                    } else {
                        return {
                            status : 200,
                            message : 'گارانتی مورد نظر ویرایش شد.'
                        }
                    }
                } catch {
                    const error = new Error('امکان ویرایش گارانتی وجود ندارد!');
                    error.code = 401;
                    throw error;
                }
            } else {
                const error = new Error('دسترسی شما به اطلاعات مسدود شده است.');
                error.code = 401;
                throw error;
            }
        },

        UpdateProduct : async (param, args, { check, isAdmin }) => {
            if(check && isAdmin) {
                try {
                        const details = await updateDetailsValue(args.input.details);
                        // update image path

                        let imagePath = "";

                        if(!args.input.image) {
                            const pathim = await Product.findById(args.input.id);
                            console.log(pathim.image[0])
                            imagePath = pathim.image[0];
                        } else {

                            const { createReadStream, filename } = await args.input.image;
                            const stream = createReadStream();
                            const { filePath } = await updateImageProduct({ stream, filename})
                            const pathim = await Product.findById(args.input.id);
                            imagePath = filePath;
                            fs.unlinkSync(path.join(__dirname ,`/public${pathim.image[0]}`));
                        }



                        const product = await Product.findByIdAndUpdate(args.input.id, { $set : {
                            fname : args.input.fname,
                            ename : args.input.ename,
                            brand : args.input.brand,
                            category : args.input.category,
                            attribute : args.input.attribute,
                            description : args.input.description,
                            details : details,
                            image : imagePath
                        }})

                        if(!product) {
                            const error = new Error('هیج محصولی با این مشخصات در سیستم ثبت نشده است!');
                            error.code = 401;
                            throw error;
                        } else {
                            return {
                                status : 200,
                                message : 'محصول مورد نظر ویرایش شد.'
                            }
                        }

                } catch {
                    const error = new Error('امکان ویرایش محصول وجود ندارد.');
                    error.code = 401;
                    throw error;
                }
            } else {
                const error = new Error('دسترسی شما به اطلاعات مسدود شده است.');
                error.code = 401;
                throw error;
            }
        },

        UpdateProducctAttribute : async (param, args, { check, isAdmin }) => {
            if(check && isAdmin) {
                try {
                    if(args.input.addSeller == true) {
                        const attribute = await saveAttributeProduct(args.input.attribute);
                        await Product.findByIdAndUpdate(args.input.attribute[0].id, { $push : { attribute : attribute[0]}})
                        return {
                            status : 200,
                            message : 'یک فروشنده جدید به محصول اختصاص پیدا کرد.'
                        }

                    }

                    for (let index = 0; index < args.input.attribute.length; index++) {
                        const element = args.input.attribute[index];
                                    await Productattribute.findByIdAndUpdate(element.id, { $set : {
                                            seller : element.seller,
                                            warranty : element.warranty,
                                            color : element.color,
                                            price : element.price,
                                            discount : element.discount,
                                            stock : element.stock,
                                            suggestion : element.suggestion,
                                            expireAt : Date.now() + (element.expireAt * 60 * 60 * 1000)
                                        }
                                    })
                    }

                    return {
                        status : 200,
                        message : 'ویژگی های محصول ویرایش شد.'
                    }

                } catch {
                    const error = new Error('امکان ویرایش ویژگی های محصول وجود ندارد.');
                    error.code = 401;
                    throw error;
                }
            } else {
                const error = new Error('دسترسی شما به اطلاعات مسدود شده است.');
                error.code = 401;
                throw error;
            }
        },

        UpdateCommentProduct : async (param, args, { check , isAdmin }) => {
            if(check && isAdmin) {
                try {
                    const comment= await Comment.findById(args.commentId);
                    if(!comment) {
                        return {
                            status : 401,
                            message : 'چنین کامنتی برای این محصول ثبت نشده است.'
                        }
                    }

                    await Comment.updateOne({_id : comment._id}, { $set : { check : !comment.check}})

                    return {
                        status : 200,
                        message : 'امکان تایید این کامنت وجود ندارد!'
                    }

                } catch {
                    const error = new Error('امکان ویرایش کامنت محصول وجود ندارد.');
                    error.code = 401;
                    throw error;
                }
            } else {
                const error = new Error('دسترسی شما به اطلاعات مسدود شده است.');
                error.code = 401;
                throw error;
            }
        },

        slider : async (param, args, { check, isAdmin}) => {
            if(check && isAdmin) {
                try {
                    await Slider.create({
                        image : args.imageId,
                    })

                    return {
                        status : 200,
                        message : 'تصویر مورد نظر به عنوان بنر درج شد.'
                    }

                } catch {
                    const error = new Error('امکان درج تصویر به عنوان بنر وجود ندارد!');
                    error.code = 401;
                    throw error;
                }
            } else {
                const error = new Error('دسترسی شما به اطلاعات مسدود شده است.');
                error.code = 401;
                throw error;
            }
        },



        


    },
}

// other method -----------------------------------

let saveDetailsValue = async (args) => {
    try {
        const arr = [];
        for (let index = 0; index < args.length; index++) {
            const element = args[index];
                        const op = await Details.create({
                            p_details : element.p_details,
                            value : element.value,
                            label : element.label
                        })
    
                        arr[index] = op._id
    
        }
        return arr;
    } catch {
        const error = new Error('امکان درج محصول جدید وجود ندارد.');
        error.code = 401;
        throw error;
    }
}

let updateDetailsValue = async (args) => {
    try {
        const arr = [];
        for (let index = 0; index < args.length; index++) {
            const element = args[index];
                        const op = await Details.findByIdAndUpdate(element.id, { $set : {
                            value : element.value,
                            label : element.label
                        }
                    })
    
                        arr[index] = op._id
    
        }
        return arr;
    } catch {
        const error = new Error('امکان ویرایش محصول وجود ندارد.');
        error.code = 401;
        throw error;
    }
}

let deleteDetailsValue = async (args) => {
    for (let index = 0; index < args.length; index++) {
        const element = args[index];
        await Details.deleteMany(element)
    }

    return
}

let saveAttributeProduct = async (args) => {
    try {
        const arr = [];
        for (let index = 0; index < args.length; index++) {
            const element = args[index];
                        const pa = await Productattribute.create({
                            seller : element.seller,
                            warranty : element.warranty,
                            color : element.color,
                            price : element.price,
                            discount : element.discount,
                            stock : element.stock
                        })

                        arr[index] = pa._id
    
        }
        return arr;
    } catch {
        const error = new Error('امکان درج محصول جدید وجود ندارد.');
        error.code = 401;
        throw error;
    }
    
}

let deleteAttributeProduct = async (args) => {
    for (let index = 0; index < args.length; index++) {
        const element = args[index];
        await Productattribute.deleteMany(element)
    }
    return;
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
    mkdirp.sync(path.join(__dirname, `./public/${dir}`));

    let filePath = `${dir}/${filename}`;

    if(fs.existsSync(`/public/${filePath}`)) {
        filePath = `${dir}/${Date.now()}-${filename}`
    }

    return new Promise((resolve, reject) => {
        stream
            .pipe(fs.createWriteStream(path.join(__dirname, `/public/${filePath}`)))
            .on('error', error => reject(error))
            .on('finish', () => resolve({filePath}))
    })

}

let updateImageProduct = async (id, {stream, filename}) => {
    let date = new Date();
    const dir = `/uploads/${date.getFullYear()}/${date.getMonth() + 1}`;
    mkdirp.sync(path.join(__dirname, `./public/${dir}`));
    const filePath = `${dir}/${filename}`;

    const image_product = await Product.find({_id : id})
    if(!image_product) {
        const error = new Error('محصولی با این مشخصات در سیستم ثبت نشده است.');
        error.code = 401;
        throw error;
    } else {
        if(filePath === image_product.image[0]) {
            return new Promise((resolve, reject) => {
                stream
                    .pipe(fs.createWriteStream(path.join(__dirname, `/public/${filePath}`)))
                    .on('error', error => reject(error))
                    .on('finish', () => resolve({filePath}))
            })
        }
    }
}

// let deleteImage = async ({filename}) => {
//     let date = new Date();
//     const dir = `/uploads/${date.getFullYear()}/${date.getMonth() + 1}`;
//     fs.unlinkSync(path.join(__dirname, `/public/${dir}/${filename}`));
//     return;
// }

let saveSurveyValue = async (args) => {
    try {
        const arr = [];
        for (let index = 0; index < args.length; index++) {
            const element = args[index];
                        const vs = await Vsurvey.create({
                            survey : element.survey,
                            value : element.value
                        })

                        arr[index] = vs._id
    
        }
        return arr;
    } catch {
        const error = new Error('امکان درج نظر سنجی جدید وجود ندارد');
        error.code = 401;
        throw error;
    }
    
}

module.exports = resolvers;