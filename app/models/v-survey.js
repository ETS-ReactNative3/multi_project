const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Vsurvey = Schema({
    survey : { type : Schema.Types.ObjectId, ref : 'Survey'},
    value : { type : Number , required : true}
})

module.exports = mongoose.model('Vsurvey', Vsurvey);