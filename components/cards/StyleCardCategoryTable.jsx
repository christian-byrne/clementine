import React, { useState } from "react";
import {
  MDBContainer,
  MDBBtn,
  MDBTypography,
  MDBListGroup,
  MDBIcon,
} from "mdb-react-ui-kit";
import StyleCardItemRow from "@/components/cards/StyleCardItemRow";

function StyleCardCategoryTable({ categoryItems, title }) {
  const showFirstNRows = 1;

  const [rowsExpanded, setRowsExpanded] = useState(showFirstNRows);
  const toggleExpansion = () => {
    if (rowsExpanded === showFirstNRows) {
      setRowsExpanded(Infinity);
    } else {
      setRowsExpanded(showFirstNRows);
    }
  };

  return (
    categoryItems?.length > 0 && (
      <>
        <MDBTypography
          tag="h5"
          className={
            "my-2 " +
            (rowsExpanded == showFirstNRows ? "text-dark" : "text-black-50")
          }
        >
          {title}
        </MDBTypography>
        <MDBListGroup light>
          {categoryItems.slice(0, rowsExpanded).map((item, index) => {
            return <StyleCardItemRow key={index} itemName={item} />;
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
    )
  );
}

export default StyleCardCategoryTable;
