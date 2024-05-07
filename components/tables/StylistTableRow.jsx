import React, { useEffect, useState } from "react";
import { MDBListGroupItem, MDBBadge } from "mdb-react-ui-kit";


function StylistTableRow({ stylistData }) {

  return (
    stylistData && (
    <MDBListGroupItem className="d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center">
        <img
          src={stylistData.imageSrc || "https://via.placeholder.com/45"}
          alt=""
          style={{ width: "45px", height: "45px" }}
          className="rounded-circle"
        />
        <div className="ms-3">
          <p className="fw-bold mb-1">{stylistData.title}</p>
          <p className="text-muted mb-0">{stylistData.badges}</p>
        </div>
      </div>
      <MDBBadge pill light color="success">
        {stylistData.dateCreated}
      </MDBBadge>
    </MDBListGroupItem>
    )
  );
}

export default StylistTableRow;
