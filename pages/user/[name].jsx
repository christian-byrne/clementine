import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { MDBContainer, MDBRow } from "mdb-react-ui-kit";
import UserProfileSidebar from "@/components/sidebars/user-profile/UserProfileSidebar";
import StylistCard from "@/components/cards/StylistCard";
import TitleText from "@/components/title-text/TitleText";
import PhotoCard from "@/components/cards/PhotoCard";
import formatDocTitle from "@/utils/formatDocTitle";

function UserProfilePage() {
  const router = useRouter();
  const [userProfileData, setUserProfileData] = useState(null);
  const [userPhotos, setUserPhotos] = useState([]);
  const [userStylists, setUserStylists] = useState([]);

  useEffect(() => {
    if (router.query.name) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `/api/get/user/byName?userSystemName=${router.query.name}`
          );
          const data = await response.json();
          setUserProfileData(data);

        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchData();
    }
  }, [router.query.name]);

  useEffect(() => {
    if (userProfileData?.id) {
      const fetchStylists = async () => {
        try {
          if (userProfileData?.ownmodels?.length > 0) {
            const stylistResponse = await fetch(
              `/api/get/user/stylists?userId=${userProfileData.id}`
            );
            const stylistData = await stylistResponse.json();
            setUserStylists(stylistData);
          }

        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchStylists();
    }
  }, [userProfileData]);


    useEffect(() => {
      if (userProfileData?.id) {
      const fetchPhotos = async () => {
        try {

          const photoResponse = await fetch(
            `/api/get/photos/byCreatorId?creatorId=${userProfileData.id}`
          );
          const photoData = await photoResponse.json();
          setUserPhotos(photoData);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchPhotos();
    }
  }, [userProfileData]);

  useEffect(() => {
    if (userProfileData) {
      formatDocTitle(userProfileData.username || "User Profile");
    }
  }, [userProfileData]);

  return (
    <MDBContainer fluid>
      <div className="row mt-4">
        <div className="col-md-3 d-none d-md-block bg-light sidebar">
          {userProfileData?.name && (
            <UserProfileSidebar userData={userProfileData} />
          )}
        </div>
        <main role="main" className="col-md-9 ms-sm-auto col-lg-9 px-md-4">
          <MDBContainer fluid className="mt-3">
            <MDBRow>
              {userStylists?.length > 0 && (
                <>
                  <TitleText text="Pinned Stylists" />
                  {userStylists.map((stylist, index) => (
                    <StylistCard
                      data={stylist}
                      key={index}
                      detailsStartExpanded={false}
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
