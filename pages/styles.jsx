import React, { useEffect } from "react";
import { MDBContainer, MDBTypography } from "mdb-react-ui-kit";
import ContentRow from "@/components/content-row/ContentRow";
import StyleCard from "@/components/cards/StyleCard";
import allStylesData from "@/data/styles/styles.json";
import formatDocTitle from "@/utils/formatDocTitle";

function StylesPage() {
  useEffect(() => {
    document.title = formatDocTitle("Styles");
  }, []);

  return (
    <MDBContainer fluid>
      <div className="row mt-3">
        <main role="main" className="col-md-12 ms-sm-auto col-lg-12 px-md-4">
          <MDBContainer fluid className="mt-4">
            <MDBTypography tag="h1" className="my-4">
              Styles
            </MDBTypography>
            <ContentRow
              colComponent={StyleCard}
              colData={allStylesData}
              sortKey="title"
              sortType="desc"
              showFirstNCols={30}
              maxCols={100}
              colContainerClass={"col-md-6 col-lg-4 col-xl-3 col-sm-12 mb-4"}
              detailsStartExpanded={false}
            />
          </MDBContainer>
        </main>
      </div>
    </MDBContainer>
  );
}

export default StylesPage;
