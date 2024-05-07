import React, { useState } from "react";
import {
  MDBContainer,
  MDBBtn,
  MDBTypography,
  MDBListGroup,
  MDBIcon,
} from "mdb-react-ui-kit";
import StylistTableRow from "@/components/tables/StylistTableRow";

function StylistTable({ data, title }) {
  return (
    <>
      <MDBTypography tag="h5" className={"my-2 "}>
        {title}
      </MDBTypography>
      <MDBListGroup style={{ minWidth: "22rem" }} light>
        {data.map((stylist, index) => (
          <StylistTableRow key={index} stylistData={stylist} />
        ))}
      </MDBListGroup>
      {/* <MDBContainer className="d-flex justify-content-center mb-3 mt-md-3 mt-lg-0">
      </MDBContainer> */}
    </>
  );
}

export default StylistTable;
