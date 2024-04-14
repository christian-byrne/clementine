import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { MDBContainer, MDBRow } from "mdb-react-ui-kit";
import UserProfileSidebar from "@/components/sidebars/user-profile/UserProfileSidebar";
import StylistCard from "@/components/cards/StylistCard";
import TitleText from "@/components/title-text/TitleText";
import PhotoCard from "@/components/cards/PhotoCard";
import allUserData from "@/data/users/all.json";
import allStylistsData from "@/data/stylists/all.json";
import allPhotosData from "@/data/photos/all.json";
import { getOneUser } from "@/utils/getOneUser";

function getStylistByName(stylistName) {
  if (typeof stylistName !== "string") {
    // If stylistName is not a string, return null or handle it appropriately
    return null;
  }
  return allStylistsData.find(
    (stylist) => stylist.titleSystemName === stylistName
  );
}

function UserProfilePage() {
  const router = useRouter();
  const [userProfileData, setUserProfileData] = useState(null);
  const [userPhotos, setUserPhotos] = useState([]);
  const [userStylists, setUserStylists] = useState([]);

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

          const userStylistsPromises = data.ownModels.map(
            async (stylistName) => {
              try {
                const stylist = await getStylistByName(stylistName);
                return stylist; // Assuming getStylistByName returns a model object
              } catch (error) {
                console.error("Error fetching user stylist:", error);
                // Handle error if necessary
              }
            }
          );
          const userStylists = await Promise.all(userStylistsPromises);

          setUserStylists(userStylists.filter((stylist) => stylist !== null));

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
      document.title = `${userProfileData.username || "User Profile"} | WD`;
    }
  }, [userProfileData]);

  if (!userProfileData) {
    return null; // Or loading indicator, error message, etc.
  }

  console.log(userStylists);

  return (
    <MDBContainer fluid>
      <div className="row mt-3">
        <div className="col-md-3 d-none d-md-block bg-light sidebar">
          <UserProfileSidebar userData={userProfileData} />
        </div>
        <main role="main" className="col-md-9 ms-sm-auto col-lg-9 px-md-4">
          <MDBContainer fluid className="mt-5">
            <MDBRow>
              {userStylists?.length > 0 && (
                <>
                  <TitleText text="Pinned Stylists" />
                  {userStylists.map((stylist, index) => (
                    <StylistCard data={stylist} key={index} 
                    detailsStartExpanded={true}
                    />
                  ))}
                </>
              )}
            </MDBRow>
            <MDBRow>
              {userPhotos?.length > 0 && (
                <>
                  <TitleText text="Photos" />
                  {userPhotos.map((photo, index) => (
                    <PhotoCard data={photo} key={index} />
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
