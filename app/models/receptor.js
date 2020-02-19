const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Receptor = Schema({
    fname : { type : String, required : true},
    lname : { type : String, required : true},
    code : { type : String, required : true},
    number : { type : String, required : true},
    phone : { type : String, required : true},
    state : [{ type : Schema.Types.ObjectId, ref : 'State', required : true }],
    city : [{ type : Schema.Types.ObjectId, ref : 'City', required : true}],
    address : { type : String, required : true},
});

module.exports = mongoose.model('Receptor', Receptor);