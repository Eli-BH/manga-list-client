import React from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";

const ChapterPatch = ({ manga }) => {
  let userInfo = localStorage.getItem("user");
  const token = JSON.parse(userInfo).token;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const handleStatus = (event) => {
    event.preventDefault();
    axios
      .patch(`https://eli-manga-api.herokuapp.com/api/manga/${manga._id}`, {
        complete: !manga.complete,
      })
      .then((res) => {
        window.location.reload(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <Button
        variant="info"
        onClick={handleStatus}
        size="sm"
        style={{ padding: 4, fontSize: 10 }}
      >
        {manga.complete ? "Set Incomplete" : "Set Complete"}
      </Button>
    </>
  );
};

export default ChapterPatch;
