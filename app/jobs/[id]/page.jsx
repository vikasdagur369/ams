"use client";

import { useEffect, useState } from "react";
import { fetchJobById } from "@/actions/jobAction"; // Function to fetch job details
import { useParams } from "next/navigation";

const JobDetail = () => {
  const params = useParams();
  const id = params.id;

  console.log(id);
  const [job, setJob] = useState(null);

  console.log(job);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const res = await fetchJobById(id);
        setJob(res);
      };
      fetchData();
    }
  }, [id]);

  if (!job) return <p>Loading job details...</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto border rounded shadow">
      <h1 className="text-2xl font-bold">{job.compName}</h1>
      <p className="text-gray-600">Role: {job.role}</p>
      <p className="text-gray-600">Salary: {job.salary}</p>

      {/* Apply Now Button (this could lead to a form for application submission) */}

      <a href={job.link || "#"}>
        <button className="mt-4 bg-green-500 text-white px-6 py-2 rounded">
          Apply Now
        </button>
      </a>
    </div>
  );
};

export default JobDetail;
