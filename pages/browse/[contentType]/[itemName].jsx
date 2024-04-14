import React, { useState, useEffect } from "react";
import { MDBContainer, MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import { useRouter } from "next/router";
import allModelsData from "@/data/models/all.json";
import allPhotosData from "@/data/photos/all.json";
import ModelCardFullPage from "@/components/ModelCardFullPage";
import sortRecordsByKey from "@/utils/sortModelsByKey";
import PhotoCardFullPage from "@/components/PhotoCardFullPage";

function BrowsePage() {
  const router = useRouter();
  const { contentType, itemName } = router.query;

  const [visibleIndex, setVisibleIndex] = useState(0);
  const [allDataSorted, setAllDataSorted] = useState([]);

  useEffect(() => {
    if (contentType === "models") {
      setAllDataSorted(sortRecordsByKey(allModelsData, "rating"));
      // find index of itemName in allDataSorted and set as initial visible index
      const index = allDataSorted.findIndex(
        (model) => model?.titleSystemName === itemName
      );
      // if the item name is found
      if (index !== -1) setVisibleIndex(index);
    } else if (contentType === "photos") {
      setAllDataSorted(allPhotosData);
      // find index of itemName in allDataSorted and set as initial visible index
      const index = allDataSorted.findIndex(
        (photo) =>
          photo?.imageFileName.replace(".png", "") ===
          itemName.replace(".png", "")
      );
      // if the item name is found
      if (index !== -1) setVisibleIndex(index);
    }
  }, [contentType, allDataSorted]);

  const maxItems = allDataSorted.length - 1;

  const handleKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      setVisibleIndex((prevIndex) => (prevIndex + 1 + maxItems) % maxItems);
      event.preventDefault();
    }
  };
  const handleKeyUp = (event) => {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      // Account for 0 by adding maxItems and then taking the modulus
      setVisibleIndex((prevIndex) => (prevIndex - 1 + maxItems) % maxItems);
    }
  };

  useEffect(() => {
    document.title = "Browse";
    // Add event listener when component mounts
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // Remove event listener when component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [allDataSorted, maxItems]);

  return (
    allDataSorted?.length > 0 && (
      <>
        <MDBContainer fluid className="my-4 py-4 d-flex">
          {contentType === "models" ? (
            <ModelCardFullPage modelData={allDataSorted[visibleIndex]} />
          ) : contentType === "photos" ? (
            <PhotoCardFullPage photoData={allDataSorted[visibleIndex]} />
          ) : null}
        </MDBContainer>
        {/* Go Next Bottom Right Icon */}
        <MDBContainer className={"d-flex justify-content-end mb-5 me-4"}>
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
      </>
    )
  );
}

export default BrowsePage;
