import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Messages = () => {
  const [messageData, setMessageData] = useState([]);

  const fetchMessageData = async () => {
    const res = await fetch(
      process.env.REACT_APP_BACKEND_URL + "/message/getall"
    );
    if (res.status === 200) {
      const data = await res.json();
      setMessageData(data);
      console.log(data);
    }
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      const res = await fetch(
        process.env.REACT_APP_BACKEND_URL + `/message/delete/${messageId}`,
        {
          method: "DELETE",
        }
      );

      if (res.status === 200) {
        console.log("Message deleted successfully.");
        toast.success("Message deleted successfully.");
        fetchMessageData();
      } else {
        console.log("Error deleting message.");
        toast.error("Error deleting message.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("An error occurred.");
    }
  };

  useEffect(() => {
    fetchMessageData();
  }, []);

  const convertToIST = (utcDate) => {
    const options = { timeZone: "Asia/Kolkata" };
    return new Date(utcDate).toLocaleString("en-US", options);
  };

  return (
    <div className="container">
      <h1>Messages:</h1>
      <hr />

      <div className="row">
        {messageData.map((message) => {
          return (
            <div className="card mb-5 p-2" key={message.id}>
              <h6>
                Name: <span className="text-primary">{message.name}</span>
              </h6>
              <h6>
                Email: <span className="text-primary">{message.email}</span>
              </h6>
              <h6>Message:</h6>
              <hr />
              <div className="p-2">
                <span>{message.message}</span>
              </div>
              <hr />
              <small className="mt-3 text-secondary">
                Date: <span>{convertToIST(message.date)}</span>
              </small>
              <div className="d-flex justify-content-left mt-2">
                <button
                  className="btn btn-primary mx-2"
                  onClick={() => {
                    window.open(`mailto:${message.email}`);
                  }}
                >
                  Reply
                </button>
                <button
                  className="btn btn-danger mx-2"
                  onClick={() => handleDeleteMessage(message._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Messages;
