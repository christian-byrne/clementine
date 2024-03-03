import React, { useState, useEffect } from "react";
import { MDBContainer, MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import allModelsData from "../data/models/all.json";
import ModelCardFullPage from "@/components/ModelCardFullPage";

function BrowsePage() {
  useEffect(() => {
    document.title = "Browse Styles";
  }, []);

  const [visibleIndex, setVisibleIndex] = useState(0);

  const visibleItem = allModelsData[visibleIndex];

  const maxModels = allModelsData.length - 1;

  return (
    <>
      <MDBContainer fluid className="my-4 py-4 d-flex">
        <ModelCardFullPage modelData={visibleItem} />
        {/* Go Next Bottom Right Icon */}
      </MDBContainer>
      <MDBContainer className={"d-flex justify-content-end mb-5 me-4"}>
        <MDBBtn
          color="link"
          className="p-0 m-0"
          onClick={() =>
            setVisibleIndex((visibleIndex + 1) % maxModels)
          }
        >
          <MDBIcon icon={"fas fa-arrow-down"} style={{ fontSize: "2.25rem" }} />
        </MDBBtn>
      </MDBContainer>
    </>
  );
}

export default BrowsePage;
