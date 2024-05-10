import React, { useState } from "react";
import { MDBContainer, MDBRow, MDBBtn } from "mdb-react-ui-kit";

function ContentRow({
  colComponent: ColComponent,
  dataRecords,
  colClassName,
  detailsStartExpanded,
  initialVisibleNum,
  maxRequested,
  setMaxRequested,
}) {
  const [visibleColCount, setVisibleColCount] = useState(initialVisibleNum);
  const increment = initialVisibleNum; // Can set in a more intelligent way if you think of one
  const [contentIsExpanded, setContentIsExpanded] = useState(false);
  
  const showMore = () => {
    const newShownCount = visibleColCount + initialVisibleNum;
    if (newShownCount > maxRequested) {
      // Causes super to call API for more data
      setMaxRequested(maxRequested + (increment * 2));
    }
    setVisibleColCount(newShownCount);
    setContentIsExpanded(true);
  };

  const showLess = () => {
    setVisibleColCount(initialVisibleNum);
    setContentIsExpanded(false);
  };

  return (
    dataRecords?.length > 0 && (
      <MDBRow>
        <>
          {dataRecords.slice(0, visibleColCount).map((colData, index) => (
            <ColComponent
              key={index}
              data={colData}
              containerClass={colClassName}
              detailsStartExpanded={detailsStartExpanded}
            />
          ))}
          <MDBContainer className="d-flex justify-content-center mb-3 mt-md-3 mt-lg-0">
            <MDBBtn onClick={showMore} size="sm" color="secondary">
              Show More
            </MDBBtn>
            {contentIsExpanded && (
              <MDBBtn onClick={showLess} size="sm" color="secondary" className="ms-4 ms-lg-2">
                Show Less
              </MDBBtn>
            )}
          </MDBContainer>
        </>
      </MDBRow>
    )
  );
}

export default ContentRow;
