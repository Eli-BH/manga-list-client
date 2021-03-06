import React from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";

const DeleteButton = ({ manga }) => {
  let userInfo = localStorage.getItem("user");
  const token = JSON.parse(userInfo).token;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const handleDelete = () => {
    axios
      .delete(`https://eli-manga-api.herokuapp.com/api/manga/${manga._id}`)
      .then((res) => {
        window.location.reload(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Button
      variant="danger"
      onClick={handleDelete}
      size="sm"
      style={{ padding: 1 }}
      className="ml-2 "
    >
      Delete
    </Button>
  );
};

export default DeleteButton;
