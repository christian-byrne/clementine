import React, { useState } from "react";
import {
  MDBContainer,
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBBtn,
  MDBBtnGroup,
} from "mdb-react-ui-kit";
import StylistCardText from "@/components/cards/StylistCardText";
import placeholderImg from "@/data/placeholder-image.json";
import IconGenerator from "@/utils/getIcon";
import pathFormat from "@/utils/pathFormat";

const getIcon = new IconGenerator();

function StylistCard({
  data,
  containerClass = "col-md-6 col-lg-4 col-sm-12 mb-4",
  detailsStartExpanded,
}) {
  const [textExpanded, setTextExpanded] = useState(detailsStartExpanded);
  const toggleText = () => setTextExpanded(!textExpanded);
  return (
    data?.title && (
      <MDBContainer className={containerClass}>
        <MDBCard className="h-100 d-flex d-column">
          <a href={`/browse/models/${data.titleSystemName}`}>
            <MDBCardImage
              src={
                data.imageSrc
                  ? pathFormat(data.imageSrc)
                  : pathFormat(placeholderImg.imageSrc)
              }
              alt={data.title || placeholderImg.alt}
              title={data.title || placeholderImg.title}
              position="top"
            />
          </a>
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
              <MDBBtn
                color="success"
                className="mt-1 mx-1"
              >
                Use
              </MDBBtn>
            {/* </MDBBtnGroup> */}
          </MDBContainer>
        </MDBCard>
      </MDBContainer>
    )
  );
}

export default StylistCard;
