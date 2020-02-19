const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

const Schema = mongoose.Schema;

const Multimedia = Schema({
    name : { type : String, required : true},
    attribute : { type : String, required : true, default : 'localhost'},
    dimeWidth : { type : String, required : true, defalut : "0"},
    dimheight : { type : String, required : true, default : "0"},
    format : { type : String, required : true, defalut : "png"},
    dir : { type : String, required : true}
}, {
    timestamps : true
})

Multimedia.plugin(mongoosePaginate);

module.exports = mongoose.model('Multimedia', Multimedia);