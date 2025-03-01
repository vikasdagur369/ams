"use client";

import Link from "next/link";

const YearbookPage = () => {
  return (
    <div className="flex flex-wrap gap-4 p-4">
      <Link
        href={"/alumni/yearbook/2021"}
        className="w-32 h-32 flex items-center justify-center bg-blue-500 text-white text-xl font-bold rounded-lg shadow-md cursor-pointer hover:bg-blue-700 transition"
      >
        2021
      </Link>
      <Link
        href={"/alumni/yearbook/2022"}
        className="w-32 h-32 flex items-center justify-center bg-blue-500 text-white text-xl font-bold rounded-lg shadow-md cursor-pointer hover:bg-blue-700 transition"
      >
        2022
      </Link>
    </div>
  );
};

export default YearbookPage;
