import React, { useState, useEffect } from "react";
import {
  MDBContainer,
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";
import StylistCardText from "@/components/cards/StylistCardText";
import CardImageCarousel from "@/components/cards/CardImageCarousel";
import placeholderImg from "@/data/placeholder-image.json";
import pathFormat from "@/utils/pathFormat";
import axios from "axios";

function StylistCard({
  data,
  containerClass = "col-md-6 col-lg-4 col-sm-12 mb-4",
  detailsStartExpanded = false
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


  return (
    data?.title && (
      <MDBContainer className={containerClass}>
        <MDBCard className="h-100 d-flex d-column">
          <CardImageCarousel
            photos={photos}
            />
          <MDBCardBody>
            <StylistCardText
              stylistData={data}
              textExpandedState={textExpanded}
            />
          </MDBCardBody>
          <MDBContainer className="my-3">
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
          </MDBContainer>
        </MDBCard>
      </MDBContainer>
    )
  );
}

export default StylistCard;
