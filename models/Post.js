import mongoose, { Schema } from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    postText: {
      type: String,
      required: true,
    },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Posts || mongoose.model("Posts", PostSchema);
