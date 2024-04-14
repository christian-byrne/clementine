import React, { useState } from "react";
import { MDBContainer, MDBRow, MDBBtn } from "mdb-react-ui-kit";
import ModelCard from "@/components/cards/ModelCard";
import allModelsData from "@/data/models/all.json";
import sortModelsByKey from "@/utils/sortModelsByKey";

function FeaturedModelsRow() {
  const [modelsExpanded, setModelsExpanded] = useState(false);

  const allModelsDataSorted = sortModelsByKey(allModelsData, "rating");
  const initialModels = allModelsDataSorted.slice(0, 6);
  const remainingModels = allModelsDataSorted.slice(6);
  
  const toggleModelsExpansion = () => {
    setModelsExpanded(!modelsExpanded);
  };

  return (
    <MDBRow>
      {initialModels.length > 0 && (
        <>
          <h2 className="mb-4">Featured Stylists</h2>
          {initialModels.map((model, index) => (
            <ModelCard key={index} modelData={model} />
          ))}
        </>
      )}
      {remainingModels.length > 0 && (
        <>
          <div
            style={{
              display: modelsExpanded ? "flex" : "none",
              flexWrap: "wrap",
            }}
          >
            {remainingModels.map((model, index) => (
              <ModelCard key={index + initialModels.length} modelData={model} />
            ))}
          </div>
          <MDBContainer className="d-flex justify-content-center mt-0 mb-3">
            <MDBBtn onClick={toggleModelsExpansion} size="sm" color="secondary">
              {modelsExpanded ? "Show Less" : "Show More"}
            </MDBBtn>
          </MDBContainer>
        </>
      )}
    </MDBRow>
  );
}

export default FeaturedModelsRow;
