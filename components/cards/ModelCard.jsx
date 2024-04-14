import React from "react";
import {
  MDBContainer,
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBBtn,
} from "mdb-react-ui-kit";
import ModelCardText from "@/components/cards/ModelCardText";
import placeholderImg from "@/data/placeholder-image.json";
import IconGenerator from "@/utils/getIcon";
import pathFormat from "@/utils/pathFormat";

const getIcon = new IconGenerator();

function ModelCard({ modelData }) {
  return (
    modelData?.title && (
      <MDBContainer className="col-md-6 col-lg-4 col-sm-12 mb-4">
        <MDBCard className="h-100 d-flex d-column">
          <a href={`/browse/models/${modelData.titleSystemName}`}
          >
          <MDBCardImage
            src={
              modelData.imageSrc
                ?  pathFormat(modelData.imageSrc)
                : pathFormat(placeholderImg.imageSrc)
            }
            alt={modelData.title || placeholderImg.alt}
            title={modelData.title || placeholderImg.title}
            position="top"
          />
          </a>
          <MDBCardBody>
            <ModelCardText modelData={modelData} />
          </MDBCardBody>
          <MDBContainer className="my-3">
            <a href={`/browse/models/${modelData.titleSystemName}`}>
            <MDBBtn color="primary" className="m-1">
              Details
            </MDBBtn>
            </a>
            <MDBBtn color="success" className="m-1">
              Use with my Wardrobe
            </MDBBtn>
          </MDBContainer>
        </MDBCard>
      </MDBContainer>
    )
  );
}

export default ModelCard;
