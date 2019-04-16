import mongoose from "mongoose"; 
import passportLocalMongoose from "passport-local-mongoose"; 

const userSchema = mongoose.Schema({
    name: String, 
    email: String,
    avatarUrl: {
        type: String, 
        default: null
    },
    facebookId: Number, 
    githubId: Number
});

userSchema.plugin(passportLocalMongoose, { usernameField: "email" }); 

const model = mongoose.model("User", userSchema); 

export default model; 