import React from "react";
import { MDBTypography } from "mdb-react-ui-kit";

function TitleText({ text }) {
  return (
    <MDBTypography tag="h2" className="mb-4">{text}</MDBTypography>
  );
}

export default TitleText;