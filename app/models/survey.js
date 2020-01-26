const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Survey = Schema({
    category : { type : mongoose.Types.ObjectId, ref : 'Categroy'},
    list : [{ type : Object, required : true}]
})

module.exports = mongoose.model('Survey', Survey);