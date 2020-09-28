import React from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";

const DeleteButton = ({ manga }) => {
  let userInfo = localStorage.getItem("user");
  const token = JSON.parse(userInfo).token;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const handleDelete = () => {
    alert(`Delete button pressed for ${manga.title}, the id is ${manga._id}`);

    axios
      .delete(`https://eli-manga-api.herokuapp.com/api/manga/${manga._id}`)
      .then((res) => {
        console.log(res);
        window.location.reload(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Button variant="danger" onClick={handleDelete}>
      Delete
    </Button>
  );
};

export default DeleteButton;
