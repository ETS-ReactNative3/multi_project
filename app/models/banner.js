const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Banner = Schema({
    categorry : { type : Schema.Types.ObjectId, ref : 'Category'},
    image : { type : Schema.Types.ObjectId, ref : 'Multimedia'},
    default : { type : Boolean, default : false}
})

module.exports = mongoose.model('Banner', Banner)