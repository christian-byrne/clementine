import React from "react";
import SilhouetteCard from "../../components/SilhouetteCard";
import { MDBTypography, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import silhouetteSketches from "../../data/sketches/silhouettes";

export default function Silhouettes() {
  return (
    <MDBContainer fluid className="mt-5">
      <MDBTypography
        tag="div"
        className="display-1 pb-3 mb-4 text-center noto-display-h1"
      >
        Fashionable Silhouettes
      </MDBTypography>
      <MDBContainer fluid className="d-flex justify-content-center">
        <MDBTypography className="text-muted">
          <strong>Hover</strong> over silhouettes to see examples
        </MDBTypography>
      </MDBContainer>
      <MDBRow className="mt-4 row-eq-height">
        {silhouetteSketches.map((sketch, index) => (
          <SilhouetteCard key={index} sketchData={sketch} />
        ))}
      </MDBRow>
    </MDBContainer>
  );
}
