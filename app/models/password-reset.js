const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PasswordReset = Schema({
    phone : { type : String, rquired : true},
    code : { type : String, required : true},
    use : { type : Boolean, default : false}
}, {
    timestamps : true
})

module.exports = mongoose.model('PasswordReset', PasswordReset);