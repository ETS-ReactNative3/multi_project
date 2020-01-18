const controller = require('app/http/controller/controller');

class loginController extends controller {
    index(req, res) {
        res.json({
            recaptcha : this.recaptcha.render()
        })
    }
}

module.exports = new loginController();