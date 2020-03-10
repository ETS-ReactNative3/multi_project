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
        const payment = await Payment.findOne({ resnumber: req.query.Authority }).populate([{path : 'products'}, { path : 'attributes'}]).exec();
        if (payment.products.length == 0) {
            res.status(401).send('هیچ محصولی برای خرید انتخاب نشده است و لینک پرداخت فاقد اعتبار می باشد.')
            return;
        }

        if (req.query.Status && req.query.Status != 'OK') {

            res.status(401).send('امکان خرید وجود ندارد می توانید در فرصتی دیگر نسبت به خرید محصول مورد نظر خود اقدام کنید!')
            return ;
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
                    await payment.set({ payment : true});
                    payment.products.map(async item => {
                        await Product.findByIdAndUpdate(item._id, { $inc : { soldCount : 1}})
                        const user = await User.findById(payment.user);
                        if(user.payCash.indexOf(item._id) === -1) {
                            user.payCash.push(item._id);
                            await user.save()
                        }
                    })

                    payment.attributes.map(async item => {
                        await Productattribute.findByIdAndUpdate(item._id, { $inc : { stock : -1 }})
                    })
                    await payment.save();

                    res.status(401).send("خرید شما با موفقیت ثبت شد می توانید فرآیند آماده سازی و ارسال سفارش خود را از داخل پنل کاربری خود بررسی نمایید");
                    return;
                }else {
                    res.status(401).send('متاسفانه در فرآیند خرید محصول مورد نظر مشکلی به وجود آمده است لطفا مجددا انتحان نمایید!')
                    return;
                }
            })
            .catch(err => res.status(401).json(err.message))


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