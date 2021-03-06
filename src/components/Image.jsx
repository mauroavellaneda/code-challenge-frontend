import React from "react";
import { createUseStyles } from "react-jss";

const Image = ({ url, user, username, userImageUrl, profileUrl }) => {
  const classes = useStyles();
  return (
    <div data-cy="landing" className={classes.ImageContainer}>
      <img data-cy="image" className={classes.image} src={url} alt={user} />
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
      transform: "scale(1.2)",
      transition: "0.5s",
    },
  },
});

export default Image;
