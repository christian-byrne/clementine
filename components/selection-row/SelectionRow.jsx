import React, { useState, useEffect } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBBtn,
  MDBTypography,
  MDBBadge,
  MDBIcon,
} from "mdb-react-ui-kit";

function SelectionRow({
  title,
  subtext,
  badgeText,
  iconClass,
  badgeHref,
  tableComponent: TableComponent,
  tableData,
  maxHeight = "20vh",
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Table rows are rendered in reverse order, so set default as last row when tableData is loaded
  useEffect(() => {
    setSelectedIndex(tableData.length > 0 ? 0 : null);
  }, [tableData]);

  return (
    <MDBContainer
      fluid
      className="d-flex flow-row justify-content-between flex-wrap"
    >
      <MDBContainer className="d-flex justify-content-start flex-fill col-xl-5 col-lg-4 col-md-12">
        <MDBContainer className="d-flex flex-column">
          <MDBContainer className="d-flex">
            {title && (
              <MDBTypography tag="h1">
                {iconClass && (
                  <MDBIcon
                    fas
                    icon={iconClass || "user"}
                    size="1x"
                    className="m-3 text-center pt-2 text-primary"
                  />
                )}
                {title}
              </MDBTypography>
            )}
            {badgeText && (
              <a href={badgeHref || ""} className="h5 pt-2">
                <MDBBadge className="ms-2">{badgeText}</MDBBadge>
                <MDBBadge
                  color="success"
                  light
                  pill
                  className="position-absolute translate-middle"
                >
                  {tableData?.length}
                  <span className="visually-hidden">
                    number of stylists available to you
                  </span>
                </MDBBadge>
              </a>
            )}
          </MDBContainer>
          {subtext && (
            <MDBContainer className="d-flex">
              <MDBTypography tag="p" className="text-muted pe-5">
                {subtext}
              </MDBTypography>
            </MDBContainer>
          )}
        </MDBContainer>
      </MDBContainer>
      <MDBContainer
        fluid
        className="overflow-auto flex-fill col-xl-7 col-lg-8 col-md-12"
        style={{ maxHeight: maxHeight }}
      >
        {tableData?.length > 0 && (
          <>
            <TableComponent
              data={tableData}
              selectedIndex={selectedIndex}
              selectedUpdater={setSelectedIndex}
            />
          </>
        )}
      </MDBContainer>
    </MDBContainer>
  );
}

export default SelectionRow;
