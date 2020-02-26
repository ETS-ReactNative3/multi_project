const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Slider = Schema({
    name : { type : String, required : true},
    image : [{ type : Schema.Types.ObjectId, ref : 'Multimedia'}],
    default : { type : Boolean, default : false}
}, {
    timestamps : true
})



module.exports = mongoose.model('Slider', Slider);