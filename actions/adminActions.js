"use server";

import connectDB from "@/lib/db";
import User from "@/models/User";
import jwt from "jsonwebtoken";


connectDB();

// -----------------------------------fetchAllUser--------------------------------------------

export const fetchUsers = async () => {
  try {
    // Fetch users where isVerified is false
    const users = await User.find({ isVerified: false });

    //map the user objects
    const userList = users.map((user) => ({
      id: user._id.toString(), // lowercase 'id' for consistency
      email: user.email,
      name: user.name,
    }));

    return userList;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

// ----------------------------------deleteUser-------------------------------------------------

export const deleteUser = async (userId) => {
  try {
    if (!userId) {
      return { success: false, message: "User ID is required!" };
    }

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return { success: false, message: "User not found!" };
    }

    return { success: true, message: "User deleted successfully!" };
  } catch (error) {
    console.error("Delete user error:", error);
    return { success: false, message: "Server error. Try again later." };
  }
};

//   -------------------------ApproveUser-------------------------------------------------------

export const approveUser = async (userId) => {
  try {
    if (!userId) {
      return { success: false, message: "User ID is required!" };
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { isVerified: true },
      { new: true }
    );

    if (!updatedUser) {
      return { success: false, message: "User not found!" };
    }

    return { success: true, message: "User approved successfully!" };
  } catch (error) {
    console.error("Approve user error:", error);
    return { success: false, message: "Server error. Try again later." };
  }
};
// -----------------------------------fetch Posts-----------------------------------------------



export const fetchUnverifiedPosts = async (token) => {
  try {
    if (!token) {
      return { message: "Unauthorized! No token provided." };
    }

    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { userId, role } = decoded; // Extract user role

    // Check if the user is an admin
    if (role !== "admin") {
      return { message: "Access denied! Only admins can fetch unverified posts." };
    }

    // Fetch all unverified posts and populate the user details (name & email)
    const unverifiedPosts = await Posts.find({ verified: false }).populate("user", "name email");

    return { unverifiedPosts };
  } catch (error) {
    console.error("Error fetching unverified posts:", error);
    return { message: "Error fetching unverified posts." };
  }
};
