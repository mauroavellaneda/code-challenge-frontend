import React, { useState } from "react";
import { createUseStyles } from "react-jss";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const Image = (props) => {
  const classes = useStyles();
  const { url, user, id, images } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [current, setCurrent] = useState(0);

  const lenght = images.lenght;

  const nextPic = () => {
    setCurrent(current === lenght - 1 ? 0 : current + 1);
  };

  const prevPic = () => {
    setCurrent(current === 0 ? lenght - 1 : current - 1);
  };

  if (!Array.isArray(images) || images.lenght <= 0) {
    return null;
  }

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className={classes.ImageContainer}>
      <img
        width="100%"
        data-cy="image"
        onClick={openModal}
        className={classes.image}
        src={url}
        alt=""
      />

      <Modal isOpen={isOpen}>
        <ModalHeader>
          <Button onClick={prevPic} color="primary">
            Prev
          </Button>
          <Button onClick={nextPic} color="primary" className={classes.next}>
            Next
          </Button>
        </ModalHeader>
        <ModalBody>
          {images.map((image, index) => {
            return (
              <div
                className={index === current ? "slide active" : "slide"}
                key={index}
              >
                {index === current && (
                  <img
                    src={image.urls.small}
                    alt=""
                    className={classes.slideImg}
                  />
                )}
              </div>
            );
          })}
        </ModalBody>

        <ModalFooter>
          <Button color="secondary" onClick={closeModal}>
            Close
          </Button>
        </ModalFooter>
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
  slideImg: {
    width: "400px",
    height: "400px",
    borderRadius: "10px",
  },
  next: {
    position: "absolute",
    right: "10px",
  },
});

export default Image;
