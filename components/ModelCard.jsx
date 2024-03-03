import React from "react";
import {
  MDBContainer,
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBBtn,
} from "mdb-react-ui-kit";
import ModelCardText from "./ModelCardText";
import placeholderImg from "../data/placeholder-image.json";
import IconGenerator from "../utils/getIcon";
import getGridPath from "@/utils/getModelGridPath";
import pathFormat from "@/utils/pathFormat";

const getIcon = new IconGenerator();

function ModelCard({ modelData }) {
  return (
    modelData?.title && (
      <MDBContainer className="col-md-6 col-lg-4 col-sm-12 mb-4">
        <MDBCard className="h-100 d-flex d-column">
          <MDBCardImage
            src={
              modelData.imageSrc
                ?  getGridPath(modelData.title)
                : pathFormat(placeholderImg.imageSrc)
            }
            alt={modelData.title || placeholderImg.alt}
            title={modelData.title || placeholderImg.title}
            position="top"
          />
          <MDBCardBody>
            <ModelCardText modelData={modelData} />
          </MDBCardBody>
          <MDBContainer className="my-3">
            <MDBBtn color="primary" className="m-1">
              Details
            </MDBBtn>
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
