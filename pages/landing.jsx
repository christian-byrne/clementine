import React, { useEffect, useState } from "react";
import { MDBContainer, MDBRow, MDBBtn } from "mdb-react-ui-kit";
import StylistCard from "../components/cards/StylistCard";
import PhotoCard from "../components/cards/PhotoCard";
import allModelsData from "../data/models/all.json";
import allPhotosData from "../data/photos/all.json";
import sortRecordsByKey from "@/utils/sortModelsByKey";

function LandingPage() {
  useEffect(() => {
    document.title = "Featured Styles";
  }, []);

  const [modelsExpanded, setModelsExpanded] = useState(false);
  const [photosExpanded, setPhotosExpanded] = useState(false);
  const allModelsDataSorted = sortRecordsByKey(allModelsData, "rating");
  const initialModels = allModelsDataSorted.slice(0, 6);
  const remainingModels = allModelsDataSorted.slice(6);
  const initialPhotos = allPhotosData.slice(0, 12);
  const remainingPhotos = allPhotosData.slice(12, 50);

  const toggleModelsExpansion = () => {
    setModelsExpanded(!modelsExpanded);
  };
  const togglePhotosExpansion = () => {
    setPhotosExpanded(!photosExpanded);
  };

  return (
    <MDBContainer fluid>
      <div className="row mt-3">
        <main role="main" className="col-md-12 ms-sm-auto col-lg-12 px-md-4">
          <MDBContainer fluid className="mt-5">
            {/* Featured Models */}
            <MDBRow>
              {initialModels.length > 0 && (
                <>
                  <h2 className="mb-4">Featured Stylists</h2>
                  {initialModels.map((model, index) => (
                    <StylistCard key={index} modelData={model} />
                  ))}
                </>
              )}
              {remainingModels.length > 0 && (
                <>
                  <div
                    style={{
                      display: modelsExpanded ? "flex" : "none",
                      flexWrap: "wrap",
                    }}
                  >
                    {remainingModels.map((model, index) => (
                      <StylistCard
                        key={index + initialModels.length}
                        modelData={model}
                      />
                    ))}
                  </div>
                  <MDBContainer className="d-flex justify-content-center mt-0 mb-3">
                    <MDBBtn
                      onClick={toggleModelsExpansion}
                      size="sm"
                      color="secondary"
                    >
                      {modelsExpanded ? "Show Less" : "Show More"}
                    </MDBBtn>
                  </MDBContainer>
                </>
              )}
            </MDBRow>
            {/* Featured Photos */}
            <MDBRow>
              {initialPhotos.length > 0 && (
                <>
                  <h2 className="mb-4">Featured Photos</h2>
                  {initialPhotos.map((photo, index) => (
                    <PhotoCard key={index} photoData={photo} />
                  ))}
                </>
              )}
              {remainingPhotos.length > 0 && (
                <>
                  <div
                    style={{
                      display: photosExpanded ? "flex" : "none",
                      flexWrap: "wrap",
                    }}
                  >
                    {remainingPhotos.map((photo, index) => (
                      <PhotoCard
                        key={index + initialPhotos.length}
                        photoData={photo}
                      />
                    ))}
                  </div>
                  <MDBContainer className="d-flex justify-content-center mt-0 mb-3">
                    <MDBBtn
                      onClick={togglePhotosExpansion}
                      size="sm"
                      color="secondary"
                    >
                      {photosExpanded ? "Show Less" : "Show More"}
                    </MDBBtn>
                  </MDBContainer>
                </>
              )}
            </MDBRow>
          </MDBContainer>
        </main>
      </div>
    </MDBContainer>
  );
}

export default LandingPage;
