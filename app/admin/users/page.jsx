"use client";

import { useState, useEffect } from "react";
import { fetchUsers, approveUser, deleteUser } from "@/actions/adminActions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "react-hot-toast";

const AdminUserManagement = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [trigger, setTrigger] = useState(false);

  // Fetch users when `trigger` changes
  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const fetchedUsers = await fetchUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        toast.error("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, [trigger]);

  // Unified function for both Approve & Delete actions
  const handleAction = async (action, userId) => {
    try {
      if (action === "approve") {
        await approveUser(userId);
        toast.success("User approved!");
      } else if (action === "reject") {
        await deleteUser(userId);
        toast.success("User rejected!");
      }
      setTrigger((prev) => !prev); // Re-fetch users
    } catch (error) {
      toast.error(`Failed to ${action} user.`);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Unverified Users</h2>
      {loading && <p className="text-gray-500">Loading...</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.length > 0 ? (
          users.map((user) => (
            <Card key={user.id} className="p-4 shadow-md">
              <CardContent>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>

                <div className="flex gap-2 mt-3">
                  <Button
                    onClick={() => handleAction("approve", user.id)}
                    className="bg-green-500 hover:bg-green-600"
                  >
                    Approve
                  </Button>

                  <Button
                    onClick={() => handleAction("reject", user.id)}
                    className="bg-red-500 hover:bg-red-600"
                  >
                    Reject
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-gray-500">No unverified users found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminUserManagement;
