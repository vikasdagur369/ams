"use server";

import connectDB from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

connectDB();


// signup action
export const signUpAction = async (prevState, formData) => {
  try {
    const rawFormData = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    // Validate required fields
    if (!rawFormData.name || !rawFormData.email || !rawFormData.password) {
      return { message: "All fields are required" };
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: rawFormData.email });
    if (existingUser) {
      return { message: "User already exists" };
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(rawFormData.password, salt);

    // Create new user
    const newUser = new User({
      name: rawFormData.name,
      email: rawFormData.email,
      password: hashedPassword,
      isVerified: false, // Default false, admin will approve
    });

    await newUser.save();

    // Redirect to sign-in page after successful signup
  } catch (error) {
    console.error("Signup error:", error);
    return {  message: "Server error. Try again later." };
  }
  redirect("/login");
};

// login-action

export const loginAction = async (prevState, formData) =>{
  
}