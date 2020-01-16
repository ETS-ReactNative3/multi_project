const User = require('app/models/users');
const bcrypt = require('bcryptjs');
const ImageSize = require('image-size');
const FileType = require('file-type');

const Multimedia = require('app/models/multimedia');
const Category = require('app/models/category');
const Survey = require('app/models/survey');
const Brand = require('app/models/brand');
const Product = require('app/models/product');
const Productdetails = require('app/models/product-details');

const resolvers = {
    Query : {
        login : async (param, args, { secretID }) => {
            const user = await User.findOne({ phone : args.input.phone});
            if(!user) {
                const error = new Error('کاربری با این مشخصات در سیستم ثبت نام نکرده است');
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
                token : await User.CreateToken(user, secretID, '1h'),
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
        }
    },

    Mutation : {
        register : async (param, args) => {
            const person = await User.findOne({ phone : args.input.phone});
            if(person) {
                const error = new Error('این شماره تلفن قبلا در سیستم ثبت شده است!');
                error.code = 401;
                throw error;
            }
            const salt = await bcrypt.genSaltSync(15);
            const hash = await bcrypt.hashSync(args.input.password, salt);
            const user = await new User({
                phone : args.input.phone,
                password : hash,
                ...args
            })
            user.save(err => {
                if(err) {
                    const error = new Error('متاسفانه! اطلاعات شما ذخیره نشد.مجددا تلاش نمایید');
                    error.code = 401;
                    throw error;
                }
            });
            return {
                status : 200,
                message : 'اطلاعات شما با موفقیت ثبت شد. می توانید به حساب کاربری خود لاگین نمایید.'
            };
            
        },

        multimedia : async (param, args) => {
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

        category : async (param, args) => {
            const category = await new Category({
                name : args.input.name,
                label : args.input.label,
                parent : args.input.parent,
                subcategory : args.input.subcategory
            })

            await category.save(err => {
                if(err) {
                    const error = new Error('امکان اضافه کردن این دسته بندی وجود ندارد.');
                    error.code = 401;
                    throw error;
                }
            })

            return {
                status : 200,
                message : 'دسته بندی مورد نظر ایجاد شد.'
            }
        },

        survey : async (param, args) => {
            const ser = await new Survey({
                category : args.input.category,
                name : args.input.name,
                label : args.input.label
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
        },

        brand : async (param, args) => {
            const brand = await new Brand({
                category : args.input.category,
                name : args.input.name,
                label : args.input.label,
                image : args.input.image
            });

            await brand.save(err => {
                if(err) {
                    const error = new Error('امکان ثبت برند مورد نظر برای این دسته بندی وجود ندارد.');
                    error.code = 401;
                    throw error;
                }
            })

            return {
                status : 200,
                message : 'برند برای دسته بندی مورد نظر ثبت شد.'
            }
        },

        product : async (param, args) => {
            const pro = await Product({
                ...args.input
            })

            await pro.save();

            return {
                status : 200,
                message : 'ok'
            }
        },

        productdetails : async (param, args) => {
            const ProDetails = await new Productdetails({
                category : args.input.category,
                name : args.input.name,
                description : args.input.description
            })

            ProDetails.save(err => {
                if(err) {
                    const error = new Error('امکان درج جزئیات محصول برای این دسته بندی وجود ندارد.');
                    error.code = 401;
                    throw error;
                }
            });
        }
    }
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

module.exports = resolvers;