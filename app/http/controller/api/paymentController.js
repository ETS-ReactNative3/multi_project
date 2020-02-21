const Payment = require('app/models/payment');
const request = require('request-promise');
const User = require('app/models/users');
const Product = require('app/models/product')

class paymentController {
    async pay(req, res, next) {
        if(check) {
            try {
                const user = await User.findById(check.id);
                if(user.fname != null) {
                    const product = await Product.findById(args.input.product);
                    const attribute = await Productattribute.findById(args.input.attribute);

                    if(!product) {
                        return {
                            status : 401,
                            message : 'خرید این محصول مجاز نمی باشد'
                        }
                    }

                    if(!attribute) {
                        return {
                            status : 401,
                            message : 'قیمت گذاری این کالا به درستی انجام نشده است!'
                        }
                    }

                       // pay process

                        let params = {
                            MerchantID: '97221328-b053-11e7-bfb0-005056a205be',
                            Amount: attribute.price * args.input.count,
                            CallbackURL: 'http://localhost:3000/course/payment/callbackurl',
                            Description: `خرید محصول ${product.ename}`,
                            Mobile : user.phone,
                        }

                        let options = this.getOptions('https://www.zarinpal.com/pg/rest/WebGate/PaymentRequest.json', params);

                        // options
                        //     .then(data => {
                        //         console.log(data.uri)
                        //     })
                        // return;

                        request(options)
                            .then(data => {
                                Payment.create({
                                    user : check.id,
                                    product : product._id,
                                    resnumber : data.Authority,
                                    attribute : args.input.attribute,
                                    discount : args.input.discount,
                                    count : args.input.count,
                                    price : (attribute.price* args.input.count) - ((attribute.price* args.input.count) * (args.input.discount/100)),
                                    receptor : args.input.receptor
                                })

                                res.json(`https://www.zarinpal.com/pg/StartPay/${data.Authority}`);
                            })
                            .catch(err => res.json(err.message));
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
    }

    getOptions(url, params) {
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
}

module.exports = new paymentController();