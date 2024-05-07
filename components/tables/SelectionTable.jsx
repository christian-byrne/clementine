import React from "react";
import { MDBListGroup } from "mdb-react-ui-kit";

function StylistTable({
  data,
  selectedIndex,
  selectedUpdater,
  rowComponent: RowComponent,
  minWidth = "22rem",
}) {
  return (
    <MDBListGroup style={{ minWidth: minWidth }} light>
      {data.map((record, index) => (
        <RowComponent
          key={index}
          index={index}
          data={record}
          selected={selectedIndex}
          selectedUpdater={selectedUpdater}
        />
      ))}
    </MDBListGroup>
  );
}

export default StylistTable;
