"use server";

import connectDB from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

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
    return { message: "Server error. Try again later." };
  }
  redirect("/login");
};

// login-action
//====================================================================================================

export const loginAction = async (prevState, formData) => {
  const rawFormData = {
    userId: formData.get("userId"),
    password: formData.get("password"),
  };

  // Validate input fields
  if (!rawFormData.userId || !rawFormData.password) {
    return { message: "All fields are required!" };
  }

  // Check if the user is Admin
  if (
    rawFormData.userId === process.env.ADMIN_USERID &&
    rawFormData.password === process.env.ADMIN_PASSWORD
  ) {
    // Generate an Admin token
    const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    console.log(token);

    // Store cookies() in a variable & await before setting
    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      maxAge: 60 * 60, // 1 days
      path: "/",
    });

    redirect("/admin");
  }
  try {
    // Find the user by email or student ID
    const user = await User.findOne({ email: rawFormData.userId });

    if (!user) {
      return { message: "Invalid userId!" };
    }

    // Check password
    const isMatch = await bcrypt.compare(rawFormData.password, user.password);
    if (!isMatch) {
      return { message: "Invalid password!" };
    }

    // Check if user is verified
    if (!user.isVerified) {
      return { message: "Your account is not verified. Contact admin!" };
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Store cookies() in a variable & await before setting
    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      maxAge: 60 * 60, // 7 days
      path: "/",
    });
  } catch (error) {
    console.error("Login error:", error);
    return { message: "Server error. Try again later." };
  }
  redirect("/");
};
