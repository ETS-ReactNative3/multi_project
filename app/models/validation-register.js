const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VlidationRegister = Schema({
    verifyToken : { type : String, required : true}
})

module.exports = mongoose.model('VlidationRegister', VlidationRegister);