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
        const payment = await Payment.findOne({ resnumber: req.query.Authority }).populate('product').exec();
        if (!payment.product) {
            res.status(401).send('هیچ محصولی برای خرید انتخاب نشده است و لینک پرداخت فاقد اعتبار می باشد.')
        }

        if (req.query.Status && req.query.Status != 'OK') {
            res.status(401).send('امکان خرید وجود ندارد می توانید در فرصتی دیگر نسبت به خرید محصول مورد نظر خود اقدام کنید!')
        }

        let params = {
            MerchantID: '97221328-b053-11e7-bfb0-005056a205be',
            Authority: req.query.Authority,
            Amount: payment.price,
        }

        let options = this.getOptions('https://www.zarinpal.com/pg/rest/WebGate/PaymentVerification.json', params);

        request(options)
            .then(async data =>{
                if(data.Status == 100){
                    payment.set({ payment : true});
                    await User.findByIdAndUpdate(payment.user , { $push : { payCash : payment.product._id }})
                    await payment.save();

                    res.status(200).send("خرید شما با موفقیت ثبت شد می توانید فرآیند آماده سازی و ارسال سفارش خود را از داخل پنل کاربری خود بررسی نمایید");
                }else {
                    res.status(401).send('متاسفانه در فرآیند خرید محصول مورد نظر مشکلی به وجود آمده است لطفا مجددا انتحان نمایید!')
                }
            })
            .catch(err => res.json(err.message))


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