import React, { useEffect, useState } from "react";
import { MDBContainer, MDBRow, MDBBtn } from "mdb-react-ui-kit";
import ModelCard from "../components/ModelCard";
import PhotoCard from "../components/PhotoCard";
import allModelsData from "../data/models/all.json";
import allPhotosData from "../data/photos/all.json";
import { shuffleArray } from "../utils/shuffleArray";

function FeaturedPage() {
  useEffect(() => {
    document.title = "Featured Styles";
  }, []);

  const [expanded, setExpanded] = useState(false);
  const initialModels = allModelsData.slice(0, 6);
  const remainingModels = allModelsData.slice(6);

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  // Randomize the order of the data
  //   allModelsData = shuffleArray(allModelsData);
  allPhotosData = shuffleArray(allPhotosData);

  return (
    <MDBContainer fluid>
      <div className="row mt-3">
        {/* <div className="col-md-3 d-none d-md-block bg-light sidebar">
            NAVIGATION BAR OR SECTION NAV GOES HERE
          </div> */}
        {/* <main role="main" className="col-md-9 ms-sm-auto col-lg-9 px-md-4"> */}
        <main role="main" className="col-md-12 ms-sm-auto col-lg-12 px-md-4">
          <MDBContainer fluid className="mt-5">
            {/* Featured Models */}
            <MDBRow>
              {initialModels.length > 0 && (
                <>
                  <h2 className="mb-4">Featured Stylists</h2>
                  {initialModels.map((model, index) => (
                    <ModelCard key={index} modelData={model} />
                  ))}
                </>
              )}
              {remainingModels.length > 0 && (
                <>
                  <div
                    style={{
                      display: expanded ? "flex" : "none",
                      "flex-wrap": "wrap",
                    }}
                  >
                    {remainingModels.map((model, index) => (
                      <ModelCard
                        key={index + initialModels.length}
                        modelData={model}
                      />
                    ))}
                  </div>
                  <MDBContainer className="d-flex justify-content-center mt-0 mb-3">
                    <MDBBtn
                      onClick={toggleExpansion}
                      size="sm"
                      color="secondary"
                    >
                      {expanded ? "Show Less" : "Show More"}
                    </MDBBtn>
                  </MDBContainer>
                </>
              )}
            </MDBRow>
            {/* Featured Photos */}
            <MDBRow>
              {allPhotosData && allPhotosData.length > 0 && (
                <>
                  <h2 className="mb-4">Featured Photos</h2>
                  {allPhotosData.map((photo, index) => (
                    <PhotoCard photoData={photo} />
                  ))}
                </>
              )}
            </MDBRow>
          </MDBContainer>
        </main>
      </div>
    </MDBContainer>
  );
}

export default FeaturedPage;
