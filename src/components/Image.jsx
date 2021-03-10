import React, { useState } from "react";
import { createUseStyles } from "react-jss";

const Image = (props) => {
  const classes = useStyles();
  const { url, user, id, onClickImage } = props;

  return (
    <div
    data-cy="landing"
      className={classes.ImageContainer}
      onClick={() => onClickImage(id, user)}
    >
      <img
      data-cy="image"
        user={user}
        width="100%"
        className={classes.image}
        src={url}
        alt=""
      />
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
});

export default Image;
