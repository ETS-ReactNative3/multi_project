const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const User = Schema({
    level : { type : Boolean, required : true, default : 0},
    fname : { type : String, required : false},
    lname : { type : String, required : false},
    code : { type : Number, required : false, unique : true, dropDups : true},
    number : { type : String, required : false, unique : true, dropDups : true},
    phone : { type : String, required : true, unique : true, dropDups : true},
    password : { type : String, required : true},
    email : { type : Number, required : false, unique : true, dropDups : true},
    birthday : { type : String, required : false},
    gender : { type : String, required : false},
    state : [{ type : Schema.Types.ObjectId, ref : 'State', default : 0 }],
    city : [{ type : Schema.Types.ObjectId, ref : 'City', default : 0}],
}, {
    timestamps : true
})

User.plugin(mongoosePaginate);
User.statics.CreateToken = async ({id, phone}, secretID, exp) => {
    return await jwt.sign({id, phone}, secretID, { expiresIn : exp}); 
}

User.statics.CheckToken = async (req, secretID) => {
    const token = req.headers['token'];
    if(token) {
        try {
            return await jwt.verify(token, secretID);
        } catch (e) {
            const error = new Error('این درخواست اعتبار ندارد لطفا از اطلاعات مربوط به خود استفاده کنید')
            error.code = 401;
            throw error;
        }
    } else {
        return null;
    }
}

module.exports = mongoose.model('User', User);


