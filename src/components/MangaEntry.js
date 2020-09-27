import React, { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const MangaEntry = () => {
  const [manga, setManga] = useState("");

  const handleSubmit = () => {
    alert("manga entered");
  };

  return (
    <Form onSubmit={() => handleSubmit()}>
      <Form.Control
        type="text"
        value={manga}
        placeholder="enter manga name"
        onChange={(e) => setManga(e.target.value)}
      />
      <Button type="submit">Enter</Button>
    </Form>
  );
};

export default MangaEntry;
