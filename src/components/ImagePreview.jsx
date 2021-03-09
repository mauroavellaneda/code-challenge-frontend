// import React, { useEffect, useState } from "react";
// import Spinner from "react-spinkit";
// import { createUseStyles } from "react-jss";

// const ImagePreview = (props) => {
//   const classes = useStyles();
//   const {
//     selectedImage,
//     toggleInfoPopup,
//     togglePreviewPopup,
//     isPrevDisabled,
//     onClickPrev,
//     onClickNext,
//   } = props;

//   const [isImageLoaded, setImageLoaded] = useState(false);

//   useEffect(() => {
//     const handleKeyPress = (e) => {
//       if (e.keyCode === 39) {
//         onClickNext();
//       } else if (e.keyCode === 37 && !isPrevDisabled) {
//         onClickPrev();
//       } else if (e.keyCode === 27) {
//         togglePreviewPopup();
//       }
//     };
//     document.addEventListener("keydown", handleKeyPress);
//     return () => {
//       document.removeEventListener("keydown", handleKeyPress);
//     };
//   });

//   return (
//     <>
//       <div className={classes.close} onClick={togglePreviewPopup}>
//         <div className={classes.closeContainer}>
//           <div className={classes.leftRight}></div>
//           <div className={classes.rightLeft}></div>
//         </div>
//       </div>

//       <div className={classes.previousButton}>
//         <div
//           className="arrow arrowLeft"
//           disabled={isPrevDisabled}
//           onClick={onClickPrev}
//         ></div>
//       </div>

//       <>
//         <div className={classes.imageContainer}>
//           <div className={classes.content}>
//             <img
//               className={classes.imageSrc}
//               src={selectedImage?.urls.regular}
//               onLoad={() => setImageLoaded(true)}
//               loading="lazy"
//               alt={"alt"}
//             />
//             {!isImageLoaded ? (
//               <div className={classes.loadingIcon}>
//                 <Spinner
//                   name="ball-spin-fade-loader"
//                   color="black"
//                   fadeIn="none"
//                 />
//               </div>
//             ) : (
//               <div className={classes.header}>
//                 <div className={classes.user}>
//                   <div className={classes.profilePic}>
//                     <img src={selectedImage?.user.profile_image.small} alt="" />
//                   </div>
//                   <div className={classes.userName}>
//                     <span className={classes.name}>
//                       {selectedImage?.user.name}
//                     </span>
//                     {selectedImage?.user.instagram_username && (
//                       <div>{`@${selectedImage?.user.instagram_username}`}</div>
//                     )}
//                   </div>
//                 </div>
//                 <div className={classes.infoButton} onClick={toggleInfoPopup}>
//                   <button className={classes.infoButton}>info</button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </>
//       <div className={classes.nextButton}>
//         <div className="arrow arrowRight" onClick={onClickNext}></div>
//       </div>
//     </>
//   );
// };

// const useStyles = createUseStyles({
//   close: {
//     position: "fixed",
//     top: "16px",
//     right: "32px",
//     marginTop: "8px",
//     marginLeft: "8px",
//     width: "50px",
//     zIndex: 3,
//     cursor: "pointer",
//   },
//   previousButton: {
//     cursor: "pointer",
//     left: "30px",
//     position: "fixed",
//     top: 0,
//     bottom: 0,
//     display: "flex",
//     alignItems: "center",
//   },
//   imageContainer: {
//     display: "flex",
//     justifyContent: "center",
//   },
//   content: {
//     height: "600px",
//     position: "relative",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     "&hover": {
//       display: "flex",
//       backgroundColor: "rgba(0, 0, 0, 0.2)",
//     },
//   },
//   imageSrc: {
//     height: "100%",
//   },
//   header: {
//     display: "none",
//     position: "absolute",
//     top: 0,
//     width: "100%",
//     height: "100%",
//     alignItems: "flex-start",
//     padding: "8px 0px",
//     justifyContent: "space-between",
//     transition: "all 0.3s ease",
//     "&hover": {
//       display: "flex",
//       backgroundColor: "rgba(0, 0, 0, 0.2)",
//     },
//   },
//   profilePic: {
//     width: "32px",
//     height: "32px",
//     borderRadius: "50%",
//     overflow: "hidden",
//   },
//   loadingIcon: {
//     position: "absolute",
//     top: "50%",
//   },
//   name: {
//     fontSize: "14px",
//     fontWeight: "bold",
//   },
//   userName: {
//     marginLeft: "8px",
//     fontSize: "12px",
//     fontFamily: "sans-serif",
//     color: " #ffffff",
//   },
//   user: {
//     display: "flex",
//     marginLeft: "8px",
//   },
//   infoButton: {
//     display: "inline-block",
//     border: "none",
//     outline: "none",
//     padding: "0px 8px",
//     borderRadius: "50%",
//     textDecoration: "none",
//     color: "#222",
//     fontFamily: "sans-serif",
//     fontSize: "1rem",
//     cursor: "pointer",
//   },
//   leftRight: {
//     height: "4px",
//     width: "50px",
//     position: "absolute",
//     marginTop: "24px",
//     backgroundColor: " #ffffff",
//     borderRadius: "2px",
//     transform: "rotate(45deg)",
//     transition: "all 0.3s ease-in",
//   },
//   rightLeft: {
//     height: "4px",
//     width: "50px",
//     position: "absolute",
//     marginTop: "24px",
//     backgroundColor: " #ffffff",
//     borderRadius: "2px",
//     transform: "rotate(-45deg)",
//     transition: "all 0.3s ease-in",
//   },
//   nextButton: {
//     cursor: "pointer",
//     right: "30px",
//     position: "fixed",
//     top: 0,
//     bottom: 0,
//     display: "flex",
//     alignItems: "center",
//   },
// });

// export default ImagePreview;
