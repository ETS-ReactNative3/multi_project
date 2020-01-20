const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const User = Schema({
    level : { type : Boolean, required : true, default : false},
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
}, {
    timestamps : true
})

User.plugin(mongoosePaginate);
User.statics.CreateToken = async ({id, phone}, secretID, exp) => {
    return await jwt.sign({id, phone}, secretID, { expiresIn : exp}); 
}

User.statics.CheckToken = async (req, secretID) => {
    const errors = [];
    const token = req.headers['token'];
    if(token) {
        try {
            return await jwt.verify(token, secretID);
        } catch (e) {}
    } else {
        return null;
    }
}

module.exports = mongoose.model('User', User);


