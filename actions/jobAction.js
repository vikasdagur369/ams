"use server";

import connectDB from "@/lib/db";
import Job from "@/models/Job";
import { redirect } from "next/navigation";

export const jobUploadAction = async (prevData, formData) => {
  await connectDB();
  try {
    console.log("entered try block");

    const rawFormData = {
      CompanyName: formData.get("CompanyName"),
      Role: formData.get("role"),
      Salary: formData.get("salery"),
    };

    console.log(rawFormData);

    if (!rawFormData.CompanyName || !rawFormData.Salary || !rawFormData.Role) {
      return { message: "All Fields are required ! " };
    }

    const newJob = new Jobs({
      companyName: rawFormData.CompanyName,
      role: rawFormData.Role,
      salary: rawFormData.Salary,
    });

    console.log(newJob);
    await newJob.save();
  } catch (error) {
    return { message: " Error in posting a job ! " };
  }
  redirect("/jobs");
};
