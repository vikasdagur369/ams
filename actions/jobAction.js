"use server";

import connectDB from "@/lib/db";
import Jobs from "@/models/Job";
import { redirect } from "next/navigation";

await connectDB();

export const jobUploadAction = async (prevData, formData) => {
  try {
    console.log("entered try block");

    const rawFormData = {
      companyName: formData.get("CompanyName"),
      role: formData.get("role"),
      salary: formData.get("salery"),
    };

    console.log(rawFormData);

    if (!rawFormData.companyName || !rawFormData.salary || !rawFormData.role) {
      return { message: "All Fields are required ! " };
    }

    const newJob = new Jobs({
      CompanyName: rawFormData.companyName,
      Role: rawFormData.role,
      Salery: rawFormData.salary,
    });

    console.log(newJob);
    await newJob.save();
  } catch (error) {
    console.error("Job posting error:", error);
    return { message: `Error in posting a job: ${error.message}` };
  }
  redirect("/jobs");
};

// ---------------------------------fetch list of jobs ---------------------------------------

export const fetchJobs = async () => {
  try {
    const jobs = await Jobs.find();
    const jobsData = jobs.map((job) => ({
      compName: job.CompanyName,
      role: job.Role,
      salary: job.Salery, // Fix typo (Salary instead of Salery)
      id: job._id,
    }));
    return jobsData;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }
};

