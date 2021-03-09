import React, { useState, useEffect } from "react";
import { createUseStyles } from "react-jss";
import InfiniteScroll from "react-infinite-scroll-component";
import Image from "./Image";
import Spinner from "react-spinkit";
import Axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;

const LandingPage = () => {
  const classes = useStyles();
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);

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
              images={images}
              url={image.urls.small}
              user={image.user}
              key={idx}
              id={image.id}
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
    marginBottom: "100px",
  },
  imagePreviewModal: {
    overlay: {
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    content: {
      border: "none",
      overflow: "hidden",
      background: "transparent",
      paddingRight: 120,
      paddingLeft: 120,
    },
  },
  infoModal: {
    overlay: {
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    content: {
      border: "none",
      overflow: "hidden",
      background: "transparent",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  imagePreviewModalStyles: {
    overlay: {
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    content: {
      border: "none",
      overflow: "hidden",
      background: "transparent",
      paddingRight: 120,
      paddingLeft: 120,
    },
  },
});
export default LandingPage;
