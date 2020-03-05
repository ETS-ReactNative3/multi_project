const User = require('app/models/users');
const bcrypt = require('bcryptjs');
const ImageSize = require('image-size');
const FileType = require('file-type')
const mkdirp = require('mkdirp');
const path = require('path');
const fs = require('fs');
const Kavenegar = require('kavenegar');
const jwt = require('jsonwebtoken');
const request = require('request-promise');
const moment = require('moment-jalaali');
moment.loadPersian({usePersianDigits : true , dialect : 'persian-modern'});


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
const VlidationRegister = require('app/models/validation-register');
const Payment = require('app/models/payment');
const Receptor = require('app/models/receptor');
const OrderStatus = require('app/models/order-status');
const Favorite = require('app/models/favorite');
const Banner = require('app/models/banner');


const resolvers = {
    Query : {
        // main dashboard >>>>>>>>>>>>>>>>>>>>>>>

        userAtmonth : async (param, args, { check , isAdmin}) => {
            if(check && isAdmin) {
                try {
                    const userAtmonth = [{month : 'فروردین' , value : 0},{month : 'اردیبهشت' , value : 0},{month : 'خرداد' , value : 0},{month : 'تیر' , value : 0},{month : 'مرداد' , value : 0},{month : 'شهریور' , value : 0},{month : 'مهر' , value : 0},{month : 'آبان' , value : 0},{month : 'آذر' , value : 0},{month : 'دی' , value : 0},{month : 'بهمن' , value : 0},{month : 'اسفند' , value : 0}];
                    const users = await User.find({});
                    for (let index = 0; index < users.length; index++) {
                        const element = users[index];
                        const month = moment(element.createdAt).format('jMMMM');
                        userAtmonth.map(key => {
                            key.month === month ? key.value++ : key.value
                        })
                    }

                    return userAtmonth;
                } catch {
                    const error = new Error('امکان نمایش داده ها وجود ندارد!!');
                    error.code = 401;
                    throw error;
                }
            } else {
                const error = new Error('دسترسی شما به اطلاعات مسدود شده است.');
                error.code = 401;
                throw error;
            }
        },

        paymentProveAtmonth : async (param, args, { check , isAdmin}) => {
            if(check && isAdmin) {
                try {
                    const paymentAtmonthProve = [{month : 'فروردین' , value : 0},{month : 'اردیبهشت' , value : 0},{month : 'خرداد' , value : 0},{month : 'تیر' , value : 0},{month : 'مرداد' , value : 0},{month : 'شهریور' , value : 0},{month : 'مهر' , value : 0},{month : 'آبان' , value : 0},{month : 'آذر' , value : 0},{month : 'دی' , value : 0},{month : 'بهمن' , value : 0},{month : 'اسفند' , value : 0}];
                    const paymentsProve = await Payment.find({payment : true});
                    for (let index = 0; index < paymentsProve.length; index++) {
                        const element = paymentsProve[index];
                        const month = moment(element.createdAt).format('jMMMM');

                        paymentAtmonthProve.map(key => {
                            key.month === month ? key.value++ : key.value
                        })
                    }

                    return paymentAtmonthProve;
                } catch {
                    const error = new Error('امکان نمایش داده ها وجود ندارد!!');
                    error.code = 401;
                    throw error;
                }
            } else {
                const error = new Error('دسترسی شما به اطلاعات مسدود شده است.');
                error.code = 401;
                throw error;
            }
        },

        paymentNotProveAtmonth : async (param, args, { check , isAdmin}) => {
            if(check && isAdmin) {
                try {
                    const paymentAtmonthNotProve = [{month : 'فروردین' , value : 0},{month : 'اردیبهشت' , value : 0},{month : 'خرداد' , value : 0},{month : 'تیر' , value : 0},{month : 'مرداد' , value : 0},{month : 'شهریور' , value : 0},{month : 'مهر' , value : 0},{month : 'آبان' , value : 0},{month : 'آذر' , value : 0},{month : 'دی' , value : 0},{month : 'بهمن' , value : 0},{month : 'اسفند' , value : 0}];
                    const paymentsNotProve = await Payment.find({payment : false});
                    for (let index = 0; index < paymentsNotProve.length; index++) {
                        const element = paymentsNotProve[index];
                        const month = moment(element.createdAt).format('jMMMM');
                        paymentAtmonthNotProve.map(key => {
                            key.month === month ? key.value++ : key.value
                        })
                    }

                    return paymentAtmonthNotProve;
                } catch {
                    const error = new Error('امکان نمایش داده ها وجود ندارد!!');
                    error.code = 401;
                    throw error;
                }
            } else {
                const error = new Error('دسترسی شما به اطلاعات مسدود شده است.');
                error.code = 401;
                throw error;
            }
        },

        sellerAtmonth : async (param, args, { check , isAdmin}) => {
            if(check && isAdmin) {
                try {
                    const sellerAtmonth = [{month : 'فروردین' , value : 0},{month : 'اردیبهشت' , value : 0},{month : 'خرداد' , value : 0},{month : 'تیر' , value : 0},{month : 'مرداد' , value : 0},{month : 'شهریور' , value : 0},{month : 'مهر' , value : 0},{month : 'آبان' , value : 0},{month : 'آذر' , value : 0},{month : 'دی' , value : 0},{month : 'بهمن' , value : 0},{month : 'اسفند' , value : 0}];
                    const sellers = await Seller.find({});
                    for (let index = 0; index < sellers.length; index++) {
                        const element = sellers[index];
                        const month = moment(element.createdAt).format('jMMMM');
                        sellerAtmonth.map(key => {
                            key.month === month ? key.value++ : key.value
                        })
                    }

                    return sellerAtmonth;
                } catch {
                    const error = new Error('امکان نمایش داده ها وجود ندارد!!');
                    error.code = 401;
                    throw error;
                }
            } else {
                const error = new Error('دسترسی شما به اطلاعات مسدود شده است.');
                error.code = 401;
                throw error;
            }
        },

        commentAtmonth : async (param, args, { check , isAdmin}) => {
            if(check && isAdmin) {
                try {
                    const commentAtmonth = [{month : 'فروردین' , value : 0},{month : 'اردیبهشت' , value : 0},{month : 'خرداد' , value : 0},{month : 'تیر' , value : 0},{month : 'مرداد' , value : 0},{month : 'شهریور' , value : 0},{month : 'مهر' , value : 0},{month : 'آبان' , value : 0},{month : 'آذر' , value : 0},{month : 'دی' , value : 0},{month : 'بهمن' , value : 0},{month : 'اسفند' , value : 0}];
                    const comment = await Comment.find({});
                    for (let index = 0; index < comment.length; index++) {
                        const element = comment[index];
                        const month = moment(element.createdAt).format('jMMMM');
                        commentAtmonth.map(key => {
                            key.month === month ? key.value++ : key.value
                        })
                    }

                    return commentAtmonth;
                } catch {
                    const error = new Error('امکان نمایش داده ها وجود ندارد!!');
                    error.code = 401;
                    throw error;
                }
            } else {
                const error = new Error('دسترسی شما به اطلاعات مسدود شده است.');
                error.code = 401;
                throw error;
            }
        },

        paymentAtDay : async (param, args, { check, isAdmin}) => {
            const d = new Date();
            const day = [];
            const pay = await Payment.find({});
            let countallPay = 0
            let allPay = 0;
            let countPayNow = 0

            for (let index = 10; index >= 0; index--) {
                const t = pay.filter(item => {  
                    const data = moment(item.createdAt).jDate();
                    const q = moment(d - index * 24 * 60 *60 * 1000).jDate();
                    return data == q ? item : null
                })

                t.map(item => {
                    if(item.payment == true) {
                        allPay += item.price
                    }

                    if( moment(item.createdAt).jDate() == moment(d).jDate() && item.payment == true) {
                        countPayNow += item.price
                    }
                })
                

                countallPay += t.length

                day.push({
                    day : moment(d - index * 24 * 60 *60 * 1000).jDate(),
                    count : t.length
                })
                
            }
            return {
                day,
                countallPay,
                allPay,
                countPayNow
            };
        },

        paymenPricetAtDay : async (param, args, { check, isAdmin}) => {
            const d = new Date();
            const day = [];
            const pay = await Payment.find({});

            for (let index = 10; index >= 0; index--) {
                const t = pay.filter(item => {
                        const data = moment(item.createdAt).jDate();
                        const q = moment(d - index * 24 * 60 *60 * 1000).jDate();
                        return data == q ? item : null
                })

                let price = 0;

                t.map(item => {
                    if(moment(item.createdAt).jDate() == moment(d - index * 24 * 60 *60 * 1000).jDate() && item.payment == true) {
                        price += item.price
                    }
                })

                console.log(price)


                day.push({
                    day : moment(d - index * 24 * 60 *60 * 1000).jDate(),
                    count : price
                })

                // console.log(t);
                
            }
            return day;
        },

        allUserCount : async (param, args, { check, isAdmin}) =>{
            if(check && isAdmin) {
                try {
                    const Maleusers = await User.find({gender : 'Male'}).count();
                    const Femaleusers = await User.find({gender : 'Female'}).count();

                    return {
                        Male : ( Maleusers * 100 ) / (Maleusers + Femaleusers),
                        Female : ( Femaleusers * 100 ) / (Maleusers + Femaleusers)
                    }

                } catch {
                    const error = new Error('اطلاعات کاربران در دسترس نمی باشد!');
                    error.code = 401;
                    throw error;
                }
            } else {
                const error = new Error('دسترسی شما به اطلاعات مسدود شده است.');
                error.code = 401;
                throw error;
            }
        },

        allOrderStatus : async (param, args, { check, isAdmin}) => {
            const orderStatus = await OrderStatus.find({});
            const payment = await Payment.find({ payment : true}).populate('orderStatus');

            const t = orderStatus.map(item => {
                return {
                    order : item.name,
                    count : 0
                }
            })

            for (let index = 0; index < payment.length; index++) {
                const element = payment[index];
                t.map(item => {
                    item.order === element.orderStatus.name ? item.count++ : item.count
                })
            }

            return t;
        },

        productAtmonth : async (param, args, { check , isAdmin}) => {
            if(check && isAdmin) {
                try {
                    const productAtmonth = [{month : 'فروردین' , value : 0},{month : 'اردیبهشت' , value : 0},{month : 'خرداد' , value : 0},{month : 'تیر' , value : 0},{month : 'مرداد' , value : 0},{month : 'شهریور' , value : 0},{month : 'مهر' , value : 0},{month : 'آبان' , value : 0},{month : 'آذر' , value : 0},{month : 'دی' , value : 0},{month : 'بهمن' , value : 0},{month : 'اسفند' , value : 0}];
                    const product = await Product.find({});
                    for (let index = 0; index < product.length; index++) {
                        const element = product[index];
                        const month = moment(element.createdAt).format('jMMMM');
                        productAtmonth.map(key => {
                            key.month === month ? key.value++ : key.value
                        })
                    }

                    return productAtmonth;
                } catch {
                    const error = new Error('امکان نمایش داده ها وجود ندارد!!');
                    error.code = 401;
                    throw error;
                }
            } else {
                const error = new Error('دسترسی شما به اطلاعات مسدود شده است.');
                error.code = 401;
                throw error;
            }
        },

        // end of dashboard <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

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

            if(user.verify) {
                return {
                    token : await User.CreateToken(user, secretID, '10h'),
                }
            } else {
                const error = new Error('حساب کاربری شما تایید نشده است!');
                error.code = 401;
                throw error;
            }

        },

        getUsers : async (param, args, { check, isAdmin }) => {
            if(check && isAdmin) {
                let page = args.page || 1;
                let limit = args.limit || 10;
                if(args.userId == null) {
                    const users = await User.paginate({}, {page, limit, sort : { createAt : -1}})
                    return users.docs;
                } else {

                const user = await User.findById(args.userId).sort({ createAt : -1}).populate([{ path : 'comment', populate : {path : 'product'}}, { path : 'payment', populate : { path : 'product'}}, { path : 'favorite', populate : { path : 'product', populate : { path : 'attribute'}}}])
                return [user];
                }

            } else {
                const error = new Error('دسترسی شما به اطلاعات مسدود شده است.');
                error.code = 401;
                throw error;
            }
        },

        getProduct : async (param, args) => {
                let page = args.page || 1;
                let limit = args.limit || 10;
                if(args.productId == null && args.categoryId == null) {
                    const producs = await Product.paginate({}, {page, limit, sort : { createdAt : 1}, populate : [{ path : 'brand'}, { path : 'attribute', populate : [{path : 'seller'}, {path : 'warranty'}]}]});
                    return producs.docs
                } else if(args.productId != null && args.categoryId == null) {
                    const product = await Product.findById({ _id : args.productId}).populate([{ path : 'brand'}, {path : 'images'}, { path : 'attribute', populate : [{path : 'seller'}, {path : 'warranty'}]}, { path : 'category', populate : { path : 'parent', populate : { path : "parent"}}}, { path : 'details', populate : { path : 'p_details', populate : { path : 'specs'}}}])
                    return [product]
                } else if(args.categoryId != null && args.productId == null) {
                    const product = await Product.paginate({ category : args.categoryId}, {page, limit, sort : { createdAt : 1}, populate : [{ path : 'attribute'}]});
                    return product.docs
                }
        },

        getAllCategory : async (param, args) => {
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
                } else if(args.input.parentCategory == false && args.input.mainCategory == false){
                    let page = args.input.page || 1;
                    let limit = args.input.limit || 10;
                    const categorys = await Category.find({}).skip((page - 1) * limit).limit(limit).populate('parent').exec();
                    return categorys
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

        getAllSurvey : async (param, args) => {
            try {
                const maincategory = await Category.findById(args.categoryId).populate('parent');
                if(maincategory.parent == null) {
                    throw error;
                } else if(maincategory.parent.parent == null){
                    const list = await Survey.find({ category : args.categoryId});
                    if(list.length == 0) {
                        throw error
                    }
                    return list
                } else {
                    const categoryId = await Category.findById(maincategory.parent);
                    const list = await Survey.find({ category : categoryId._id});
                    if(list.length == 0) {
                        throw error
                    }
                    return list
                }
            } catch {
                const error = new Error('هیچ فیلد نظر سنجی برای این دسته بندی وجود ندارد!');
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
        },

        getAllComment : async (param, args) => {
                    let page = args.page || 1;
                    let limit = args.limit || 10;
                    if(args.productId == null && args.commentId == null) {
                        const comments = await Comment.paginate({}, {page, limit, populate : [{ path : 'user'}, { path : 'product'}, { path : 'survey' , populate : { path : 'survey'}}]})
                        if(!comments) {
                            return {
                                status : 401,
                                message : 'کامنتی برای این محصول ثبت نشده است!'
                            }
                        }
                        return comments.docs;

                    } else if(args.productId) {
                        const comments = await Comment.paginate({product : args.productId}, {page, limit, populate : [{ path : 'user'}, { path : 'product'}, { path : 'survey' , populate : { path : 'survey'}}]})

                        if(!comments) {
                            return {
                                status : 401,
                                message : 'کامنتی برای این محصول ثبت نشده است!'
                            }
                        }
    
                        return comments.docs;

                    } else if(args.commentId != null && args.productId == null) {
                        const comments = await Comment.paginate({_id : args.commentId}, {page, limit, populate : [{ path : 'user'}, { path : 'product'}, { path : 'survey' , populate : { path : 'survey'}}]})

                        if(!comments) {
                            return {
                                status : 401,
                                message : 'کامنتی با این مشخصات وجود ندارد!'
                            }
                        }
    
                        return comments.docs;
                    }

        },

        verifyRegister : async (param, args, { secretID }) => {
            try {
                const digit = Math.floor(Math.random() * (9999 - 1000)) + 1000;
                console.log('digit :' + digit)
                const token = await jwt.sign({digit}, secretID, { expiresIn : '1h'});
                await VlidationRegister.create({
                    verifyToken : token
                })

                const api = Kavenegar.KavenegarApi({apikey: '2F647571766C745A7030745A61585273523734365946544D783648744343767768636F6B374779587255553D'});
                api.Send({ message: `کد تایید حساب کاربری شما : ${digit}` , sender: "1000596446" , receptor: "09154968751" });

                return {
                    status : 200,
                    message : 'کد تایید حساب کاربری به شماره همراه شما ارسال شد.'
                }
    
            } catch {
                const error = new Error('امکان ارسال کد تایید حساب کاربری وجود ندارد!');
                error.code = 401;
                throw error
            }

        }, 
    
        getAllPayment : async (param, args, { check, isAdmin }) => {
            if(check) {
                try {
                    if(args.orderId) {
                        const pay = await Payment.findById(args.orderId).populate([{ path : 'user'}, { path : 'product'}, { path : 'attribute', populate : [{ path : 'seller'}, { path : 'warranty'}]} , { path : 'receptor'}, { path : 'orderStatus'}]);``
                        return [pay]
                    } else if(args.orderId == null && isAdmin) {
                        const pay = await Payment.find({}).populate([{ path : 'user'}, { path : 'product'}, { path : 'orderStatus'}]);
                        return pay
                    } else {
                        const error = new Error('سفارشی برای نمایش وجود ندارد!');
                        error.code = 401;
                        throw error;
                    }
                } catch {
                    const error = new Error('سفارشی برای نمایش وجود ندارد!');
                    error.code = 401;
                    throw error;
                }
            } else {
                const error = new Error('دسترسی شما به اطلاعات مسدود شده است.');
                error.code = 401;
                throw error;
            }
        },

        MainPageApp : async (param, args) => {
            let page = args.page || 1;
            let limit = args.limit || 10;
            let sugg = [];
            const Tselling = await Product.find({}).sort({ soldCount : -1}).populate('attribute');
            const Nproduct = await Product.find({}).sort({ createdAt : -1}).populate('attribute');
            const psuggestion = await Product.paginate({}, { page, limit, populate : { path : 'attribute'}});
            const banner = await Banner.find({ default : true}).populate([{ path : 'Category'}, { path : 'Multimedia'}]).limit(7);
            psuggestion.docs.map(async item => {
                const pa = await Productattribute.find({ _id : { $in : item.attribute}, suggestion : true})
                if(pa.length != 0) {
                    sugg.push(item)
                }
            })

            const category = await Category.find({ parent : null});
            const slider = await Slider.findOne({ default : true}).populate('image');
            return {
                Tselling,
                Nproduct,
                banner,
                Psuggestion : sugg,
                category,
                slider
            }
        },

        getAllOrderStatus : async (param, args, { check , isAdmin }) => {
            if(check && isAdmin) {
                try {
                    const getOrderStatus = await OrderStatus.find({});
                    if(getOrderStatus == null) {
                        const error = new Error('هیج وضعیت سفارشی در سیستم ثبت نشده است!');
                        error.code = 401;
                        throw error;
                    } else {
                        return getOrderStatus;
                    }
                } catch {
                    const error = new Error('هیج وضعیت سفارشی در سیستم ثبت نشده است!');
                    error.code = 401;
                    throw error;
                }
            } else {
                const error = new Error('دسترسی شما به اطلاعات مسدود شده است.');
                error.code = 401;
                throw error;
            }
        }, 

        sortProduct : async (param, args) => {
            try {
                let page = args.page || 1;
                let limit = args.limit || 10;
                switch (args.categoryId != null) {
                    case args.viewCount == true :
                        const productsView = await Product.paginate({ category : args.categoryId}, {page, limit, populate : { path : 'attribute' }, sort : { viewCount : 1}});
                        return productsView.docs;
                    case args.soldCount == true :
                        const productsSold = await Product.paginate({ category : args.categoryId}, {page, limit, sort : { soldCount : 1}, populate : { path : 'attribute' }});
                        return productsSold.docs;
                    case args.priceUp == true :
                        const productsPriceUp = await Product.paginate({category : args.categoryId}, {page, limit, sort : {}, populate : { path : 'attribute', options: { sort: { price : -1 } } }});
                        return productsPriceUp.docs;
                    case args.priceDown == true :
                        const productspriceDown = await Product.paginate({category : args.categoryId}, {page, limit, populate : { path : 'attribute' , sort : { price : 1} }});
                        return productspriceDown.docs;
                    case args.newP == true :
                        const producsNew = await Product.paginate({category : args.categoryId}, {page, limit, sort : { createdAt : 1}, populate : { path : 'attribute' }});
                        return producsNew.docs;
                    case args.suggestion == true : 
                        const productsSuggestion = await Product.paginate({category : args.categoryId }, {page, limit, sort : { createdAt : 1}, populate : { path : 'attribute', match : {suggestion : true}}});
                        return productsSuggestion.docs;
                    default:
                        break;
                }
            } catch {
                const error = new Error('هیج کالایی برای نمایش وجود ندارد!');
                error.code = 401;
                throw error;
            }
        },

        getAllMultimedia : async (param, args, {check, isAdmin}) => {
            if(check && isAdmin) {
                try {
                    let page = args.page || 1;
                    let limit = args.limit || 10;
                    const multimedia = await Multimedia.paginate({}, {page, limit, sort : { createdAt : 1}});
                    let arr = [];
                    for (let index = 0; index < multimedia.docs.length; index++) {
                        const element = multimedia.docs[index];
                        ImageSize(path.join(__dirname, `/public${element.dir}`), async (err, dimensions) =>{
                            element.dimwidth = await dimensions.width;
                            element.dimheight = await dimensions.height;
                          });

                          const type = await FileType.fromFile(path.join(__dirname, `/public${element.dir}`));
                          element.format = type.ext;
                    }

                    return multimedia.docs;

                } catch {
                    const error = new Error('دسترسی شما به محتوای چند رسانه ای مسدود شده است!');
                    error.code = 401;
                    throw error;
                }
            } else {
                const error = new Error('دسترسی شما به اطلاعات مسدود شده است.');
                error.code = 401;
                throw error;
            }
        },

        getAllSlider : async (param, args, { check, isAdmin}) => {
            if(check && isAdmin) {
                try {
                    if(args.sliderId == null && isAdmin) {
                        const sliders = await Slider.find({}).populate('image');
                        if(sliders == null) {
                            return {
                                status : 401,
                                message : 'هیچ اسلایدری در سیستم ایجاد نشده است!'
                            }
                        }

                        return sliders;

                    } else {
                        const slider = await Slider.findById(args.sliderId).populate('image');
                        if(slider == null) {
                            return {
                                status : 401,
                                message : 'چنین اسلایدری در سیستم ثبت نشده است!'
                            }
                        }

                        return [slider]
                    }
                } catch {
                    const error = new Error('اسلایدری برای نمایش وجود ندارد!');
                    error.code = 401;
                    throw error;
                }
            } else {
                const error = new Error('دسترسی شما به اطلاعات مسدود شده است.');
                error.code = 401;
                throw error;
            }
        },
          
        getBanner : async (param, args, { check, isAdmin}) => {
            if(check && isAdmin) {
                try {
                    const banner = await Banner.find({});;
                    if(banner == null) {
                        return {
                            status : 401,
                            message : 'هیچ بنری برای نمایش وجود ندارد!'
                        }
                    } 
                    return banner;
                } catch {
                    const error = new Error('هیچ بنری برای نمایش وجود ندارد!');
                    error.code = 401;
                    throw error;
                }
            } else {
                const error = new Error('دسترسی شما به اطلاعات مسدود شده است.');
                error.code = 401;
                throw error;
            }
        }

    },

    Mutation : {
        register : async (param, args, { secretID }) => {            
            try {
                    // const digit = args.input.digit;
                    // const token = await jwt.sign({digit}, secretID, { expiresIn : '1h'});
                    // const codeToken = await VlidationRegister.findOne({ verifyToken : token});
                    // const verify = await jwt.verify(codeToken, secretID);

                    // if(!verify) {
                    //     return {
                    //         status : 403,
                    //         message : 'درخواست شما اعتبار لازم برای ثبت نام را ندارد!'
                    //     }
                    // } else {
                        const salt = await bcrypt.genSaltSync(15);
                        const hash = await bcrypt.hashSync(args.input.password, salt);
                        await User.create({
                            phone : args.input.phone,
                            password : hash,
                            verify : true,
                            ...args
                        });


                        return {
                            status : 200,
                            message : 'اطلاعات شما با موفقیت ثبت شد. می توانید به حساب کاربری خود لاگین نمایید.'
                        };

                    // } 

            } catch {
                const error = new Error('ارنباط با سرور محدود شده است!!');
                error.code = 401;
                throw error
            }
        },

        multimedia : async (param, args, { check, isAdmin }) => {
            if(check && isAdmin) {
                try {         
                        const { createReadStream, filename } = await args.image;
                        const stream = createReadStream();
                        const { filePath } = await saveImage({ stream, filename});

                        await Multimedia.create({
                            name : filename,
                            dir : filePath
                        })


                        return {
                            status : 200,
                            message : 'تصاویر در رسانه ذخیره شد'
                        }

                } catch {
                    const error = new Error('امکان ذخیره تصاویر وجود ندارد!');
                    error.code = 401;
                    throw error;
                }
            } else {
                const error = new Error('دسترسی شما به اطلاعات مسدود شده است.');
                error.code = 401;
                throw error;
            }
        },

        category : async (param, args, { check, isAdmin }) => {
            if(check && isAdmin) {
                    try {
                        await Category.create({
                            name : args.input.name,
                            label : args.input.label,
                            parent : args.input.parent,
                            image : args.input.image
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
                            for (let index = 0; index < args.input.list.length; index++) {
                                const element = args.input.list[index];

                                        if(!await Category.findOne({_id : element.category})) {
                                            return {
                                                status : 200,
                                                message : 'چنین دسته بندی وجود ندارد!'
                                            }
                                        }

                                        await Survey.create({
                                            category : element.category,
                                            name : element.name,
                                            label : element.label,
                                        })
                            }

                            return {
                                status : 200,
                                message : 'فیلد نظرسنجی برای این دسته بندی ایجاد شد.'
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

                    const { createReadStream, filename } = await args.input.original;
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
                         original : filePath,
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
                    const ProSpecs = await Productspecs.create({
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
                    const ProSpecsDetails = await Productdetails.create({
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
                    console.log(args.input)
                    const product = await Product.findById(args.input.product);
                    if(!product) {
                        const error = new Error('این محصول در سیستم ثبت نشده است. نمی توانید کامنت ثبت کنید!');
                        error.code = 401;
                        throw error;
                    }
                    const surveyValue = await saveSurveyValue(args.input.survey);
                    console.log(surveyValue)
                    
                    await Comment.create({
                        user : check.id,
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

        favorite : async (param, args, { check }) => {
            if(check) {
                try {
                    const user = await User.findById(check.id);
                    if(!user) {
                        return {
                            status : 401,
                            message : 'چنین کاربری در سیستم ثبت نام نکرده است!'
                        }
                    }
                    
                    const product = await Product.findById(args.productId);
                    if(!product) {
                        return {
                            status : 401,
                            message : 'چنین محصولی در سیستم ثبت نشده است!'
                        }
                    }

                    await Favorite.create({
                        user : user._id,
                        product : args.productId
                    })

                    return {
                        status : 200,
                        message : 'محصول مورد نظر به لیست علاقه مندی اضافه شد.'
                    }
                } catch {
                    const error = new Error('امکان درج محصول مورد نظر به لیست علاقه مندی وجود ندار!');
                    error.code = 401;
                    throw error;
                }
            } else {
                const error = new Error('دسترسی شما به اطلاعات مسدود شده است.');
                error.code = 401;
                throw error; 
            }
        },

        payment : async (param, args, { check, res} ) => {
            if(check) {
                try {
                    const user = await User.findById(check.id);
                    let products = []
                    let attributes = []
                    let price = 0;

                    if(user.fname != null) {
                        const ostatus = await OrderStatus.findOne({ default : true });
                        for (let index = 0; index < args.input.products.length; index++) {
                            const element = args.input.products[index]
                            const product = await Product.findById(element);
                            if(product == null) {
                                throw error
                            }
                            products[index] = product._id
                        }

                        for (let index = 0; index < args.input.attributes.length; index++) {
                            const element = args.input.attributes[index];
                            const attribute = await Productattribute.findById(element);
                            if(attribute == null) {
                                throw error
                            }
                            price += (((attribute.price) - ((attribute.price *attribute.discount)/100)))
                            attributes[index] = attribute._id
                        }

                           // pay process

                            let params = {
                                MerchantID: '97221328-b053-11e7-bfb0-005056a205be',
                                Amount: (price - ((price * args.input.discount)/100)),
                                CallbackURL: 'http://digikala.liara.run/api/product/payment/callbackurl',
                                Description: `خرید محصول`,
                                Mobile : user.phone,
                            }

                            let options = getOptions('https://www.zarinpal.com/pg/rest/WebGate/PaymentRequest.json', params);

                            // options
                            //     .then(data => {
                            //         console.log(data.uri)
                            //     })
                            // return;

                            const data = await request(options);

                            if(! data) {
                                return {
                                    status : 401,
                                    message : 'امکان خرید محصول در حال حاضر وجود ندارد بعدا امتحان نمایید!'
                                }
                            } 

                            await Payment.create({
                                user : check.id,
                                products : products,
                                resnumber : data.Authority,
                                attributes : attributes,
                                discount : args.input.discount,
                                count : args.input.count,
                                price : (price - ((price * args.input. discount)/100)),
                                orderStatus : ostatus._id
                            })

                            const link = `https://www.zarinpal.com/pg/StartPay/${data.Authority}`;

                            return {
                                status : 200,
                                payLink : link
                            }

                    } else {
                        return {
                            status : 401,
                            message : 'اطلاعات خریدار ناقص است!!'
                        }
                    }
                    
                } catch {
                    const error = new Error('امکان ثبت سفارش وجود ندارد!');
                    error.code = 401;
                    throw error;
                }
            } else {
                const error = new Error('دسترسی شما به اطلاعات مسدود شده است.');
                error.code = 401;
                throw error;
            }
        },

        receptor : async (param, args, { check }) => {
            if(check) {
                try {
                    const receptor = await Receptor.findOne({ phone : args.input.phone});
                    if(receptor) {
                        return {
                            status : 401,
                            message : 'این گیرنده قبلا در سیستم درج شده است!'
                        }
                    } else {
                        await Receptor.create({
                            fname : args.input.fname,
                            lname : args.input.lname,
                            code : args.input.code,
                            number : args.input.number,
                            phone : args.input.phone,
                            state : args.input.state,
                            city : args.input.city,
                            address : args.input.address,
                        })

                        return {
                            status : 200,
                            message : 'گیرنده مورد نظر درج شد.'
                        }
                    }
                } catch {
                    const error = new Error('امکان ثبت گیرنده وجود ندارد!');
                    error.code = 401;
                    throw error;
                }
            } else {
                const error = new Error('دسترسی شما به اطلاعات مسدود شده است.');
                error.code = 401;
                throw error;
            }
        },

        OrderStatus : async (param, args, { check, isAdmin}) => {
            if(check && isAdmin) {
                try {
                    if(args.default) {
                        const status_def = await OrderStatus.findOne({ default : true});
                        if(status_def != null) {
                            return {
                                status : 401,
                                message : 'وضعیت سفارش دیگیری را به عنوان گزینه پیشفرض انتخاب کرده اید!'
                            }
                        }
                    }

                    const status = await OrderStatus.findOne({ name : args.name});
                    if(status != null) {
                        return {
                            status : 401,
                            message : 'قبل یک وضعیت سفارش با این عنوان ایجاد شده است!'
                        }
                    } else {

                        const { createReadStream, filename } = await args.image;
                        const stream = createReadStream();
                        const { filePath } = await saveImage({ stream, filename});

                        await OrderStatus.create({
                            name : args.name,
                            image : filePath,
                            default : args.default
                        })

                        return {
                            status : 200,
                            message : 'وضعیت سفارش جدید در سیستم ثبت شد.'
                        }

                    }
                } catch {
                    const error = new Error('امکان ثبت وضعیت سفارش جدید وجود ندارد!');
                    error.code = 401;
                    throw error;
                }
            } else {
                const error = new Error('دسترسی شما به اطلاعات مسدود شده است.');
                error.code = 401;
                throw error;
            }
        },

        addSlider : async (param, args, {check, isAdmin}) => {
            if(check && isAdmin) {
                try {
                    if(args.default == true) {
                        const slider = await Slider.findOne({ default : true});
                        if(slider != null) {
                            throw error;
                        } else {
                            const saveSlider = await Slider.create({
                                name : args.name,
                                image : args.imageId,
                                default : args.default
                            })

                            return {
                                _id : saveSlider._id,
                                status : 200,
                                message : 'اسلایدر ذخیره شد'
                            }
                        }
                    } else {
                        const saveSlider = await Slider.create({
                            name : args.name,
                            image : args.imageId,
                            default : args.default
                        })

                        return {
                            _id : saveSlider._id,
                            status : 200,
                            message : 'اسلایدر ذخیره شد'
                        }
                    }
                } catch {
                    const error = new Error('امکان ایجاد اسلایدر وجود ندارد!');
                    error.code = 401;
                    throw error;
                }
            } else {
                const error = new Error('دسترسی شما به اطلاعات مسدود شده است.');
                error.code = 401;
                throw error;
            }
        },


        Banner : async (param, args, { check, isAdmin}) => {
            if(check && isAdmin) {
                try {
                    const category = await Category.findById(args.categoryId);
                    const image = await Multimedia.findById(args.imageId);
                    if(category == null || category.parent == null) {
                        return {
                            status : 401,
                            message : 'نمی توانید برای این دسته بندی بنر ثبت کنید!'
                        }
                    } else if(image == null) {
                        return {
                            status : 401,
                            message : 'چنین تصویری قبلا ثبت نشده است!'
                        }
                    } else {
                        await Banner.create({
                            category,
                            image,
                            default : args.default
                        })

                        return {
                            status : 200,
                            message : 'بنر برای دسته بندی مورد نظر ذخیره شد.'
                        }
                    }
                } catch {
                    const error = new Error('امکان ذخیره بنر وجود ندارد!');
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
                        parent : args.input.parent,
                        image : args.input.image
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
                        if(!args.input.original) {
                            const pathim = await Product.findById(args.input.id);
                            imagePath = pathim.original;
                        } else {
                            const { createReadStream, filename } = await args.input.original;
                            const stream = createReadStream();
                            const { filePath } = await updateImageProduct(args.input.id, { stream, filename})
                            const pathim = await Product.findById(args.input.id);
                            imagePath = filePath;
                            fs.unlinkSync(path.join(__dirname ,`/public${pathim.original}`));
                        }


                        
                        const product = await Product.findByIdAndUpdate(args.input.id, { $set : {
                            fname : args.input.fname,
                            ename : args.input.ename,
                            brand : args.input.brand,
                            category : args.input.category,
                            attribute : args.input.attribute,
                            description : args.input.description,
                            details : details,
                            original : imagePath
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

        UpdateProductAttribute : async (param, args, { check, isAdmin }) => {
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
                                            expireAt : Date.now() + (element.expireAt * 24 * 60 * 60 * 1000)
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

        UpdateProductImages : async (parram, args, {check, isAdmin}) => {
            if(check && isAdmin) {
                try {
                    if(args.productId == null || args.images == null) {
                        throw error;
                    }

                    await Product.findByIdAndUpdate(args.productId, { $set : {
                        images : args.images
                    }})

                    return {
                        status : 200,
                        message : 'تصویرهای محصول ویرایش شد.'
                    }
                } catch {
                    const error = new Error('امکان ویرایش تصویرهای محصول وجود ندارد.');
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

        UpdateOrderStatus : async (param, args, { check, isAdmin}) => {
            if(check && isAdmin) {
                try {
                    const order = await OrderStatus.findById(args.orderstatusId);
                    if(order.default == true) {
                        await OrderStatus.findByIdAndUpdate(args.orderstatusId, { $set : {
                            name : args.name,
                            default : true,
                        }}) 
                            return {
                                status : 200,
                                message : 'وضعیت سفارش مورد نظر ویرایش شد.'
                            }
                    } else {
                        await OrderStatus.findOneAndUpdate({ default : true}, { $set : { default : false}});
                        await OrderStatus.findByIdAndUpdate(args.orderstatusId, { $set : {
                            name : args.name,
                            default : args.default,
                        }}) 
                            return {
                                status : 200,
                                message : 'وضعیت سفارش مورد نظر ویرایش شد.'
                            }
                    } 
                    
                } catch {
                    const error = new Error('امکان ویرایش وضعیت سفارش مورد نظر وجود ندارد.');
                    error.code = 401;
                    throw error;
                }
            } else {
                const error = new Error('دسترسی شما به اطلاعات مسدود شده است.');
                error.code = 401;
                throw error;
            }
        },

        UpdatePayment : async (param, args, { check, isAdmin}) => {
            if(check && isAdmin) {
                try {
                    const pay = await Payment.findByIdAndUpdate(args.paymentId, { $set : { orderStatus : args.orderstatusId}});
                    if(pay == null) {
                        return {
                            status : 401,
                            message : 'چنین سفارشی در سیستم ثبت نشده است!'
                        }
                    } else {
                        return {
                            status : 200,
                            message : 'وضعیت سفارش مورد نظر ویرایش شد.'
                        }
                    }

                } catch {
                    const error = new Error('امکان ویرایش سفارش مورد نظر وجود ندارد!');
                    error.code = 401;
                    throw error;
                }
            } else {
                const error = new Error('دسترسی شما به اطلاعات مسدود شده است.');
                error.code = 401;
                throw error;
            }
        },

        UpdateSlider : async (param, args , { check, isAdmin}) => {
           if(check && isAdmin) {
                try {
                    const slider = await Slider.findById(args.sliderId);
                    if(slider.default == true) {
                        await Slider.findByIdAndUpdate(args.sliderId, { $set : {
                            name : args.name,
                            image : args.imageId,
                            default : true
                        }})

                        return {
                            status : 401,
                            message : 'اسلایدر مورد نظر ویرایش شد.'
                        }

                    } else {
                        await Slider.findOneAndUpdate({ default : true}, { $set : { default : false}});
                        await Slider.findByIdAndUpdate(args.sliderId, { $set : {
                            name : args.name,
                            image : args.imageId,
                            default : args.default
                        }})

                        return {
                            status : 200,
                            message : 'اسلایدر مورد نظر ویرایش شد.'
                        }
                    }
                } catch {
                    const error = new Error('امکان ویرایش اسلایدر مورد نظر وجود ندارد!');
                    error.code = 401;
                    throw error;
                }
            } else {
                const error = new Error('دسترسی شما به اطلاعات مسدود شده است.');
                error.code = 401;
                throw error;
            }
        },

        UpdateBanner : async (param, args, { check, isAdmin}) => {
            if(check && isAdmin) {
                try {
                        await Banner.findByIdAndUpdate(args.bannerID, { $set : {
                            default : args.default
                        }})
                        return {
                            status : 200,
                            message : 'بنر مورد نظر ویرایش شد.'
                        }
                } catch {
                    const error = new Error('امکان ویرایش بنر مورد نظر وجود ندارد!');
                    error.code = 401;
                    throw error;
                }
            } else {
                const error = new Error('دسترسی شما به اطلاعات مسدود شده است.');
                error.code = 401;
                throw error;
            }
        },

        DeleteSlider : async (param, args, { check, isAdmin}) => {
            if(check && isAdmin) {
                try {
                    if(args.imageId == null) {
                        const slider = await Slider.findById(args.sliderId);
                        if(slider == null) {
                            return {
                                status : 401,
                                message : 'چنین اسلایدری در سیستم ثبت نشده است!'
                            }
                        }
        
                        slider.remove();
        
                        return {
                            status : 200,
                            message : 'اسلایدر مورد نظر حذف شد'
                        }
                    } else {
                        let arr = [];
                        const slider = await Slider.findById(args.sliderId);
                        const img = slider.image;
                        img.map(async item => {
                            if(item != args.imageId) {
                                arr.push(item)
                            }
                        })

                        await Slider.findOneAndUpdate(args.sliderId, { image : arr })

                        return {
                            status : 200,
                            message : 'تصیویر مورد نظز از اسلایدر حذف شد'
                        };
                    }
                } catch {
                    const error = new Error('امکان ویرایش اسلایدر مورد نظر وجود ندارد!');
                    error.code = 401;
                    throw error;
                }
            } else {
                const error = new Error('دسترسی شما به اطلاعات مسدود شده است.');
                error.code = 401;
                throw error;
            }

        },

        DeleteBanner : async(param, args, { check, isAdmin}) => {
            if(check && isAdmin) {
                try {
                    const banner = await Banner.findById(args.bannerId);
                    if(banner == null) {
                        throw error;
                    } else if(banner.default == true) {
                        throw error;
                    }

                    banner.remove();
                    return {
                        status : 200,
                        message : 'بنر مورد نظر حذف شد'
                    }
                } catch {
                    const error = new Error('امکان حذف بنر مورد نظر وجود ندارد! اگر این بنر فعال است ابتدا یک بنر دیگر را فعال نموده و سپس این بنر را حذف کنید');
                    error.code = 401;
                    throw error;
                }
            } else {
                const error = new Error('دسترسی شما به اطلاعات مسدود شده است.');
                error.code = 401;
                throw error;
            }
        },

        addLike : async (param, args, { check }) => {
            if(check) {
                try {
                    let has = false;
                    const comment = await Comment.findById(args.commentId);
                    if(comment.like.length == 0) {
                        comment.like.push(check.id);
                        await comment.save()
                    } else {

                        comment.like.map(item => {
                            if(item == check.id) {
                                has = true
                            }
                        })
                    }

                    if(has == true) {
                        throw error
                    }
                    
                    comment.like.push(check.id);
                    await comment.save()

                    return {
                        status : 200
                    }


                } catch {
                    const error = new Error('امکان درج like وجود ندارد!');
                    error.code = 401;
                    throw error;
                }

            } else {
                const error = new Error('دسترسی شما به اطلاعات مسدود شده است.');
                error.code = 401;
                throw error;
            }
        },

        addDisLike : async (param, args, { check }) => {
            if(check) {
                try {
                    let hasLike = false;
                    let hasDisLike = false;
                    const comment = await Comment.findById(args.commentId);
                    if(comment.like.length != 0) {
                        comment.like.map(item => {
                            if(item == check.id) {
                                hasLike = true
                            }
                        })

                    } else {
                            comment.dislike.map(item => {
                                if(item == check.id) {
                                    hasDisLike = true
                                }
                            })
                    } 

                    if(hasLike == true) {
                        comment.like.map( async item => {
                            comment.like.splice(item)
                            await comment.save()
                        })
                    }
     

                    if(hasDisLike == true) {
                        throw error
                    }

                    comment.dislike.push(check.id);
                    await comment.save()


                    return {
                        status : 200
                    }
    
                } catch {
                    const error = new Error('امکان درج dislike وجود ندارد!');
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
  
    Banner : {
       category : async (param, args) => await Category.findById(param.category),
       image : async (param, args) => await Multimedia.findById(param.image)
    }
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
                            suggestion : false,
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
    console.log(type);
    return;
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

    const image_product = await Product.findById(id)
    if(!image_product) {
        const error = new Error('محصولی با این مشخصات در سیستم ثبت نشده است.');
        error.code = 401;
        throw error;
    } else {
            return new Promise((resolve, reject) => {
                stream
                    .pipe(fs.createWriteStream(path.join(__dirname, `/public/${filePath}`)))
                    .on('error', error => reject(error))
                    .on('finish', () => resolve({filePath}))
            })
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

let getOptions= (url, params) => {
    return {
        method: 'POST',
        url: url,
        header: {
            'cache-control': 'no-cache',
            'content-type': 'application/json'
        },
        body: params,
        json : true
    }
}



module.exports = resolvers;