import React, { useEffect, useState } from "react";
import { MDBListGroupItem, MDBBadge, MDBBtn } from "mdb-react-ui-kit";
import TagBadges from "@/components/badges/TagBadges";

function StylistTableRow({ index, stylistData, selected, selectedUpdater }) {
  const imgSize = 65;
  const [windowWidth, setWindowWidth] = useState(1200);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [windowWidth]);


  const setAsSelected = () => {
    console.log("Selected Index: ", index);
    selectedUpdater(index);
  }

  return (
    stylistData && (
      <MDBListGroupItem
        className={
          "d-flex justify-content-between align-items-center px-3" +
          (selected == index ? " bg-secondary bg-gradient bg-opacity-25 shadow-4 rounded-3" : "")
        }
      >
        <div className="d-flex align-items-center">
          <img
            src={
              stylistData.imageSrc || `https://via.placeholder.com/${imgSize}`
            }
            alt=""
            style={{ width: `${imgSize}px`, height: `${imgSize}px` }}
            className="rounded-circle"
          />
          <div className="ms-3">
            <p className="fw-bold mb-1">{stylistData.title}</p>
            <p className="text-muted mb-0">
              <TagBadges badgesData={stylistData.badges} 
              badgeClass={
                selected == index ? "badge-light" : "badge-secondary"
              }
              />
            </p>
          </div>
        </div>
        <MDBBtn color="primary" size="sm"
        onClick={setAsSelected}
        >
          Select
        </MDBBtn>
      </MDBListGroupItem>
    )
  );
}

export default StylistTableRow;
