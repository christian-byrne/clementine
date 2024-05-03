import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
  MDBIcon,
  MDBContainer,
} from "mdb-react-ui-kit";

function EarnCard({
  data,
  containerClass = "col-xl-2 col-lg-3 col-md-4 col-sm-6 mb-4",
}) {
  return (
    data?.title && (
      <MDBContainer className={containerClass}>
        <MDBCard className="h-100">
          <MDBIcon icon={data.icon} size="3x" className="m-3 text-center" />
          <MDBCardBody>
            <MDBCardTitle>{data.title}</MDBCardTitle>
            <MDBCardText>{data.description}</MDBCardText>
          </MDBCardBody>
          <MDBContainer className="my-3">
            <MDBBtn color="primary" href={data.href} className="mx-3 mb-3">
              {data.linkText}
            </MDBBtn>
          </MDBContainer>
        </MDBCard>
      </MDBContainer>
    )
  );
}

export default EarnCard;
