import React, { useEffect, useState } from "react";
import { MDBListGroupItem, MDBBtn } from "mdb-react-ui-kit";
import TagBadges from "@/components/badges/TagBadges";

function ItemTableRow({ index, data, selected, selectedUpdater }) {
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
  };

  return (
    data && (
      <MDBListGroupItem
        className={
          "d-flex justify-content-between align-items-center px-3" +
          (selected == index
            ? " bg-secondary bg-gradient bg-opacity-25 shadow-4 rounded-3"
            : "")
        }
      >
        <div className="d-flex align-items-center">
          <img
            src={
              data?.imageSrc || `https://via.placeholder.com/${imgSize}`
            }
            alt=""
            style={{ width: `${imgSize}px`, height: `${imgSize}px` }}
            className="rounded-circle"
          />
          <div className="ms-3">
            <p className="fw-bold mb-1">{data.title}</p>
            <p className="text-muted mb-0">
              <TagBadges
                badgesData={data.badges}
                badgeClass={
                  selected == index ? "badge-light" : "badge-secondary"
                }
                windowWidth={windowWidth}
                breakpoints={{
                  576: 1,
                  1080: 1,
                  1520: 2,
                  1820: 3,
                  1980: 4,
                  3200: 5,
                }}
              />
            </p>
          </div>
        </div>
        <MDBBtn color="primary" size="sm" onClick={setAsSelected}>
          Select
        </MDBBtn>
      </MDBListGroupItem>
    )
  );
}

export default ItemTableRow;
