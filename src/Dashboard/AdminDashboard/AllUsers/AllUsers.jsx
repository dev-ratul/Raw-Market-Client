import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
  import Swal from "sweetalert2";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: users = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-users");
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

  if (isPending) return <div>Loading...</div>;

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Current Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.name || "N/A"}</td>
              <td>{user.email}</td>
              <td>{user.role || "user"}</td>
              <td className="space-x-1">
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
