import React, { useState, useEffect } from "react";
import {
  MDBContainer,
  MDBTypography,
  MDBBadge,
  MDBIcon,
} from "mdb-react-ui-kit";
import SelectionTable from "@/components/tables/SelectionTable";

function SelectionRow({
  title,
  subtext,
  badgeText,
  iconClass,
  badgeHref,
  tableRowComponent: TableRowComponent,
  tableData,
  maxHeight = "20vh",
  horizontal = false,
  multiSelect = false,
}) {
  const [selectedRowIndices, setSelectedRowIndices] = useState([0]);

  const toggleRowSelected = (rowIndex) => {
    if (!multiSelect) {
      setSelectedRowIndices([rowIndex]);
    }
    else {
      let temp = [...selectedRowIndices]
      if (temp.includes(rowIndex)) {
        temp = temp.filter((i) => i != rowIndex);
      }
      else {
        temp.push(rowIndex);
      }
      console.log("Selected Index: ", temp);
      setSelectedRowIndices(temp);
    }
  };

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
                    {badgeText}: number available to you
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
          <SelectionTable
            rowComponent={TableRowComponent}
            data={tableData}
            selectedIndex={selectedRowIndices}
            selectedUpdater={toggleRowSelected}
            horizontal={horizontal}
          />
        )}
      </MDBContainer>
    </MDBContainer>
  );
}

export default SelectionRow;
