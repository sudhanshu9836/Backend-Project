import mongoose,{Schema, model} from "mongoose";
import bcrypt from 'bcrypt'
import jsonwebtoken from "jsonwebtoken";
const userSchema = new Schema(
    {
    username:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    fullName:{
            type: String,
            required: true,
            trim: true,
            index: true
        },
    avatar:{
                type: String,
                required: true
            },
    coverimage:{
        type: String
    },
    watchHistory:[{
        type: Schema.Types.ObjectId,
        ref: "Video"
    }],
    password:{
        type: String,
        required: [true, "Password is required"]
    },
    refreshToken:{
        type: String
    }
        },{timestamps:true}
);

userSchema.methods.isPasswordCorrect = async function(pass){
    return await bcrypt.compare(pass, this.password)
 }

 userSchema.methods.generateAccessToken = function(){
    jwt.sign(
        {
        _id:this.id,
        email: this.email,
        username: this.username,
        fullName: this.fullName
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
)
 }

 userSchema.methods.generateRefreshToken = function(){
    jwt.sign(
        {
        _id:this.id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    })
 }
 

export const User = model("User",userSchema)