import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import UserProfileSidebar from "../../components/UserProfileSidebar";
import { MDBContainer, MDBRow } from "mdb-react-ui-kit";
import ModelCard from "../../components/ModelCard";
import PhotoCard from "../../components/PhotoCard";
import allUserData from "../../data/users/all.json";
import allModelsData from "../../data/models/all.json";
import allPhotosData from "../../data/photos/all.json";
import { getOneUser } from "../../utils/getOneUser";
import pathFormat from "@/utils/pathFormat";

function getModelByName(modelName) {
  if (typeof modelName !== "string") {
    // If modelName is not a string, return null or handle it appropriately
    return null;
  }
  return allModelsData.find((model) => model.titleSystemName === modelName);
}

function UserProfilePage() {
  const router = useRouter();
  const [userProfileData, setUserProfileData] = useState(null);
  const [userPhotos, setUserPhotos] = useState([]);
  const [userModels, setUserModels] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const userName = router.query.name;
      if (userName) {
        try {
          const data = await getOneUser(allUserData, userName);
          setUserProfileData(data);

          // Fetch and process user models asynchronously if ownModels and ownModels.length > 0
          if (!data.ownModels || data.ownModels.length === 0) {
            return;
          }

          const userModelsPromises = data.ownModels.map(async (modelName) => {
            try {
              const model = await getModelByName(modelName);
              return model; // Assuming getModelByName returns a model object
            } catch (error) {
              console.error("Error fetching user model:", error);
              // Handle error if necessary
            }
          });
          const userModels = await Promise.all(userModelsPromises);

          setUserModels(userModels.filter((model) => model !== null));

          const filteredPhotos = allPhotosData.filter((photo) => {
            if (data.ownModels.includes(photo.modelDirName)) {
              return true;
            }
          });

          setUserPhotos(filteredPhotos);
        } catch (error) {
          console.error("Error fetching user data:", error);
          // Handle error if necessary
        }
      }
    }

    fetchData();
  }, [router.query.name]);

  useEffect(() => {
    if (userProfileData) {
      document.title = `${userProfileData.username || ""} | WD`;
    }
  }, [userProfileData]);

  if (!userProfileData) {
    return null; // Or loading indicator, error message, etc.
  }

  return (
    <MDBContainer fluid>
      <div className="row mt-3">
        <div className="col-md-3 d-none d-md-block bg-light sidebar">
          <UserProfileSidebar userData={userProfileData} />
        </div>
        <main role="main" className="col-md-9 ms-sm-auto col-lg-9 px-md-4">
          <MDBContainer fluid className="mt-5">
            <MDBRow>
              {userModels?.length > 0 && (
                <>
                  <h2 className="mb-4">Most Popular Stylists</h2>
                  {userModels.map((model, index) => (
                    <ModelCard modelData={model} key={index} />
                  ))}
                </>
              )}
            </MDBRow>
            <MDBRow>
              {userPhotos?.length > 0 && (
                <>
                  <h2 className="mb-4">Photos</h2>
                  {userPhotos.map((photo, index) => (
                    <PhotoCard photoData={photo} key={index} />
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

export default UserProfilePage;
