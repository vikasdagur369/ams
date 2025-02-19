import { Posts } from "@/models/Post";
import jwt from "jsonwebtoken";

export const SavePost = async (prevData, formData, token) => {
  try {
    if (!token) {
      return { message: "Unauthorized! No token provided." };
    }

    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { userId, name, email } = decoded; // Extract user info from token

    const rawData = {
      postText: formData.get("data"),
    };

    if (!rawData.postText) {
      return { message: "Empty input!" };
    }

    // Create new post including user info
    const newPost = new Posts({
      postText: rawData.postText,
      user: userId, // Save userId in the post
      name: name,
    });

    await newPost.save();
    return { message: "Post created successfully!" };
  } catch (error) {
    console.error("Error in saving the post:", error);
    return { message: "Error in saving the post." };
  }
};
