const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Slider = Schema({
    image : { type : Schema.Types.ObjectId, ref : 'Multimedia'},
}, {
    timestamps : true
})



module.exports = mongoose.model('Slider', Slider);