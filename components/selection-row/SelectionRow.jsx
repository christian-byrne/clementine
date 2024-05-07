import React, { useState, useEffect } from "react";
import {
  MDBContainer,
  MDBTypography,
  MDBBadge,
  MDBIcon,
} from "mdb-react-ui-kit";

function SelectionRow({
  title,
  badgeText,
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
    <MDBContainer fluid className="d-flex flow-row">
      <MDBTypography tag="h1" className="my-4">
        <MDBIcon
          fas
          icon="1"
          size="1x"
          className="m-3 text-center pt-2 text-primary"
        />
        {title}
      </MDBTypography>
      <MDBTypography className="mt-5">
        <a href={badgeHref}>
          <MDBBadge className="ms-3">{badgeText}</MDBBadge>
        </a>
      </MDBTypography>
      <MDBContainer className="overflow-auto" style={{ maxHeight: maxHeight }}>
        {tableData?.length > 0 && (
          <TableComponent
            data={tableData}
            selectedIndex={selectedIndex}
            selectedUpdater={setSelectedIndex}
          />
        )}
      </MDBContainer>
    </MDBContainer>
  );
}

export default SelectionRow;
