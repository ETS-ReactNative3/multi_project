const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Suggestion = Schema({
    product : { type : Schema.Types.ObjectId, ref : 'Product'},
    expireAt : { type : Date}
}, {
    timestamps : true
})

module.exports = mongoose.model('Suggestion', Suggestion);