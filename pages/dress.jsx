import React, { useEffect } from "react";
import {
  MDBContainer,
  MDBTypography,
  MDBIcon,
  MDBBadge,
} from "mdb-react-ui-kit";
import ContentRow from "@/components/content-row/ContentRow";
import PhotoCard from "@/components/cards/PhotoCard";
import allStylistsData from "@/data/stylists/all.json";
import allPhotosData from "@/data/photos/all.json";
import formatDocTitle from "@/utils/formatDocTitle";
import StylistTableScrollable from "@/components/tables/StylistTableScrollable";
// TODO: replace with data stylists unlocked/saved/accessible/etc mapped to user pkey in relational db

function DressPage() {
  useEffect(() => {
    document.title = formatDocTitle("Dress");
  }, []);

  return (
    <MDBContainer fluid>
      <div className="row mt-3">
        <main role="main" className="col-md-12 ms-sm-auto col-lg-12 px-md-4">
          <MDBContainer fluid className="mt-4">
            {/* Featured Models Row */}
            <MDBContainer className="d-flex flow-row">
              <MDBTypography tag="h1" className="my-4">
                <MDBIcon
                  fas
                  icon="1"
                  size="1x"
                  className="m-3 text-center pt-2 text-primary"
                />
                Choose Stylist
              </MDBTypography>
              <MDBTypography className="mt-5">
                <a href="/featured">
                <MDBBadge className="ms-2">Browse Stylists</MDBBadge>
                </a>
              </MDBTypography>

            {allStylistsData?.length > 0 && (
              <StylistTableScrollable stylistData={allStylistsData} />
            )}


            </MDBContainer>
            
            
            {/* Featured Photos Row */}
            <MDBTypography tag="h1" className="my-4">
              Featured Photos
            </MDBTypography>
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

export default DressPage;
