import React, { useEffect } from "react";
import { MDBContainer, MDBTypography } from "mdb-react-ui-kit";
import ContentRow from "@/components/content-row/ContentRow";
import StylistCard from "@/components/cards/StylistCard";
import PhotoCard from "@/components/cards/PhotoCard";
import allStylistsData from "@/data/stylists/all.json";
import allPhotosData from "@/data/photos/all.json";
import formatDocTitle from "@/utils/formatDocTitle";

function FeaturedPage() {
  useEffect(() => {
    document.title = formatDocTitle("Featured");
  }, []);

  return (
    <MDBContainer fluid>
      <div className="row mt-3">
        <main role="main" className="col-md-12 ms-sm-auto col-lg-12 px-md-4">
          <MDBContainer fluid className="mt-4">
            {/* Featured Models Row */}
            <MDBTypography tag="h1" className="my-4">Featured Stylists</MDBTypography>
            <ContentRow
              colComponent={StylistCard}
              colData={allStylistsData}
              sortKey="rating"
              showFirstNCols={6}
              maxCols={30}
              colContainerClass={"col-md-6 col-lg-4 col-sm-12 mb-4"}
              detailsStartExpanded={false}
            />
            {/* Featured Photos Row */}
            <MDBTypography  tag="h1" className="my-4">Featured Photos</MDBTypography>
            <ContentRow
              colComponent={PhotoCard}
              colData={allPhotosData}
              sortKey="likes"
              showFirstNCols={9}
              maxCols={50}
              colContainerClass={"col-md-6 col-lg-4 col-sm-12 mb-4 mx-0"}
            />
          </MDBContainer>
        </main>
      </div>
    </MDBContainer>
  );
}

export default FeaturedPage;
