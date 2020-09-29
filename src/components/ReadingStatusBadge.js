import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import axios from "axios";
import Badge from "react-bootstrap/Badge";

const ReadingStatusBadge = ({ manga }) => {
  let userInfo = localStorage.getItem("user");
  const token = JSON.parse(userInfo).token;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const handleStatus = async (x) => {
    axios
      .patch(`https://eli-manga-api.herokuapp.com/api/manga/${manga._id}`, {
        readingStatus: x,
      })
      .then((res) => {
        console.log(res);
        window.location.reload(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <Badge
      variant="warning"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      &#x25bc;
    </Badge>
  ));
  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
        {manga.readingStatus}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => handleStatus("Reading")} active>
          Reading
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleStatus("Plan to read")}>
          Plan to Read
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleStatus("Dropped")}>
          Dropped
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleStatus("Finished Reading")}>
          Finished Reading
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleStatus("On Hold")}>
          onHold
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ReadingStatusBadge;
