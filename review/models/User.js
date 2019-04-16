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
    githubId: Number,
    comments: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Comment"
        }
      ],
      videos: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Video"
        }
      ]
});

userSchema.plugin(passportLocalMongoose, { usernameField: "email" }); 

const model = mongoose.model("User", userSchema); 

export default model; 