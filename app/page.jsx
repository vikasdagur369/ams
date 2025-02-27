"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {  useState } from "react";
import { FaUserCircle } from "react-icons/fa";

export default function HomePage() {

  const [posts, setPosts] = useState([
    { id: 1, user: "John Doe", content: "Excited to join HCSTsync!" },
    {
      id: 2,
      user: "Jane Smith",
      content: "Looking for a team to collaborate!",
    },
  ]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-1/4 p-4 bg-white shadow-md">
        <h2 className="text-xl font-bold">Groups</h2>
        <ul className="mt-4 space-y-2">
          <li className="p-2 bg-gray-200 rounded-lg">Web Development</li>
          <li className="p-2 bg-gray-200 rounded-lg">AI/ML Enthusiasts</li>
          <li className="p-2 bg-gray-200 rounded-lg">
            Competitive Programming
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="w-1/2 p-6">
        {/* Hero Section */}
        <section className="mb-6 p-6 bg-white shadow-md rounded-xl">
          <h1 className="text-2xl font-bold">Welcome to HCSTsync!</h1>
          <p className="text-gray-600">
            Connect with alumni, share ideas, and explore opportunities.
          </p>
        </section>

        {/* Post Input */}
        <Card className="mb-4 p-4">
          <CardContent>
            <form action={""} className="flex gap-2">
              <FaUserCircle size={40} className="text-gray-500" />
              <Input
                id="data"
                name="data"
                placeholder="Write something..."
                className="flex-grow"
              />
              <Button type="submit">Post</Button>
            </form>
          </CardContent>
        </Card>

        {/* Posts Feed */}
        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id} className="p-4">
              <CardContent>
                <h3 className="font-bold">{post.user}</h3>
                <p>{post.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* Right Sidebar */}
      <aside className="w-1/4 p-4 bg-white shadow-md">
        <h2 className="text-xl font-bold">Trending</h2>
        <ul className="mt-4 space-y-2">
          <li className="p-2 bg-gray-200 rounded-lg">
            Internship Opportunities
          </li>
          <li className="p-2 bg-gray-200 rounded-lg">Upcoming Hackathons</li>
          <li className="p-2 bg-gray-200 rounded-lg">Alumni Meet 2024</li>
        </ul>
      </aside>
    </div>
  );
}
