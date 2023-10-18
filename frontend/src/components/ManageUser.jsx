import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, json, useNavigate } from "react-router-dom";
import UseAppContext from "../AppContext";
import { motion } from "framer-motion";

const ManageUser = () => {
  const [userData, setUserData] = useState([]);
  const { loggedin, logout } = UseAppContext();

  const navigate = useNavigate();

  const fetchUserData = async () => {
    const res = await fetch(process.env.REACT_APP_BACKEND_URL + "/user/getall");
    console.log(res.status);

    if (res.status === 200) {
      const data = await res.json();
      console.log(data);
      setUserData(data);
    }
  };

  const handleDeleteUser = async (userId, userAvatar) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this User?"
    );

    if (confirmDelete) {
      try {
        const res = await fetch(
          process.env.REACT_APP_BACKEND_URL + `/user/delete/${userId}`,
          {
            method: "DELETE",
          }
        );
        if (res.status === 200) {
          console.log("User deleted successfully.");
          toast.success("User deleted successfully.");
          if (userAvatar) {
            try {
              const res = await fetch(
                process.env.REACT_APP_BACKEND_URL +
                  `/util/deletefile/${userAvatar}`,
                {
                  method: "DELETE",
                }
              );
              if (res.status === 200) {
                console.log("User's Avatar deleted successfully.");
                toast.success("User's Avatar deleted successfully.");
              } else {
                console.log("Error deleting User's Avatar.");
                toast.error("Error deleting User's Avatar.");
              }
            } catch (error) {
              console.error("An error occurred in image deletion:", error);
              toast.error("An error occurred in image deletion.");
            }
          } else {
            console.log("No image found");
            toast.error("No image found");
          }
          fetchUserData();
        } else {
          console.log("Error deleting User.");
          toast.error("Error deleting User.");
        }
      } catch (error) {
        console.error("An error occurred:", error);
        toast.error("An error occurred.");
      }
      if (userId === JSON.parse(sessionStorage.user)._id) {
        logout();
        navigate("/");
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <motion.div
      className="container py-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ height: "100vh" }}
    >
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
                      onClick={() => handleDeleteUser(user._id, user.avatar)}
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
    </motion.div>
  );
};

export default ManageUser;
