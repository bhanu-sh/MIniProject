import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ManageUser = () => {
  const [userData, setUserData] = useState([]);

  const fetchUserData = async () => {
    const res = await fetch(process.env.REACT_APP_BACKEND_URL + "/user/getall");
    console.log(res.status);

    if (res.status === 200) {
      const data = await res.json();
      console.log(data);
      setUserData(data);
    }
  };

  const handleDeleteUser = async (userId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this User?"
    );

    if (confirmDelete) {
      try {
        const res = await fetch(process.env.REACT_APP_BACKEND_URL + `/user/delete/${userId}`, {
          method: "DELETE",
        });

        if (res.status === 200) {
          console.log("User deleted successfully.");
          fetchUserData();
        } else {
          console.log("Error deleting User.");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="container py-5">
      <h1 className="text-center">Manage Users</h1>
      <div className="table-responsive">
        <table className="table table-dark">
          <thead>
            <tr className="text-center">
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th colSpan={2}>Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {userData.map((user) => {
              return (
                <tr>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                  <td>
                    <button
                      className="btn btn-danger w-75"
                      onClick={() => handleDeleteUser(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <Link
                      to={"/updateuser/" + user._id}
                      className="btn btn-warning w-100"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUser;
