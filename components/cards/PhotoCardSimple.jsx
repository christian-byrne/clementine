import React from "react";
import {
  MDBContainer,
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBBtn,
} from "mdb-react-ui-kit";
import placeholderImg from "@/data/placeholder-image.json";
import pathFormat from "@/utils/pathFormat";

function PhotoCardSimple({
  data,
  containerClass = "col-md-6 col-lg-4 col-sm-12 mb-4 mx-0",
}) {
  return (
    data && (
      <MDBContainer className={containerClass}>
        <MDBCard className="h-100 d-flex d-column">
          <MDBCardImage
            className="clickable"
            src={data ? pathFormat(data) : pathFormat(placeholderImg.imagepath)}
            position="top"
          />
          <MDBCardBody>
            <a href={`/${data}`} download={data}>
              <MDBBtn color="success" className="mt-3 mx-1">
                Download
              </MDBBtn>
            </a>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    )
  );
}

export default PhotoCardSimple;
