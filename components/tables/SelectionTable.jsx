import React from "react";
import { MDBListGroup } from "mdb-react-ui-kit";

function SelectionTable({
  data,
  selectedIndex,
  selectedUpdater,
  rowComponent: RowComponent,
  minWidth = "22rem",
  horizontal = false,
}) {
  return (
    <MDBListGroup style={{ minWidth: minWidth }} light
      className={
        horizontal ? "list-group-horizontal" : ""
      }
    >
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

export default SelectionTable;
