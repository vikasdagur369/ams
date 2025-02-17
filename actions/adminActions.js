"use server";

import connectDB from "@/lib/db";
import User from "@/models/User";

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
