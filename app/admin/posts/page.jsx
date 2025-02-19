"use client";

import { fetchUnverifiedPosts } from "@/actions/adminActions";
import { useActionState } from "react";

export default function AdminPosts() {
  const [state, fetchPosts] = useActionState(fetchUnverifiedPosts, {
    unverifiedPosts: [],
  });

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Unverified Posts</h1>

      {/* Fetch Button */}
      <button
        onClick={() => fetchPosts(localStorage.getItem("token"))}
        className="bg-blue-600 text-white px-4 py-2 rounded-md"
      >
        Fetch Unverified Posts
      </button>

      {/* Show Loading State */}
      {state.message && <p className="mt-4 text-red-500">{state.message}</p>}
      {state.unverifiedPosts.length === 0 && (
        <p className="mt-4">No unverified posts found.</p>
      )}

      {/* Show List of Posts */}
      <div className="mt-6">
        {state.unverifiedPosts.map((post) => (
          <div key={post._id} className="border p-4 rounded-md mb-4 shadow-md">
            <p className="text-lg font-semibold">{post.postText}</p>
            <p className="text-gray-600">
              By: {post.user.name} ({post.user.email})
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
