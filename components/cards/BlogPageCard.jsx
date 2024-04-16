import React, { useState, useEffect, useRef } from "react";
import {
  MDBContainer,
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";
import StylistCardText from "@/components/cards/StylistCardText";
import placeholderImg from "@/data/placeholder-image.json";
import IconGenerator from "@/utils/getIcon";

const getIcon = new IconGenerator();

function BlogPageCard({
  data,
  containerClass = "col-md-6 col-lg-4 col-sm-12 mb-4",
  detailsStartExpanded,
}) {
  const [textExpanded, setTextExpanded] = useState(detailsStartExpanded);
  const toggleText = () => setTextExpanded(!detailsStartExpanded);

  const photos = [];
  for (let i = 1; i <= data.photoCount; i++) {
    photos.push(`${data.imageDirPath}/${i}.png`);
  }

  const [curPhotoIndex, setCurPhotoIndex] = useState(0);
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
    data?.title && (
      <MDBContainer className={containerClass}>
        <MDBCard className="h-100 d-flex d-column">
          {photos?.length > 1 && (
            <div style={{ position: "relative" }}>
              <MDBCardImage
                src={photos[curPhotoIndex] || placeholderImg.src}
                alt={data.title || placeholderImg.alt}
                title={data.title || placeholderImg.title}
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
                  e.target.children[0].style.color =
                    "rgba(255, 255, 255, 0.67)";
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
                  e.target.children[0].style.color =
                    "rgba(255, 255, 255, 0.67)";
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
          )}
          <MDBCardBody>
            <StylistCardText
              stylistData={data}
              textExpandedState={textExpanded}
            />
          </MDBCardBody>
          <MDBContainer className="my-3">
            {/* <MDBBtnGroup aria-label="Stylist Card Buttons"> */}
            <MDBBtn
              color="primary"
              className="mt-1 mx-1"
              tag="a"
              onClick={toggleText}
            >
              Details
            </MDBBtn>
            <a href={data.path}>
              <MDBBtn color="success" className="mt-1 mx-1">
                Read
              </MDBBtn>
            </a>
            {/* </MDBBtnGroup> */}
          </MDBContainer>
        </MDBCard>
      </MDBContainer>
    )
  );
}

export default BlogPageCard;
