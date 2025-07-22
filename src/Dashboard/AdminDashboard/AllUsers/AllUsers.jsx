import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Loading from "../../../Shared/Loading/Loading";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-users-search", searchQuery],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-users", {
        params: { search: searchQuery.trim() || undefined },
      });
      return res.data;
    },
  });

  const handleRoleChange = async (userId, newRole) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `You want to change role to ${newRole}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, change it!",
      cancelButtonText: "No, cancel",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await axiosSecure.patch(`/update-role/${userId}`, {
        role: newRole,
      });
      if (res.data.modifiedCount > 0) {
        Swal.fire("Updated!", `Role changed to ${newRole}`, "success");
        refetch();
      }
    } catch (error) {
      Swal.fire("Error", "Failed to update role", "error");
    }
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearchSubmit = () => {
    setSearchQuery(searchText);
  };

  if (isLoading) return <Loading />;

  return (
    <div className="px-2 md:px-4">
      {/* Search Bar */}
      <div className="mb-4 flex flex-col md:flex-row gap-2 md:items-center">
        <input
          type="text"
          value={searchText}
          onChange={handleSearchChange}
          placeholder="Search by name or email"
          className="input input-bordered w-full max-w-md"
        />
        <button
          onClick={handleSearchSubmit}
          className="btn btn-primary w-full md:w-auto"
        >
          Search
        </button>
      </div>

      {/* Responsive Table Wrapper */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full min-w-[800px] text-sm md:text-base">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.name || "N/A"}</td>
                  <td>{user.email}</td>
                  <td className="capitalize">{user.role || "user"}</td>
                  <td>
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {user.role === "admin" ? (
                        <button
                          onClick={() => handleRoleChange(user._id, "user")}
                          className="btn btn-xs btn-error"
                        >
                          Cancel Admin
                        </button>
                      ) : (
                        <button
                          onClick={() => handleRoleChange(user._id, "admin")}
                          className="btn btn-xs btn-success"
                        >
                          Make Admin
                        </button>
                      )}

                      {user.role === "vendor" ? (
                        <button
                          onClick={() => handleRoleChange(user._id, "user")}
                          className="btn btn-xs btn-warning"
                        >
                          Cancel Vendor
                        </button>
                      ) : (
                        <button
                          onClick={() => handleRoleChange(user._id, "vendor")}
                          className="btn btn-xs btn-info"
                        >
                          Make Vendor
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
