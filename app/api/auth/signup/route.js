import connectDB from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export default async function POST(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method Not Allowed" });

  await connectDB();

  const { name, email, password } = req.body;
  console.log(name, email, password);

  // Check if user exists
  const existingUser = await User.findOne({ email });
  if (existingUser)
    return res.status(400).json({ message: "User already exists" });

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save new user
  const user = await User.create({ name, email, password: hashedPassword });

  res.status(201).json({ message: "User created successfully", user });
}
