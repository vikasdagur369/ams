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
  try {
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
      const token = jwt.sign(
        { role: "admin" },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      // Set admin token in HttpOnly Cookie
      cookies().set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60, // 7 days
        path: "/",
      });

      redirect("/admin");
    }

    // Find the user by email or student ID
    const user = await User.findOne({ email: rawFormData.userId });

    if (!user) {
      return { message: "Invalid credentials!" };
    }

    // Check password
    const isMatch = await bcrypt.compare(rawFormData.password, user.password);
    if (!isMatch) {
      return { message: "Invalid credentials!" };
    }

    // Check if user is verified
    if (!user.isVerified) {
      return { message: "Your account is not verified. Contact admin!" };
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Set token in HttpOnly Cookie
    cookies().set("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    // Redirect to home page after login
    redirect("/");

  } catch (error) {
    console.error("Login error:", error);
    return { message: "Server error. Try again later." };
  }
};

