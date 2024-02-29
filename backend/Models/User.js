import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt' ;

const UserSchema = new  mongoose.Schema({
    name :{
        type : String,
        required : [true,'Please Enter a Name']
    },
    // avatar : {
    //     public_id : String,
    //     url : String
    // },
    email :{
        type : String,
        required : [true,'Please Enter an Email'],
        unique   : [true,'Email Already Exists']
    },
    password :{
        type : String,
        required : [true,'Please Enter a Password'],
        minLength : [6 , "Password must be atleast 6 characters"],
        select :false
    }
})


UserSchema.pre('save' , async function(next) {
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10)
    }
    next();
})

const User = mongoose.model('User',UserSchema);

export default User;