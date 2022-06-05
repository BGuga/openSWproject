import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, unique: true },
  password: { type: String, },
  likeMovies: [{type: String}],
  isO_Auth: {type:Boolean,default:false}
});

userSchema.pre('save', async function(){
  console.log("Users password:", this.password);
  this.password = await bcrypt.hash(this.password, 5);``
  console.log("Users password:", this.password);
})

const User = mongoose.model("User", userSchema);
export default User;