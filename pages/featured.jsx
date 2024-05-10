import React, { useEffect } from "react";
import { MDBContainer } from "mdb-react-ui-kit";
import StylistCard from "@/components/cards/StylistCard";
import PhotoCard from "@/components/cards/PhotoCard";
import formatDocTitle from "@/utils/formatDocTitle";
import StylistsRow from "@/components/content-row/StylistsRow";
import PhotosRow from "@/components/content-row/PhotosRow";
import TitleText from "@/components/title-text/TitleText";

function FeaturedPage() {
  useEffect(() => {
    document.title = formatDocTitle("Featured");
  }, []);

  return (
    <MDBContainer fluid>
      <div className="row mt-3">
        <main role="main" className="col-md-12 ms-sm-auto col-lg-12 px-md-4">
          <MDBContainer fluid className="mt-4">
            <TitleText text={"Featured Stylists"} />
            <StylistsRow
              colComponent={StylistCard}
              sortField={"dateCreated"}
              initialVisibleNum={6}
              colClassName={"col-md-6 col-lg-4 col-sm-12 mb-4"}
              detailsStartExpanded={false}
              maxNum={40}
              sortOrder={"ASC"}
            />
            <TitleText text={"Featured Photos"} />
            <PhotosRow
              colClassName={"col-md-6 col-lg-4 col-sm-12 mb-4 mx-0"}
              colComponent={PhotoCard}
              initialVisibleNum={9}
              maxNum={50}
              sortField={"favorites"}
              sortOrder={"DESC"}
            />
          </MDBContainer>
        </main>
      </div>
    </MDBContainer>
  );
}

export default FeaturedPage;
