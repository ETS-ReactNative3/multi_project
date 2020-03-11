const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VlidationRegister = Schema({
    verifyToken : { type : String, required : true},
    expire : { type : Boolean, default : false}
})

module.exports = mongoose.model('VlidationRegister', VlidationRegister);