import React, { useEffect } from "react";
import { MDBContainer} from "mdb-react-ui-kit";
import formatDocTitle from "@/utils/formatDocTitle";
import StylesRow from "@/components/content-row/StylesRow";
import TitleText from "@/components/title-text/TitleText";

function StylesPage() {
  useEffect(() => {
    document.title = formatDocTitle("Styles");
  }, []);

  return (
    <MDBContainer fluid>
      <div className="row mt-3">
        <main role="main" className="col-md-12 ms-sm-auto col-lg-12 px-md-4">
          <MDBContainer fluid className="mt-4">
            <TitleText text="Styles" />
            <StylesRow
              colClassName={"col-md-6 col-lg-4 col-xl-3 col-sm-12 mb-4"}
              initialVisibleNum={15}
              maxNum={40}
            />
          </MDBContainer>
        </main>
      </div>
    </MDBContainer>
  );
}

export default StylesPage;
