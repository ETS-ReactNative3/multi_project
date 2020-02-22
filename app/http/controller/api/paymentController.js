const Payment = require('app/models/payment');
const request = require('request-promise');
const User = require('app/models/users');
const Product = require('app/models/product')
const Productattribute = require('app/models/p_attribute');
const AutoBind = require('auto-bind');

class paymentController {
    constructor() {
        AutoBind(this)
    }
    async pay(req, res, next) {
        const secretID = 'asdasw!@#ASdjshxwe.xfisdyf6%$qwsdahgsd#$';
        let check = await User.CheckToken(req, secretID);
        if(check) {
            try {
                const user = await User.findById(check.id);
                if(user.fname != null) {
                    const product = await Product.findById(req.body.product);
                    const attribute = await Productattribute.findById(req.body.attribute);

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
                            Amount: attribute.price * req.body.count,
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
                                    user : user._id,
                                    product : product._id,
                                    resnumber : data.Authority,
                                    attribute : req.body.attribute,
                                    discount : req.body.discount,
                                    count : req.body.count,
                                    price : (attribute.price* req.body.count) - ((attribute.price* req.body.count) * (req.body.discount/100)),
                                })

                                res.json(`https://www.zarinpal.com/pg/StartPay/${data.Authority}`);
                            })
                            .catch(err => res.json(err.message));
                } else {
                    res.json({
                        status : 401,
                        message : 'اطلاعات خریدار ناقص است!!'
                    })
                }
                
            } catch {
                res.json({
                    status : 401,
                    message : 'امکان ثبت سفارش وجود ندارد!'
                })
            }
        } else {
            res.json({
                status : 401,
                message : 'دسترسی شما به اطلاعات مسدود شده است.'
            })
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