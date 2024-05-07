import React, { useEffect } from "react";
import {
  MDBContainer,
  MDBTypography,
} from "mdb-react-ui-kit";
import ContentRow from "@/components/content-row/ContentRow";
import PhotoCard from "@/components/cards/PhotoCard";
import allStylistsData from "@/data/stylists/all.json";
import allPhotosData from "@/data/photos/all.json";
import formatDocTitle from "@/utils/formatDocTitle";
import SelectionRow from "@/components/selection-row/SelectionRow";
import ItemTableRow from "@/components/tables/item/ItemTableRow";
import StylistTableRow from "@/components/tables/stylist/StylistTableRow";
// TODO: replace with data stylists unlocked/saved/accessible/etc mapped to user pkey in relational db
import allItemsData from "@/data/items/all.json";

function DressPage() {
  useEffect(() => {
    document.title = formatDocTitle("Dress");
  }, []);

  return (
    <MDBContainer fluid>
      <div className="row mt-3">
        <main role="main" className="col-md-12 ms-sm-auto col-lg-12 px-md-4">
          <MDBContainer fluid className="mt-4">
            <SelectionRow
              title="Choose a Stylist"
              badgeText="View All Stylists"
              badgeHref="/featured"
              tableRowComponent={StylistTableRow}
              tableData={allStylistsData}
              horizontal={false}
              multiSelect={false}
            />
            <hr className="my-4"/>
            <SelectionRow
              title="Choose your Items"
              subtext="Select items from your closet as a starting point. The stylist will complete the look."
              badgeText=""
              badgeHref="/featured"
              tableRowComponent={ItemTableRow}
              tableData={allItemsData}
              horizontal={false}
              multiSelect={true}
            />
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
