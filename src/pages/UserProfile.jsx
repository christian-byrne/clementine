import React, { useEffect } from "react";
import UserProfileSidebar from "../components/UserProfileSidebar";
import { MDBContainer, MDBRow } from "mdb-react-ui-kit";
import ModelCard from "../components/ModelCard";
import PhotoCard from "../components/PhotoCard";
import allUserData from "../data/users/all.json";
import { useParams } from "react-router-dom";
import { getOneUser } from "../utils/getOneUser";

function UserProfilePage() {
  useEffect(() => {
    userProfileData && (document.title = "Profile | " + userProfileData.username || "");
  }, []);

  const { name } = useParams();
  const userProfileData = getOneUser(allUserData, name);

  console.log("userProfileData", userProfileData);
  return (
    userProfileData && (
      <MDBContainer fluid>
        <div className="row mt-3">
          <div className="col-md-3 d-none d-md-block bg-light sidebar">
            <UserProfileSidebar userData={userProfileData} />
          </div>
          <main role="main" className="col-md-9 ms-sm-auto col-lg-9 px-md-4">
            <MDBContainer fluid className="mt-5">
              {/* Most Popular Models */}
              <MDBRow>
                <h2 className="mb-4">Most Popular Stylists</h2>
                {userProfileData.models &&
                  userProfileData.models.length > 0 &&
                  userProfileData.models.map((model, index) => (
                    <ModelCard modelData={model} />
                  ))}
              </MDBRow>
              {/* Photos (User's) */}
              <MDBRow>
                <h2 className="mb-4">Photos</h2>
                {userProfileData.ownPhotos &&
                  userProfileData.ownPhotos.length > 0 &&
                  userProfileData.ownPhotos.map((photo, index) => (
                    <PhotoCard photoData={photo} />
                  ))}
              </MDBRow>
            </MDBContainer>
          </main>
        </div>
      </MDBContainer>
    )
  );
}

export default UserProfilePage;
