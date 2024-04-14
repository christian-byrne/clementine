import React, { useState } from "react";
import { MDBContainer, MDBRow, MDBBtn } from "mdb-react-ui-kit";
import sortRecordsByKey from "@/utils/sortRecordsByKey";

function ContentRow({
  colComponent: ColComponent,
  colData,
  sortKey,
  colContainerClass,
  detailsStartExpanded,
  showFirstNCols = 6,
  maxCols = 50,
}) {
  const [colsExpanded, setExpanded] = useState(false);

  // Sort the colData array by the specified sortKey
  const allDataSorted = sortRecordsByKey(colData, sortKey);

  // Slice the sorted data into visibleCols and collapsedCols based on showFirstNCols
  const visibleCols = allDataSorted.slice(0, showFirstNCols);
  const collapsedCols = allDataSorted.slice(
    showFirstNCols,
    maxCols > 0 ? maxCols : allDataSorted.length
  );

  // Function to toggle expansion state
  const toggleExpansion = () => {
    setExpanded(!colsExpanded);
  };

  return (
    <MDBRow>
      {visibleCols.length > 0 && (
        <>
          {visibleCols.map((colData, index) => (
            <ColComponent
              key={index}
              data={colData}
              containerClass={colContainerClass}
              detailsStartExpanded={detailsStartExpanded}
            />
          ))}
        </>
      )}
      {collapsedCols.length > 0 && (
        <>
          <div
            style={{
              display: colsExpanded ? "flex" : "none",
              flexWrap: "wrap",
            }}
          >
            {collapsedCols.map((colData, index) => (
              <ColComponent
                key={index + visibleCols.length}
                data={colData}
                containerClass={colContainerClass}
                detailsStartExpanded={detailsStartExpanded}
              />
            ))}
          </div>
          <MDBContainer className="d-flex justify-content-center mt-0 mb-3">
            <MDBBtn onClick={toggleExpansion} size="sm" color="secondary">
              {colsExpanded ? "Show Less" : "Show More"}
            </MDBBtn>
          </MDBContainer>
        </>
      )}
    </MDBRow>
  );
}

export default ContentRow;
