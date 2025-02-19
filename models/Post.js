const postSchema = new mongoose.Schema({
  postText: { type: String, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  verified: { type: Boolean, default: false }, // Unverified by default
  createdAt: { type: Date, default: Date.now },
});

export const Posts = mongoose.model("Posts", postSchema);
