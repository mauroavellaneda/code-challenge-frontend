import React, { useState } from "react";
import { createUseStyles } from "react-jss";
import { Modal } from "react-bootstrap";
import Avatar from "@material-ui/core/Avatar";
import { Button } from "@material-ui/core";

const API_KEY = process.env.REACT_APP_API_KEY;

const Image = ({ url, user, id }) => {
  const [currentImageUrl, setCurrentImageUrl] = useState("");
  const [show, setShow] = useState(false);
  const classes = useStyles();

  const handleClose = () => setShow(false);

  const showModal = (id) => {
    fetch(`https://api.unsplash.com/photos/${id}?client_id=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        setCurrentImageUrl(data.urls.regular);
        setShow(true);
      });
  };

  return (
    <div data-cy="landing" className={classes.ImageContainer}>
      <img
        width="100%"
        data-cy="image"
        onClick={() => showModal(id)}
        className={classes.image}
        src={url}
        alt=""
      />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{user.name}</Modal.Title>
          <Modal.Title>
            <Avatar
              style={{ marginLeft: "10px" }}
              alt=""
              src={user.profile_image.small}
            />
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className={classes.arrowR}>
            <Button>Next</Button>
          </div>
          <div className={classes.arrowL}>
            <Button>Next</Button>
          </div>
          <img width="100%" src={currentImageUrl} alt="" />
        </Modal.Body>

        <Modal.Footer>
          <span>
            <i class="bi bi-geo-alt-fill">{user.location}</i>
          </span>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
const useStyles = createUseStyles({
  ImageContainer: {
    position: "relative",
    padding: "2rem 1rem",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "50% 50%",
    cursor: "pointer",
    transition: "0.5s ease-in-out",
    "&:hover": {
      opacity: 0.5,
    },
  },
  arrowR: {
    float: "right",
  },
});

export default Image;
