"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Jobpage = () => {
  return (
    <div>
      <div>
        <Link href={"/jobs/upload"}>
          <Button className="">Upload a Job</Button>
        </Link>
      </div>
      <div>List of jobs</div>
    </div>
  );
};
export default Jobpage;
