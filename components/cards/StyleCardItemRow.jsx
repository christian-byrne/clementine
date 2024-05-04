import React, { useEffect, useState } from "react";
import { MDBListGroupItem, MDBBadge } from "mdb-react-ui-kit";
import allItemsData from "@/data/items/all";

function closestMatch(arr, prop, target) {
  // We are comparing strings
  // We are iterating through the array of objects, finding the object with the closest match on the prop to the target
  // We are returning the object with the closest match
  return arr.reduce((prev, curr) => Math.abs(curr[prop] - target) < Math.abs(prev[prop] - target) ? curr : prev);
}

function StyleCardItemRow({ itemName }) {

  const [matchedItemSrc, setMatchedItemSrc] = useState(null);

  useEffect(() => {
    const closestMatchedItem = closestMatch(allItemsData, "name", itemName);
    setMatchedItemSrc(closestMatchedItem.imageSrc || "");

  }, [itemName, allItemsData]);

  return (
    (matchedItemSrc && itemName) && (
    <MDBListGroupItem className="d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center">
        <img
          src={matchedItemSrc || "https://via.placeholder.com/45"}
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
    )
  );
}

export default StyleCardItemRow;
