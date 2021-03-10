import React, { useState, useEffect, useCallback } from "react";
import { createUseStyles } from "react-jss";
import InfiniteScroll from "react-infinite-scroll-component";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Image from "./Image";
import Spinner from "react-spinkit";
import Axios from "axios";
import ImageSlider from "./ImageSlider";

const API_KEY = process.env.REACT_APP_API_KEY;

const LandingPage = () => {
  const classes = useStyles();
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState();
  const [showPreview, setShowPreview] = useState(false);
  const [isPrevDisabled, setprevDisabled] = useState(false);
  const [page, setPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    fetchRandomImages();
  }, []);

  const fetchRandomImages = () => {
    Axios.get(
      `https://api.unsplash.com/photos/?client_id=${API_KEY}&page=${page}`
    )
      .then((res) => {
        setImages(res.data);
      })
      .catch(() => {
        alert("Sadly, we only have 50 calls per hour");
      });
  };

  const onSelectImage = (id, user) => {debugger
    const selectedImageIndex = images?.findIndex((image) => image.id === id);
    setSelectedImage(images[selectedImageIndex]);
    setShowPreview(true);
    setUserName(user);
  };

  useEffect(() => {
    let totalImages = images.length - 1;
    if (selectedImage) {
      const selectedImageIndex = images?.findIndex(
        (image) => image.id === selectedImage.id
      );
      if (selectedImageIndex === 0) {
        setprevDisabled(true);
      } else {
        setprevDisabled(false);
      }
      if (totalImages - selectedImageIndex <= 3) {
        fetchRandomImages();
      }
    }
  }, [selectedImage]);

  const onClickNext = useCallback(() => {
    const selectedImageIndex = images?.findIndex(
      (image) => image.id === selectedImage?.id
    );
    setSelectedImage(images[selectedImageIndex + 1]);
  }, [images, selectedImage]);

  const onClickPrev = useCallback(() => {
    const selectedImageIndex = images?.findIndex(
      (image) => image.id === selectedImage?.id
    );
    setSelectedImage(images[selectedImageIndex - 1]);
  }, [images, selectedImage]);

  return (
    <>
      <InfiniteScroll
        dataLength={images}
        next={() => {
          fetchRandomImages();
          setPage(page + 1);
        }}
        hasMore={true}
        loader={
          <Spinner
            className={classes.spinner}
            name="ball-spin-fade-loader"
            color="black"
            fadeIn="none"
          />
        }
      >
        <div className={classes.imageWrapper}>
          {images.map((image, idx) => (
            <Image
              url={image.urls.small}
              user={image.user}
              key={idx}
              id={image.id}
              onClickImage={onSelectImage}
            />
          ))}
        </div>
      </InfiniteScroll>

      <Modal modalClassName={classes.modalContainer} isOpen={showPreview}>
        <ModalHeader>
          <h4>{userName.username}</h4>
          <h5>{userName.location}</h5>


          <Button onClick={onClickNext}>Next</Button>
        </ModalHeader>
        <ModalBody className={classes.modalBody}>
          <ImageSlider
            selectedImage={selectedImage}
            togglePreviewPopup={() => setShowPreview(false)}
            isPrevDisabled={isPrevDisabled}
            onClickPrev={onClickPrev}
            onClickNext={onClickNext}
          />
        </ModalBody>

        <ModalFooter>
          <Button color="secondary" onClick={() => setShowPreview(false)}>
            Close
          </Button>
          <h4>@{userName.instagram_username}</h4>
        </ModalFooter>
      </Modal>
    </>
  );
};
const useStyles = createUseStyles({
  imageWrapper: {
    position: "relative",
    maxWidth: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gridTemplateRows: "minmax(300px, auto)",
    margin: "60px 40px",
    gridAutoFlow: "dense",
    gridGap: "10px",
  },
  spinner: {
    left: "50%",
    marginBottom: "100px",
  },
  modalContainer: {
    boxShadow: [0, 0, "0.625rem", "rgba(0, 0, 0, 0.2)"],
    width: "100rem",
    top: "15rem",
    height: "100rem",
  },
});
export default LandingPage;
