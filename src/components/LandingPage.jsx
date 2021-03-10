import React, { useState, useEffect, useCallback } from "react";
import { createUseStyles } from "react-jss";
import InfiniteScroll from "react-infinite-scroll-component";
import Button from "@material-ui/core/Button";
import { Dialog, DialogContent, DialogActions } from "@material-ui/core";
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
  const [showInfo, setShowInfo] = useState(false);

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

  const onSelectImage = (id, user) => {
    const selectedImageIndex = images?.findIndex((image) => image.id === id);
    setSelectedImage(images[selectedImageIndex]);
    setShowPreview(true);
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

      <Dialog
        data-cy="modal"
        open={showPreview}
        PaperProps={{
          style: {
            minHeight: "75vh",
            minWidth: "75vw",
          },
        }}
      >
        <DialogContent>
          <ImageSlider
            selectedImage={selectedImage}
            togglePreviewPopup={() => setShowPreview(false)}
            toggleInfoPopup={() => setShowInfo(true)}
            isPrevDisabled={isPrevDisabled}
            onClickPrev={onClickPrev}
            onClickNext={onClickNext}
          />
        </DialogContent>
        <DialogActions>
          <Button
            size="medium"
            variant="outlined"
            color="primary"
            onClick={() => setShowPreview(false)}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
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
});
export default LandingPage;
