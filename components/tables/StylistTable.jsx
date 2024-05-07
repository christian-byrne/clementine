import React from "react";
import { MDBListGroup } from "mdb-react-ui-kit";
import StylistTableRow from "@/components/tables/StylistTableRow";

function StylistTable({ data, selectedIndex, selectedUpdater }) {
  return (
    <MDBListGroup style={{ minWidth: "22rem" }} light>
      {data.map((stylist, index) => (
        <StylistTableRow
          key={index}
          index={index}
          stylistData={stylist}
          selected={selectedIndex}
          selectedUpdater={selectedUpdater}
        />
      ))}
    </MDBListGroup>
  );
}

export default StylistTable;
