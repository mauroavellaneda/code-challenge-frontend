import React, { useState, useEffect } from "react";
import { createUseStyles } from "react-jss";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import Image from "./Image";
import Spinner from "react-spinkit";

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = `https://api.unsplash.com`;
const COUNT = 10;
const URL = `${BASE_URL}/photos/random/?client_id=${API_KEY}&count=${COUNT}`;

const LandingPage = () => {
  const classes = useStyles();
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchRandomImages();
  }, []);

  const fetchRandomImages = () => {
    axios
      .get(URL)
      .then((res) => {
        setImages([...images, ...res.data]);
      })
      .catch((error) => {
        alert("Sadly, we only have 50 calls per hour");
      });
  };
  if (!images) {
    return <Spinner name="ball-spin-fade-loader" color="black" fadeIn="none" />;
  }

  return (
    <>
      <InfiniteScroll
        dataLength={images.length}
        next={fetchRandomImages}
        hasMore={true}
        loader={
          <Spinner
            className={classes.spinner}
            name="ball-spin-fade-loader"
            color="black"
            fadeIn="none"
          />
        }
        style={{ overflow: "hidden" }}
      >
        <div className={classes.imageWrapper}>
          {images.map((image) => (
            <Image
              url={image.urls.full}
              user={image.user}
              key={image.id}
              username={image.user.username}
              userImageUrl={image.user.profile_image.medium}
              profileUrl={image.user.links.html}
              // onClickImage={onSelectImage}
            />
          ))}
        </div>
      </InfiniteScroll>
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
  },
});
export default LandingPage;
