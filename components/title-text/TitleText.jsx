import React from "react";
import { MDBTypography } from "mdb-react-ui-kit";

function TitleText({ text, className = "mb-4", tag = "h1" }) {
  return (
    <MDBTypography tag={tag} className={className}>
      {text}
    </MDBTypography>
  );
}

export default TitleText;
