import React, { useState, useEffect } from "react";
import { createUseStyles } from "react-jss";
import Spinner from "react-spinkit";
import Avatar from "@material-ui/core/Avatar";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";

const ImageSlider = (props) => {
  const classes = useStyles();

  const {
    selectedImage,
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
    <>
      <div onClick={togglePreviewPopup}></div>

      <div className={classes.previousButton}>
        <div
          className={classes.arrowLeft}
          disabled={isPrevDisabled}
          onClick={onClickPrev}
        />
      </div>

      <div className={classes.ImageContainer}>
        <div className={classes.content}>
          <img
            alt=""
            className={classes.image}
            src={selectedImage?.urls.small}
            onLoad={() => setImageLoaded(true)}
          />
          {!isImageLoaded ? (
            <div>
              <Spinner />
            </div>
          ) : (
            <div className={classes.header}>
              <div className={classes.user}>
                <div className={classes.profilePicture}>
                  <Avatar
                    alt=""
                    src={selectedImage?.user.profile_image.small}
                  />
                </div>
                <div className={classes.userName}>
                  <span className={classes.fullName}>
                    {selectedImage?.user.name}
                  </span>
                  {selectedImage?.user.instagram_username && (
                    <div>{`@${selectedImage?.user.instagram_username}`}</div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        <div class={classes.location}>
          {selectedImage?.user.location && (
            <div>
              <LocationOnOutlinedIcon />
              {selectedImage?.user.location}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const useStyles = createUseStyles({
  ImageContainer: {
    display: "flex",
    justifyContent: "center",
  },
  content: {
    height: "37.5rem",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: "70%",
    width: "100",
    // "@media (min-width: 1024px)": {
    //   width: "80%",
    //   height: "80%",
    // },
  },
  header: {
    display: "flex",
    top: 0,
    position: "absolute",
  },
  user: {
    display: "flex",
  },
  profilePicture: {
    display: "flex",
  },
  fullName: {
    fontWeight: 500,
    fontSize: "1.5rem",
  },
  location: {
    bottom: 10,
    position: "absolute",
    "@media (max-width: 650px)": {
      left: 10,
    },
  },
});

export default ImageSlider;
