"use client";
import { jobUploadAction } from "@/actions/jobAction";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";

const JobUploadPage = () => {
  const [resData, updatedAction] = useActionState(jobUploadAction, {
    message: "",
  });

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        action={updatedAction}
        className="bg-white p-8 rounded-lg shadow-md space-y-4 w-96"
      >
        <div className="space-y-2">
          <label
            htmlFor="CompanyName"
            className="block text-sm font-medium text-gray-700"
          >
            Company Name
          </label>
          <input
            type="text"
            name="CompanyName"
            id="name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="role"
            className="block text-sm font-medium text-gray-700"
          >
            Role
          </label>
          <input
            type="text"
            name="role"
            id="role"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="salery"
            className="block text-sm font-medium text-gray-700"
          >
            Salary
          </label>
          <input
            type="text"
            name="salery"
            id="salery"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <Button type="submit" className="w-full">
          Upload
        </Button>
        {resData && <div>{resData.message}</div>}
      </form>
    </div>
  );
};
export default JobUploadPage;
