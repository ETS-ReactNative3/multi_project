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

Multimedia.statics.SaveFile = async ({ stream, filename}) => {
    let date = new Date();
    const dir = `/uploads/${date.getFullYear()}/${date.getMonth()}`;
    mkdirp.sync(path.join(__dirname, `/public/${dir}`));

    const filePath = `${dir}/${filename}`;

    return new Promise((resolve, reject) => {
        stream
            .pipe(fs.createWriteStream(path.join(__dirname, `/public/${filePath}`)))
            .on('error', error => reject(error))
            .on('finish', () => resolve({filePath}))
    })
}


module.exports = mongoose.model('Multimedia', Multimedia);