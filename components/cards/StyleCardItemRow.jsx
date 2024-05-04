import React from "react";
import { MDBListGroupItem, MDBBadge } from "mdb-react-ui-kit";

function StyleCardItemRow({ itemName }) {
  return (
    <MDBListGroupItem className="d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center">
        <img
        src={Math.random() * 100 % 5 === 0 ? "polo-shirt.png" : Math.random() * 100 % 3 === 0 ? "retro-blouse.png" : "oversized-jersey.png"}
          // src="https://mdbootstrap.com/img/new/avatars/8.jpg"
          alt=""
          style={{ width: "45px", height: "45px" }}
          className="rounded-circle"
        />
        <div className="ms-3">
          <p className="fw-bold mb-1">{itemName}</p>
          <p className="text-muted mb-0">Lorem ipsum dolor sit amet.</p>
        </div>
      </div>
      <MDBBadge pill light color="success">
        Active
      </MDBBadge>
    </MDBListGroupItem>
  );
}

export default StyleCardItemRow;
