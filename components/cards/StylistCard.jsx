import React, { useState, useEffect, useRef } from "react";
import {
  MDBContainer,
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBBtn,
  MDBBtnGroup,
  MDBIcon,
} from "mdb-react-ui-kit";
import StylistCardText from "@/components/cards/StylistCardText";
import placeholderImg from "@/data/placeholder-image.json";
import IconGenerator from "@/utils/getIcon";
import pathFormat from "@/utils/pathFormat";
import axios from "axios";

const getIcon = new IconGenerator();

function StylistCard({
  data,
  containerClass = "col-md-6 col-lg-4 col-sm-12 mb-4",
  detailsStartExpanded,
}) {
  const [textExpanded, setTextExpanded] = useState(detailsStartExpanded);
  const toggleText = () => setTextExpanded(!textExpanded);

  const [photos, setPhotos] = useState([data.imageSrc]);

  const photosFolder = data.titleSystemName;
  useEffect(() => {
    axios
      .get("/api/getImages", {
        params: {
          folderName: photosFolder,
          exclude: "test-image",
        },
      })
      .then((response) => {
        setPhotos(response.data.imageFiles);
      })
      .catch((error) => {
        console.log("Error fetching images: ", error);
      });
  }, [photosFolder]);

  const [curPhotoIndex, setCurPhotoIndex] = useState(0);
  const nextPhoto = () => {
    if (curPhotoIndex < photos.length - 1) {
      setCurPhotoIndex(curPhotoIndex + 1);
    } else {
      setCurPhotoIndex(0);
    }
  }
  const prevPhoto = () => {
    if (curPhotoIndex > 0) {
      setCurPhotoIndex(curPhotoIndex - 1);
    } else {
      setCurPhotoIndex(photos.length - 1);
    }
  }

  return (
    data?.title && (
      <MDBContainer className={containerClass}>
        <MDBCard className="h-100 d-flex d-column">
          {photos?.length > 1 && (
            <div style={{ position: "relative" }}>
              <MDBCardImage
                src={
                  photos[curPhotoIndex]
                    ? pathFormat(photos[curPhotoIndex])
                    : pathFormat(placeholderImg.imageSrc)
                }
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
            <a href={`/browse/stylists/${data.titleSystemName}`}>
              <MDBBtn color="success" className="mt-1 mx-1">
                Use
              </MDBBtn>
            </a>
            {/* </MDBBtnGroup> */}
          </MDBContainer>
        </MDBCard>
      </MDBContainer>
    )
  );
}

export default StylistCard;
