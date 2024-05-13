import React, { useEffect } from "react";
import { MDBContainer } from "mdb-react-ui-kit";
import TitleText from "@/components/title-text/TitleText";
import ContentRow from "@/components/content-row/ContentRow";
import PhotoCardSimple from "@/components/cards/PhotoCardSimple";

function MothersDayPage() {
  useEffect(() => {
    document.title = "Happy Mother's Day!";
  }, []);

  return (
    <MDBContainer fluid>
      <div className="row mt-3">
        <main role="main" className="col-md-12 ms-sm-auto col-lg-12 px-md-4">
          <MDBContainer fluid className="mt-4">
            <TitleText text={"Happy Mother's Day, Mom"} />
            <ContentRow
              colComponent={PhotoCardSimple}
              colClassName={"col-md-12 col-lg-12 col-sm-12 mb-4 mx-0"}
              dataRecords={[
                "pictures/mothersday/4.png",
                "pictures/mothersday/6.png",
                "pictures/mothersday/3.png",
                "pictures/mothersday/8.png",
                "pictures/mothersday/5.png",
                "pictures/mothersday/7.png",
                "pictures/mothersday/1.png",
                "pictures/mothersday/2.png",
              ]}
              initialVisibleNum={8}
              maxRequested={10}
              setMaxRequested={() => {}}
              detailsStartExpanded={false}
            />
          </MDBContainer>
        </main>
      </div>
    </MDBContainer>
  );
}

export default MothersDayPage;
