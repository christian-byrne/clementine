import React, { useState, useEffect, use } from "react";
import {
  MDBRow,
  MDBContainer,
  MDBBtn,
  MDBIcon,
  MDBTypography,
} from "mdb-react-ui-kit";
import { useRouter } from "next/router";
import allStylistsData from "@/data/stylists/all.json";
import allPhotosData from "@/data/photos/all.json";
import StylistCardFullPage from "@/components/cards/StylistCardFullPage";
import sortRecordsByKey from "@/utils/sortRecordsByKey";
import PhotoCardFullPage from "@/components/cards/PhotoCardFullPage";
import formatDocTitle from "@/utils/formatDocTitle";

function BrowsePage() {
  const router = useRouter();
  const { contentType, itemName } = router.query;

  const [visibleIndex, setVisibleIndex] = useState(0);
  const [allDataSorted, setAllDataSorted] = useState([]);
  const [arrowKeyPressed, setArrowKeyPressed] = useState(false);

  useEffect(() => {
    if (contentType) {
      document.title = formatDocTitle(
        `Browse ${contentType.charAt(0).toUpperCase() + contentType.slice(1)}`
      );
    }
  }, [contentType]);

  // Setting records for page depends/re-renders on router query values (contentType, itemName) updating
  useEffect(() => {
    if (contentType === "stylists") {
      setAllDataSorted(sortRecordsByKey(allStylistsData, "rating"));
    } else if (contentType === "photos") {
      setAllDataSorted(sortRecordsByKey(allPhotosData, "likes"));
    }
  }, [contentType, itemName]);

  // Displayed record's index in data depends on allDataSorted updating. Must separate to prevent recursive loop
  useEffect(() => {
    if (contentType === "stylists") {
      // find index of itemName in allDataSorted and set as initial visible index
      const index = allDataSorted.findIndex(
        (stylist) => stylist?.titleSystemName === itemName
      );
      // if the item name is found
      if (index !== -1) setVisibleIndex(index);
    } else if (contentType === "photos") {
      // find index of itemName in allDataSorted and set as initial visible index
      const index = allDataSorted.findIndex(
        (photo) =>
          photo?.imageFileName.replace(".png", "") ===
          itemName.replace(".png", "")
      );
      // if the item name is found
      if (index !== -1) setVisibleIndex(index);
    }
  }, [allDataSorted]);

  const maxItems = allDataSorted.length - 1;

  const handleKeyDown = (event) => {
    setArrowKeyPressed(true);
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      setVisibleIndex((prevIndex) => (prevIndex + 1 + maxItems) % maxItems);
      event.preventDefault();
    }
  };
  const handleKeyUp = (event) => {
    setArrowKeyPressed(true);
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      // Account for 0 by adding maxItems and then taking the modulus
      setVisibleIndex((prevIndex) => (prevIndex - 1 + maxItems) % maxItems);
    }
  };

  // Swiping listener for mobile
  let startY = 0;

  const handleTouchStart = (event) => {
    event.preventDefault();
    startY = event.touches[0].clientY;
  };

  const handleTouchEnd = (event) => {
    const deltaY = event.changedTouches[0].clientY - startY;

    if (deltaY > 50) {
      // Swipe down
      setVisibleIndex((prevIndex) => (prevIndex - 1 + maxItems) % maxItems);
    } else if (deltaY < -50) {
      // Swipe up
      setVisibleIndex((prevIndex) => (prevIndex + 1) % maxItems);
    }
  };

  useEffect(() => {
    // Add event listener when component mounts
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    if (window.innerWidth < 768) {
      setArrowKeyPressed(true);
      window.addEventListener("touchstart", handleTouchStart, false);
      window.addEventListener("touchend", handleTouchEnd, false);
    }

    // Remove event listener when component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [allDataSorted, maxItems]);

  return (
    allDataSorted?.length > 0 && (
      <MDBRow>
        {!arrowKeyPressed && (
          <MDBContainer
            fluid
            className="d-flex flex-column align-items-end justify-content-center mt-5"
          >
            <MDBContainer className="col-md-5 col-lg-4 col-xl-3 col-sm-10 d-flex align-items-flex-start flex-column mx-0">
              <MDBTypography note noteColor="light">
                Use <strong>Arrow Keys</strong> &nbsp;
                <MDBIcon
                  icon={"fas fa-square-caret-right"}
                  style={{
                    fontSize: "1.15rem",
                    color: "rgba(12, 12, 242, 0.38)",
                  }}
                />
                &nbsp; to browse {contentType}
              </MDBTypography>
            </MDBContainer>
          </MDBContainer>
        )}
        <MDBContainer
          fluid
          className={
            !arrowKeyPressed
              ? "mb-4 mt-2 py-4 d-flex col-12"
              : "my-4 py-4 d-flex col-12"
          }
        >
          {contentType === "stylists" ? (
            <StylistCardFullPage stylistData={allDataSorted[visibleIndex]} />
          ) : contentType === "photos" ? (
            <PhotoCardFullPage photoData={allDataSorted[visibleIndex]} />
          ) : null}
        </MDBContainer>
        {/* Go Next Bottom Right Icon */}
        <MDBContainer className={"d-flex justify-content-end pb-5 pe-4 m-0"}>
          <MDBBtn
            color="link"
            className="p-0 m-0"
            onClick={() =>
              setVisibleIndex((prevIndex) => (prevIndex + 1) % maxItems)
            }
          >
            <MDBIcon
              icon={"fas fa-arrow-down"}
              style={{ fontSize: "2.25rem" }}
            />
          </MDBBtn>
        </MDBContainer>
      </MDBRow>
    )
  );
}

export default BrowsePage;
