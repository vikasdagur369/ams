"use client";
import { fetchJobs } from "@/actions/jobAction";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";

const Jobpage = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchJobs();
      setJobs(Array.isArray(res) ? res : []);
    };
    fetchData();
  }, []);

  return (
    <div className="p-4">
      <div className="mb-4">
        <Link href="/jobs/upload">
          <Button className="bg-blue-500 text-white">Upload a Job</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div key={job.id} className="border p-4 rounded shadow-md">
              <h2 className="text-lg font-semibold">{job.compName}</h2>
              <p className="text-gray-600">Role: {job.role}</p>
              <p className="text-gray-600">Salary: {job.salary}</p>
              <Button>Apply</Button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No jobs available</p>
        )}
      </div>
    </div>
  );
};

export default Jobpage;
