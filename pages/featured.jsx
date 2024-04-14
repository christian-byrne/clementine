import React, { useEffect, useState } from "react";
import { MDBContainer, MDBRow, MDBBtn } from "mdb-react-ui-kit";
import FeaturedModelsRow from "@/components/content-row/FeaturedModelsRow";
import FeaturedPhotosRow from "@/components/content-row/FeaturedPhotosRow";

function FeaturedPage() {
  useEffect(() => {
    document.title = "Featured";
  }, []);

  return (
    <MDBContainer fluid>
      <div className="row mt-3">
        <main role="main" className="col-md-12 ms-sm-auto col-lg-12 px-md-4">
          <MDBContainer fluid className="mt-5">
            <FeaturedModelsRow></FeaturedModelsRow>
            <FeaturedPhotosRow></FeaturedPhotosRow>
          </MDBContainer>
        </main>
      </div>
    </MDBContainer>
  );
}

export default FeaturedPage;
