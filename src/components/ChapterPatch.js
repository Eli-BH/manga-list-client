import React, { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const ChapterPatch = ({ manga }) => {
  const [chapter, setChapter] = useState(0);

  let userInfo = localStorage.getItem("user");
  const token = JSON.parse(userInfo).token;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .patch(`https://eli-manga-api.herokuapp.com/api/manga/${manga._id}`, {
        readChapterAmount: chapter,
      })
      .then((res) => {
        console.log(res);
        window.location.reload(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleStatus = (event) => {
    event.preventDefault();
    axios
      .patch(`https://eli-manga-api.herokuapp.com/api/manga/${manga._id}`, {
        complete: !manga.complete,
      })
      .then((res) => {
        console.log(res);
        window.location.reload(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Control
          type="number"
          value={chapter}
          onChange={(e) => setChapter(e.target.value)}
        />
      </Form>
      <Button variant="info" onClick={handleStatus}>
        {manga.complete ? "Incomplete" : "Complete"}
      </Button>
    </>
  );
};

export default ChapterPatch;
