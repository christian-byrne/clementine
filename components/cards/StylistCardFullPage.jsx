import React, { useState, useEffect } from "react";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";
import ModelCardText from "@/components/cards/StylistCardText";
import ResponsivePhotoGrid from "@/components/photo-grids/ResponsivePhotoGrid";
import axios from "axios";

function StylistCardFullPage({ stylistData }) {
  const [detailsExpanded, setDetailsExpanded] = useState(false);
  const [screenWidth, setScreenWidth] = useState(null);
  const photosFolder = stylistData.titleSystemName;
  const [photos, setPhotos] = useState([]);

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

  // Use conditional check to ensure that only accessing window object in the browser
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    if (typeof window !== "undefined") {
      setScreenWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return (
    <MDBContainer
      className={`${
        detailsExpanded
          ? "col-md-12 col-lg-12 col-xl-12 col-xxl-12"
          : "col-md-11 col-lg-10 col-xl-9 col-xxl-8"
      } col-sm-12 d-flex justify-content-center`}
    >
      <MDBCard className="d-flex flex-row">
        {/* Media Left Panel */}
        {(screenWidth > 768 || !detailsExpanded) && (
          <ResponsivePhotoGrid
            photos={photos}
            altPrefix={stylistData.title}
            titlePrefix={stylistData.title}
          />
        )}
        {detailsExpanded ? (
          <MDBCardBody>
            <ModelCardText modelData={stylistData} />
            <MDBContainer className="my-3">
              <MDBBtn color="primary" className="m-1">
                Details
              </MDBBtn>
              <MDBBtn color="success" className="m-1">
                Use with my Wardrobe
              </MDBBtn>
            </MDBContainer>
          </MDBCardBody>
        ) : null}

        <MDBContainer
          className={`d-flex flex-row bg-image hover-overlay col-1 ${
            detailsExpanded ? "align-items-start mt-4" : "align-items-center"
          }`}
          style={{ cursor: "pointer" }}
          onClick={() => setDetailsExpanded(!detailsExpanded)}
        >
          <MDBContainer
            className={`d-flex ${
              detailsExpanded ? "justify-content-end" : "justify-content-center"
            } align-items-center me-2`}
          >
            <MDBBtn color="link" className="p-0 m-0">
              <MDBIcon
                icon={!detailsExpanded ? "fas fa-chevron-left" : "fas fa-x"}
                style={
                  detailsExpanded
                    ? { fontSize: "1.2rem" }
                    : { fontSize: "2.25rem" }
                }
              />
            </MDBBtn>
          </MDBContainer>
          <div
            className="mask"
            style={
              detailsExpanded
                ? {}
                : {
                    background:
                      "linear-gradient(45deg, rgb(59,113,202,.05), rgba(19,164,77,.05) 100%)",
                  }
            }
          ></div>
        </MDBContainer>
      </MDBCard>
    </MDBContainer>
  );
}

export default StylistCardFullPage;
