import React, { useEffect } from "react";
import { MDBBtn, MDBContainer } from "mdb-react-ui-kit";
import allStylistsData from "@/data/stylists/all.json";
import formatDocTitle from "@/utils/formatDocTitle";
import SelectionRow from "@/components/selection-row/SelectionRow";
import StylistTableRow from "@/components/tables/stylist/StylistTableRow";
import UploadRow from "@/components/selection-row/UploadRow";

function MergeStylistsPage() {
  useEffect(() => {
    document.title = formatDocTitle("Dress");
  }, []);

  return (
    <MDBContainer fluid>
      <div className="row mt-5">
        <main role="main" className="col-md-12 ms-sm-auto col-lg-12 px-md-4">
          <MDBContainer fluid className="mt-4">
            <SelectionRow
              title="Choose a Base Stylist"
              subtext="Select a stylist as the base model for the merge operation."
              badgeText="View All Stylists"
              badgeHref="/featured"
              tableRowComponent={StylistTableRow}
              tableData={allStylistsData}
              maxHeight="28vh"
              horizontal={false}
              multiSelect={false}
            />
            <hr className="my-4" />
            <UploadRow
              title="Upload Stylist Images"
              subtext="Upload images to be merged with the base stylist."
              iconClass="user"
              maxHeight="28vh"
              minHeight="22vh"
            />
            <hr className="my-4" />
            <MDBContainer
              className="d-flex flex-column justify-content-center p-5 text-center my-5"
              style={{ minHeight: "22vh" }}
            >
              <h1 className="mb-4">Create New Stylist</h1>
              <MDBBtn
                color="primary"
                size="lg"
                className="hover-shadow align-self-center ripple"
              >
                Refine
              </MDBBtn>
            </MDBContainer>
          </MDBContainer>
        </main>
      </div>
    </MDBContainer>
  );
}

export default MergeStylistsPage;
