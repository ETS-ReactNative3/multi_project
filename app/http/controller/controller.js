const autoBind = require('auto-bind');
const Recaptcha = require('express-recaptcha').RecaptchaV2;
const { validationResult } = require('express-validator');

module.exports = class controller {
    constructor() {
        autoBind(this);
        this.setRecaptcha();
    }

    setRecaptcha() {
        this.recaptcha = new Recaptcha(config.service.RECAPTCHA.SITE_KEY, config.service.RECAPTCHA.SECRET_KEY, {...config.service.RECAPTCHA.options})
    }


}