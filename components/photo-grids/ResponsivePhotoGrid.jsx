import React, { useState, useEffect } from "react";
import { MDBContainer, MDBCardImage, MDBTypography } from "mdb-react-ui-kit";
import placeholderImg from "../../data/placeholder-image.json";
import pathFormat from "@/utils/pathFormat";

function ResponsivePhotoGrid({ photos, altPrefix, titlePrefix }) {
  // 1st image is the grid
  const [screenWidth, setScreenWidth] = useState(null);
  const [screenHeight, setScreenHeight] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);
    };
    if (typeof window !== "undefined") {
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  });

  return (
    <MDBContainer className="m-0 p-0">
      <MDBCardImage
        src={
          !photos[0]
            ? pathFormat(placeholderImg.imageSrc)
            : screenWidth < 1715 || screenWidth > 2100
            ? pathFormat(photos[1])
            : pathFormat(photos[0])
        }
        alt={`${altPrefix} Profile Image`}
        title={`${titlePrefix} Profile Image`}
        position="left"
        style={
          screenWidth < 1715 || screenWidth > 2100
            ? { height: "auto", width: "100%", borderBottomLeftRadius: "0px" }
            : { height: "auto", width: "100%" }
        }
      />

      {/* 2nd Row */}
      {(screenWidth < 1715 || (screenWidth > 2100 && screenHeight > 1920)) && (
        <>
          <MDBCardImage
            src={
              photos[1]
                ? pathFormat(photos[2])
                : pathFormat(placeholderImg.imageSrc)
            }
            alt={`${altPrefix} 2`}
            title={`${titlePrefix} 2`}
            position="left"
            style={
              screenWidth > 2200
                ? {
                    height: "auto",
                    width: "25%",
                    borderTopLeftRadius: "0px",
                    borderBottomLeftRadius: "0px",
                  }
                : screenWidth < 1200
                ? {
                    height: "auto",
                    width: "50%",
                    borderTopLeftRadius: "0px",
                    borderBottomLeftRadius: "0px",
                  }
                : { height: "auto", width: "50%", borderTopLeftRadius: "0px" }
            }
          />
          <MDBCardImage
            src={
              photos[2]
                ? pathFormat(photos[3])
                : pathFormat(placeholderImg.imageSrc)
            }
            alt={`${altPrefix} 3`}
            title={`${titlePrefix} 3`}
            position="left"
            style={
              screenWidth > 2200
                ? {
                    height: "auto",
                    width: "25%",
                    borderTopLeftRadius: "0px",
                    borderBottomLeftRadius: "0px",
                  }
                : {
                    height: "auto",
                    width: "50%",
                    borderTopLeftRadius: "0px",
                    borderBottomLeftRadius: "0px",
                  }
            }
          />
        </>
      )}

      {/* 3rd Row */}
      {(screenWidth < 1200 || screenWidth > 2200) && (
        <>
          <MDBCardImage
            src={
              photos[3]
                ? pathFormat(photos[4])
                : pathFormat(placeholderImg.imageSrc)
            }
            alt={`${altPrefix} 4`}
            title={`${titlePrefix} 4`}
            position="left"
            style={
              screenHeight > 1920 || screenWidth < 1200
                ? {
                    height: "auto",
                    width: "25%",
                    borderTopLeftRadius: "0px",
                    borderBottomLeftRadius: "0px",
                  }
                : { height: "auto", width: "25%", borderTopLeftRadius: "0px" }
            }
          />
          <MDBCardImage
            src={
              photos[4]
                ? pathFormat(photos[5])
                : pathFormat(placeholderImg.imageSrc)
            }
            alt={`${altPrefix} 5`}
            title={`${titlePrefix} 5`}
            position="left"
            style={{
              height: "auto",
              width: "25%",
              borderTopLeftRadius: "0px",
              borderBottomLeftRadius: "0px",
            }}
          />
          <MDBCardImage
            src={
              photos[5]
                ? pathFormat(photos[6])
                : pathFormat(placeholderImg.imageSrc)
            }
            alt={`${altPrefix} 6`}
            title={`${titlePrefix} 6`}
            position="left"
            style={
              screenWidth > 2200
                ? {
                    height: "auto",
                    width: "25%",
                    borderTopLeftRadius: "0px",
                  }
                : {
                    height: "auto",
                    width: "25%",
                    borderTopLeftRadius: "0px",
                    borderBottomLeftRadius: "0px",
                  }
            }
          />
          <MDBCardImage
            src={
              photos[6]
                ? pathFormat(photos[7])
                : pathFormat(placeholderImg.imageSrc)
            }
            alt={`${altPrefix} 7`}
            title={`${titlePrefix} 7`}
            position="left"
            style={{
              height: "auto",
              width: "25%",
              borderTopLeftRadius: "0px",
              borderBottomLeftRadius: "0px",
            }}
          />
        </>
      )}
      {/* 4th Row Fill */}
      {screenWidth > 2200 && screenHeight > 1920 && (
        <>
          <MDBCardImage
            src={
              photos[7]
                ? pathFormat(photos[8])
                : pathFormat(placeholderImg.imageSrc)
            }
            alt={`${altPrefix} 8`}
            title={`${titlePrefix} 8`}
            position="left"
            style={{
              height: "auto",
              width: "25%",
              borderTopLeftRadius: "0px",
              borderBottomLeftRadius: "0px",
            }}
          />
          <MDBCardImage
            src={
              photos[8]
                ? pathFormat(photos[9])
                : pathFormat(placeholderImg.imageSrc)
            }
            alt={`${altPrefix} 9`}
            title={`${titlePrefix} 9`}
            position="left"
            style={{
              height: "auto",
              width: "25%",
              borderTopLeftRadius: "0px",
              borderBottomLeftRadius: "0px",
            }}
          />
        </>
      )}
        <MDBTypography
          tag="div"
          // className="display-5 py-3 my-2 text-center"
          className="position-absolute bottom-0 start-50 translate-middle text-with-outline"
          // Create text-outline so text is visible on any background
          style={{ backgroundColor: "rgba(0,0,0,0.04)", borderRadius: "0.5rem", fontSize: "1.5rem"}}
        >
          {titlePrefix}
        </MDBTypography>
    </MDBContainer>
  );
}

export default ResponsivePhotoGrid;
