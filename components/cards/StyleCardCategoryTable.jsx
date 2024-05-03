import React, { useState } from "react";
import {
  MDBContainer,
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBBtn,
  MDBTypography,
  MDBListGroup,
  MDBListGroupItem,
  MDBBadge,
  MDBIcon,
} from "mdb-react-ui-kit";
import placeholderImg from "@/data/placeholder-image.json";
import pathFormat from "@/utils/pathFormat";
import { hyphenToTitle } from "@/utils/hyphenNameToTitle";

function StyleCardCategoryTable({ categoryItems, title }) {
  const showFirstNRows = 2;

  const [rowsExpanded, setExpanded] = useState(showFirstNRows);
  const toggleExpansion = () => {
    if (rowsExpanded === showFirstNRows) {
      setExpanded(Infinity);
    } else {
      setExpanded(showFirstNRows);
    }
  };

  return (
    <>
      <MDBTypography tag="h5" className="my-2">
        {title}
      </MDBTypography>
      <MDBListGroup style={{ minWidth: "22rem" }} light>
        {categoryItems.slice(0, rowsExpanded).map((item, index) => {
          return (
            <MDBListGroupItem
              key={index}
              className="d-flex justify-content-between align-items-center"
            >
              <div className="d-flex align-items-center">
                <img
                  src="https://mdbootstrap.com/img/new/avatars/8.jpg"
                  alt=""
                  style={{ width: "45px", height: "45px" }}
                  className="rounded-circle"
                />
                <div className="ms-3">
                  <p className="fw-bold mb-1">{item}</p>
                  <p className="text-muted mb-0">john.doe@gmail.com</p>
                </div>
              </div>
              <MDBBadge pill light color="success">
                Active
              </MDBBadge>
            </MDBListGroupItem>
          );
        })}
      </MDBListGroup>
      <MDBContainer className="d-flex justify-content-center mb-3 mt-md-3 mt-lg-0">
        <MDBBtn onClick={toggleExpansion} size="sm" color="secondary">
          {rowsExpanded !== showFirstNRows ? (
            <MDBIcon icon={"fas fa-chevron-up"} />
          ) : (
            <MDBIcon icon={"fas fa-chevron-down"} />
          )}
        </MDBBtn>
      </MDBContainer>
    </>
  );
}

export default StyleCardCategoryTable;
