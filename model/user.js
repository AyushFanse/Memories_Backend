const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//----------------------------* Schema for User Data *----------------------------//

const userSchema = new Schema({
    first_name:{
        type : String,
        required : true
    },
    last_name:{
        type : String,
        required : true
    },
    username:{
        type : String,
        minLength: 4,
        required : true,
        unique : true
    },
    number:{
        type : String,
        required : true,
        unique : true
    },
    password:{
        type : String,
        required : true,
        minLength: 5
    },
    email:{
        type : String,
        required : true,
        lowercase: true,        
        unique : true
    }
})

///////////////////////////* Exporting Part*////////////////////////////

const User = mongoose.model('User' ,userSchema ,'Users' );
module.exports = User;