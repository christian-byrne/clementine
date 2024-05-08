import React from "react";
import {
  MDBContainer,
  MDBTypography,
  MDBIcon,
  MDBFile,
} from "mdb-react-ui-kit";

function UploadRow({ title, subtext, maxHeight, minHeight }) {
  return (
    <MDBContainer
      fluid
      className="d-flex flow-row justify-content-between flex-wrap"
    >
      <MDBContainer className="d-flex justify-content-start flex-fill col-xl-5 col-lg-4 col-md-12">
        <MDBContainer className="d-flex flex-column">
          <MDBContainer className="d-flex">
            {title && (
              <MDBTypography tag="h1">
                {title}
                <MDBIcon
                  fas
                  icon="cloud-arrow-up"
                  size="1x"
                  className="m-3 text-center pt-2 text-primary"
                />
              </MDBTypography>
            )}
          </MDBContainer>
          {subtext && (
            <MDBContainer className="d-flex">
              <MDBTypography tag="p" className="text-muted pe-5">
                {subtext}
              </MDBTypography>
            </MDBContainer>
          )}
        </MDBContainer>
      </MDBContainer>
      <MDBContainer
        fluid
        className="flex-fill col-xl-7 col-lg-8 col-md-12 d-flex justify-content-center align-items-center"
        style={{ minHeight: minHeight, maxHeight: maxHeight }}
      >
        <MDBFile
          multiple
          id="uploadImage"
          color="primary"
          size="lg"
          className="text-secondary"
        />
      </MDBContainer>
    </MDBContainer>
  );
}

export default UploadRow;
