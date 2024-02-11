import React, { useEffect } from "react";
import { MDBContainer, MDBRow } from "mdb-react-ui-kit";
import ModelCard from "../components/ModelCard";
import PhotoCard from "../components/PhotoCard";
import allUserData from "../data/users/all.json";
import allModelsData from "../data/models/all.json";

function FeaturedPage() {

  useEffect(() => {
      (document.title = "Featured Styles");
  }, []);

  console.log(allModelsData)
  return (
      <MDBContainer fluid>
        <div className="row mt-3">
          {/* <div className="col-md-3 d-none d-md-block bg-light sidebar">
            NAVIGATION BAR OR SECTION NAV GOES HERE
          </div> */}
          {/* <main role="main" className="col-md-9 ms-sm-auto col-lg-9 px-md-4"> */}
          <main role="main" className="col-md-12 ms-sm-auto col-lg-12 px-md-4">
            <MDBContainer fluid className="mt-5">
              {/* Most Popular Models */}
              <MDBRow>
                {allModelsData &&
                  allModelsData.length > 0 && (
                    <>
                      <h2 className="mb-4">Featured Stylists</h2>
                      {allModelsData.map((model, index) => (
                        <ModelCard modelData={model} />
                      ))}
                    </>
                  )}
              </MDBRow>
              {/* Photos (User's) */}
              <MDBRow>
                {/* {userProfileData.ownPhotos &&
                  userProfileData.ownPhotos.length > 0 && (
                    <>
                      <h2 className="mb-4">Featured</h2>
                      {userProfileData.ownPhotos.map((photo, index) => (
                        <PhotoCard photoData={photo} />
                      ))}
                    </>
                  )} */}
              </MDBRow>
            </MDBContainer>
          </main>
        </div>
      </MDBContainer>
  );
}


export default FeaturedPage;
