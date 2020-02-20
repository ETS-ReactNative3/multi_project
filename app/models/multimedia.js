const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const Schema = mongoose.Schema;

const Multimedia = Schema({
    name : { type : String, required : true},
    dir : { type : String, required : true}
}, {
    timestamps : true
})

Multimedia.plugin(mongoosePaginate);

module.exports = mongoose.model('Multimedia', Multimedia);