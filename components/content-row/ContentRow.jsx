import React, { useState, useEffect } from "react";
import { MDBContainer, MDBRow, MDBBtn } from "mdb-react-ui-kit";

function ContentRow({
  colComponent: ColComponent,
  dataRecords,
  colClassName,
  detailsStartExpanded,
  expandedNum,
  maxNum,
}) {
  const [visibleCols, setVisibleCols] = useState(expandedNum);
  const [colsExpanded, setColsExpanded] = useState(false);

  useEffect(() => {
    if (colsExpanded) {
      setVisibleCols(maxNum);
    } else {
      setVisibleCols(expandedNum);
    }
  }, [dataRecords, expandedNum, maxNum, colsExpanded]);

  const toggleExpansion = () => {
    setColsExpanded(!colsExpanded);
  };

  return (
    dataRecords?.length > 0 && (
      <MDBRow>
        <>
          {dataRecords.slice(0, visibleCols).map((colData, index) => (
            <ColComponent
              key={index}
              data={colData}
              containerClass={colClassName}
              detailsStartExpanded={detailsStartExpanded}
            />
          ))}
          <MDBContainer className="d-flex justify-content-center mb-3 mt-md-3 mt-lg-0">
            <MDBBtn onClick={toggleExpansion} size="sm" color="secondary">
              {colsExpanded ? "Show Less" : "Show More"}
            </MDBBtn>
          </MDBContainer>
        </>
      </MDBRow>
    )
  );
}

export default ContentRow;
