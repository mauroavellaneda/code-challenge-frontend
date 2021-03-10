import React, { useState, useEffect } from "react";
import { createUseStyles } from "react-jss";

const ImageSlider = (props) => {
  const classes = useStyles();

  const {
    selectedImage,
    toggleInfoPopup,
    togglePreviewPopup,
    isPrevDisabled,
    onClickPrev,
    onClickNext,
  } = props;

  const [isImageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.keyCode === 39) {
        onClickNext();
      } else if (e.keyCode === 37 && !isPrevDisabled) {
        onClickPrev();
      } else if (e.keyCode === 27) {
        togglePreviewPopup();
      }
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  });

  return (
    <div>
      <div className={classes.ImageContainer}>
        <img
          className={classes.image}
          src={selectedImage?.urls.small}
          onLoad={() => setImageLoaded(true)}
        />
      </div>
    </div>
  );
};

const useStyles = createUseStyles({
  ImageContainer: {
    display: "flex",
    justifyContent: "center",
  },
  image: {
    height: "40rem",
    width: "40rem",
    "@media (min-width: 1024px)": {
      width: "20rem",
      height: "20rem",
    },
  },
});

export default ImageSlider;
