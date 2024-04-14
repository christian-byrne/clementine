import React, { useEffect, useState } from "react";
import { MDBContainer, MDBTypography } from "mdb-react-ui-kit";
import ContentRow from "@/components/content-row/ContentRow";
import StylistCard from "@/components/cards/StylistCard";
import PhotoCard from "@/components/cards/PhotoCard";
import allStylistsData from "@/data/stylists/all.json";
import allPhotosData from "@/data/photos/all.json";
import getBreakpoint from "@/utils/getBreakpoint";

function FeaturedPage() {
  useEffect(() => {
    document.title = "Explore | Featured";
  }, []);

  const [nCols, setNCols] = useState(6);
  const adjustNCols = () => {
    const windowWidth = window.innerWidth;
    const breakpoint = getBreakpoint(windowWidth);
    const colSizeMap = {
      sm: 1,
      md: 3,
      lg: 4,
      xl: 4,
      xxl: 6,
    };
    setNCols(colSizeMap[breakpoint]);
  };

  useEffect(() => {
    adjustNCols();
    const handleResize = () => {
      adjustNCols();
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <MDBContainer fluid>
      <div className="row mt-3">
        <main role="main" className="col-12 ms-sm-auto px-md-4">
          <MDBContainer fluid className="mt-4">
            {/* Featured Models Row */}
            <MDBTypography tag="h2">Featured Stylists</MDBTypography>
            <ContentRow
              colComponent={StylistCard}
              colData={allStylistsData}
              sortKey="rating"
              showFirstNCols={nCols}
              maxCols={30}
              colContainerClass={"col-sm 12 col-md-4 col-lg-3 col-xl-2 mb-4"}
              detailsStartExpanded={false}
            />
            {/* Featured Photos Row */}
            <MDBTypography tag="h2">Featured Photos</MDBTypography>
            <ContentRow
              colComponent={PhotoCard}
              colData={allPhotosData}
              sortKey="likes"
              showFirstNCols={9}
              maxCols={50}
              colContainerClass={"col-md-6 col-lg-4 col-sm-12 col-xxl-3 mb-4 mx-0"}
            />
          </MDBContainer>
        </main>
      </div>
    </MDBContainer>
  );
}

export default FeaturedPage;
