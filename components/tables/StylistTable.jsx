import React, { useState } from "react";
import {
  MDBContainer,
  MDBBtn,
  MDBTypography,
  MDBListGroup,
  MDBIcon,
} from "mdb-react-ui-kit";
import StylistTableRow from "@/components/tables/StylistTableRow";

function StylistTable({ data, selectedIndex, selectedUpdater }) {
  return (
    <>
      <MDBListGroup style={{ minWidth: "22rem" }} light>
        {data.map((stylist, index) => (
          <StylistTableRow
            key={index}
            index={index}
            stylistData={stylist}
            selected={selectedIndex}
            selectedUpdater={selectedUpdater}
          />
        ))}
      </MDBListGroup>
      {/* <MDBContainer className="d-flex justify-content-center mb-3 mt-md-3 mt-lg-0">
      </MDBContainer> */}
    </>
  );
}

export default StylistTable;
