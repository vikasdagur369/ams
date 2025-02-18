"use server";

import connectDB from "@/lib/db";
import Posts from "@/models/Post";

await connectDB();

export const SavePost = async (prevData, formData) => {
  try {
    const rawData = {
      postText: formData.get("data"),
    };
    if (!rawData.postText) {
      return { message: "Empty input !" };
    }

    const newPost = new Posts({
      postText: rawData.postText,
    });

    await newPost.save();
    return { message: "post created !" };
  } catch (error) {
    console.error("error in saving the post.", error);
    return { message: "error in saving the post" };
  }
};
