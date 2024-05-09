import React, { useState, useEffect } from "react";
import { MDBContainer, MDBCard, MDBCardBody, MDBBtn } from "mdb-react-ui-kit";
import StylistCardText from "@/components/cards/StylistCardText";
import CardImageCarousel from "@/components/cards/CardImageCarousel";
import getStylistImagePaths from "@/utils/getImages";

function StylistCard({
  data,
  containerClass = "col-md-6 col-lg-4 col-sm-12 mb-4",
  detailsStartExpanded = false,
}) {
  const [textExpanded, setTextExpanded] = useState(detailsStartExpanded);
  const toggleText = () => setTextExpanded(!textExpanded);

  const [photos, setPhotos] = useState([data.imagesrc]);

  const photosFolder = data.titlesystemname;

  useEffect(() => {
    setPhotos(getStylistImagePaths(photosFolder));
  }, [photosFolder]);

  return (
    data?.title && (
      <MDBContainer className={containerClass}>
        <MDBCard className="h-100 d-flex d-column">
          <CardImageCarousel photos={photos} />
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
            <a href={`/browse/stylists/${data.titlesystemname}`}>
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
