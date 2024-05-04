import React, { useState } from "react";
import { MDBCardImage, MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import placeholderImg from "@/data/placeholder-image.json";
import pathFormat from "@/utils/pathFormat";

function CardImageCarousel({ photos, starterIndex: startIndex = 0 }) {
  console.log(photos)
  const [curPhotoIndex, setCurPhotoIndex] = useState(startIndex);
  const nextPhoto = () => {
    if (curPhotoIndex < photos.length - 1) {
      setCurPhotoIndex(curPhotoIndex + 1);
    } else {
      setCurPhotoIndex(0);
    }
  };
  const prevPhoto = () => {
    if (curPhotoIndex > 0) {
      setCurPhotoIndex(curPhotoIndex - 1);
    } else {
      setCurPhotoIndex(photos.length - 1);
    }
  };

  return (
    photos?.length > 0 && (
      <div style={{ position: "relative" }}>
        <MDBCardImage
          src={
            photos[curPhotoIndex]
              ? pathFormat(photos[curPhotoIndex])
              : pathFormat(placeholderImg.imageSrc)
          }
          alt={photos[curPhotoIndex].title || placeholderImg.alt}
          title={photos[curPhotoIndex].title || placeholderImg.title}
          position="top"
        />
        <MDBBtn
          color="link"
          className="p-2 m-1"
          style={{
            position: "absolute",
            top: "50%",
            left: "0",
            transform: "translateY(-50%)",
          }}
          onMouseEnter={(e) => {
            e.target.children[0].style.color = "black";
          }} // Change color on hover
          onMouseLeave={(e) => {
            e.target.children[0].style.color = "rgba(255, 255, 255, 0.67)";
          }} // Revert color on hover out
          onClick={prevPhoto}
        >
          <MDBIcon
            icon={"fas fa-chevron-left"}
            style={{
              fontSize: "1.1rem",
              color: "rgba(248, 248, 248, 0.82)",
            }}
          />
        </MDBBtn>
        <MDBBtn
          color="link"
          className="p-2 m-1"
          style={{
            position: "absolute",
            top: "50%",
            right: "0",
            transform: "translateY(-50%)",
          }}
          onMouseEnter={(e) => {
            e.target.children[0].style.color = "black";
          }} // Change color on hover
          onMouseLeave={(e) => {
            e.target.children[0].style.color = "rgba(255, 255, 255, 0.67)";
          }} // Revert color on hover out
          onClick={nextPhoto}
        >
          <MDBIcon
            icon={"fas fa-chevron-right"}
            style={{
              fontSize: "1.1rem",
              color: "rgba(255, 255, 255, 0.82)",
            }}
          />
        </MDBBtn>
      </div>
    )
  );
}

export default CardImageCarousel;
