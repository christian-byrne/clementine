import React, { useEffect } from "react";
import { MDBBtn, MDBContainer } from "mdb-react-ui-kit";
import allStylistsData from "@/data/stylists/all.json";
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
      <div className="row mt-5">
        <main role="main" className="col-md-12 ms-sm-auto col-lg-12 px-md-4">
          <MDBContainer fluid className="mt-4">
            <SelectionRow
              title="Choose a Stylist"
              subtext="Select a stylist from your collection."
              badgeText="View All Stylists"
              badgeHref="/featured"
              tableRowComponent={StylistTableRow}
              tableData={allStylistsData}
              maxHeight="24vh"
              horizontal={false}
              multiSelect={false}
            />
            <hr className="my-4" />
            <SelectionRow
              title="Choose your Items"
              subtext="Select items from your closet as a starting point. The stylist will complete the look."
              badgeText=""
              badgeHref="/featured"
              tableRowComponent={ItemTableRow}
              tableData={allItemsData}
              maxHeight="24vh"
              horizontal={false}
              multiSelect={true}
            />
            <hr className="my-4" />
            <MDBContainer
              className="d-flex flex-column justify-content-center p-5 text-center my-5"
              style={{ minHeight: "30vh" }}
            >
              <h1 className="mb-4">Generate Suggestions</h1>
              <MDBBtn
                color="primary"
                size="lg"
                className="hover-shadow align-self-center ripple"
              >
                Generate
              </MDBBtn>
            </MDBContainer>
          </MDBContainer>
        </main>
      </div>
    </MDBContainer>
  );
}

export default DressPage;
