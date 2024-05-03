import React, { useEffect } from "react";
import { MDBContainer, MDBTypography } from "mdb-react-ui-kit";
import ContentRow from "@/components/content-row/ContentRow";
import StyleCard from "@/components/cards/StyleCard";
import allStylesData from "@/data/styles/styles.json";

function FeaturedPage() {
  useEffect(() => {
    document.title = "Styles";
  }, []);

  return (
    <MDBContainer fluid>
      <div className="row mt-3">
        <main role="main" className="col-md-12 ms-sm-auto col-lg-12 px-md-4">
          <MDBContainer fluid className="mt-4">
            {/* Featured Models Row */}
            <MDBTypography tag="h2" className="my-4">
              Styles
            </MDBTypography>
            <ContentRow
              colComponent={StyleCard}
              colData={allStylesData}
              sortKey="title"
              showFirstNCols={6}
              maxCols={30}
              colContainerClass={"col-md-6 col-lg-6 col-sm-12 mb-4"}
              detailsStartExpanded={true}
            />
          </MDBContainer>
        </main>
      </div>
    </MDBContainer>
  );
}

export default FeaturedPage;
