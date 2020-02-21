const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const User = Schema({
    level : { type : Boolean, default : false},
    fname : { type : String, default : null},
    lname : { type : String, default : null},
    code : { type : String, default : null},
    number : { type : String, default : null},
    phone : { type : String, required : true},
    password : { type : String, required : true},
    email : { type : String, default : null},
    birthday : { type : String, default : null},
    gender : { type : String, default : null},
    state : [{ type : Schema.Types.ObjectId, ref : 'State', default : null }],
    city : [{ type : Schema.Types.ObjectId, ref : 'City', default : null}],
    address : { type : String, default : null},
    payCach : [{type : Schema.Types.ObjectId, ref : 'Product'}],
    verify : { type : Boolean, default : false},
}, {
    timestamps : true,
    toJSON : { virtuals : true }
})

User.plugin(mongoosePaginate);

User.virtual('comment', {
    ref : 'Comment',
    localField : '_id',
    foreignField : 'user'
})

User.virtual('payment', {
    ref : 'Payment',
    localField : '_id',
    foreignField : 'user'
})

User.virtual('favorite', {
    ref : 'Favorite',
    localField : '_id',
    foreignField : 'user'
})

User.statics.CreateToken = async ({id}, secretID, exp) => {
    return await jwt.sign({id}, secretID, { expiresIn : exp}); 
}

User.statics.CheckToken = async (req, secretID) => {
    const errors = [];
    const token = req.headers['token'];
    if(token) {
        try {
            return await jwt.verify(token, secretID);
        } catch {
            const error = new Error('دسترسی شما به اطلاعات مسدود شده است.');
            error.code = 403;
            throw error;
        }
    } else {
        return null;
    }
}

module.exports = mongoose.model('User', User);


