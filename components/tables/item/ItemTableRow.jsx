import React from "react";
import { MDBListGroupItem, MDBBtn } from "mdb-react-ui-kit";

function ItemTableRow({ index, data, selected, selectedUpdater }) {
  const imgSize = 65;

  const setSelfSelected = () => {
    selectedUpdater(index);
  };

  return (
    data && (
      <MDBListGroupItem
        className={
          "d-flex justify-content-between align-items-center px-3" +
          (selected.includes(index)
            ? " bg-secondary bg-gradient bg-opacity-25 shadow-4 rounded-3"
            : "")
        }
      >
        <div className="d-flex align-items-center">
          <img
            src={data?.imageSrc || `https://via.placeholder.com/${imgSize}`}
            alt=""
            style={{ width: `${imgSize}px`, height: `${imgSize}px` }}
            className="rounded-circle"
          />
          <div className="ms-3">
            <p className="fw-bold mb-1">{data.name}</p>
            <p className="mb-0 text-muted">
              <span className="small">CREATED</span> {data.dateCreated}{" "}
              &nbsp;&nbsp; <span className="small">LAST WORN</span>{" "}
              {data.dateLastUsed}.
            </p>
          </div>
        </div>
        <MDBBtn color="primary" size="sm" onClick={setSelfSelected}>
          {selected.includes(index) ? "Unselect" : "Select"}
        </MDBBtn>
      </MDBListGroupItem>
    )
  );
}

export default ItemTableRow;
