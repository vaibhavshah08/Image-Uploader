import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  imageName: {
    type: String,
    required: true,
  },
  image: {
    type:String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, {timestamps: true});

const Image = mongoose.model('Image', imageSchema);

export default Image;