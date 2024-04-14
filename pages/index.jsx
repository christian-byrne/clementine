import React, { useEffect, useState } from "react";
import { MDBRow, MDBContainer, MDBCol } from "mdb-react-ui-kit";
import ContentRow from "@/components/content-row/ContentRow";
import LeaderBoardCard from "@/components/cards/LeaderBoardCard";
import StylistCard from "@/components/cards/StylistCard";
import PhotoCard from "@/components/cards/PhotoCard";
import TitleText from "@/components/title-text/TitleText";
import allStylistsData from "@/data/stylists/all.json";
import allPhotosData from "@/data/photos/all.json";
import allUserData from "@/data/users/all.json";
import getBreakpoint from "@/utils/getBreakpoint";
import sortRecordsByKey from "@/utils/sortRecordsByKey";

function HomePage() {
  useEffect(() => {
    document.title = "StyleThis";
  }, []);

  const [nCols, setNCols] = useState(6);
  const [breakpoint, setBreakpoint] = useState("lg");

  const adjustNCols = () => {
    const windowWidth = window.innerWidth;
    const breakpoint = getBreakpoint(windowWidth);
    const colSizeMap = {
      sm: 1,
      md: 3,
      lg: 3,
      xl: 4,
      xxl: 4,
    };
    setNCols(colSizeMap[breakpoint]);
    setBreakpoint(breakpoint);
  };

  useEffect(() => {
    adjustNCols();
    const handleResize = () => {
      adjustNCols();
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <MDBContainer fluid>
      <MDBRow className="mt-3">
        {/* Content Rows */}
        <MDBCol
          className={
            breakpoint == "sm" || breakpoint == "md" || breakpoint == "lg"
              ? "col-12 ms-sm-auto pe-2"
              : "col-7 ms-sm-auto pe-2"
          }
        >
          <MDBContainer fluid className="mt-4">
            {/* Featured Models Row */}
            <TitleText text="Featured Stylists" />
            <ContentRow
              colComponent={StylistCard}
              colData={allStylistsData}
              sortKey="rating"
              showFirstNCols={nCols}
              maxCols={30}
              colContainerClass={
                "col-sm 12 col-md-4 col-lg-4 col-xl-3 mb-4 px-xl-2"
              }
              detailsStartExpanded={false}
            />
            {/* Featured Photos Row */}
            <TitleText text="Featured Photos" />
            <ContentRow
              colComponent={PhotoCard}
              colData={allPhotosData}
              sortKey="likes"
              showFirstNCols={32}
              maxCols={50}
              colContainerClass={
                "col-md-6 col-lg-4 col-sm-12 col-xxl-3 mb-4 mx-0 px-xl-2"
              }
            />
          </MDBContainer>
        </MDBCol>
        {/* Leaderboard Preview */}
        {breakpoint != "md" && breakpoint != "sm" && breakpoint != "lg" && (
          <MDBCol className="col-5 ms-sm-auto">
            <MDBContainer fluid className="mt-4">
              {/* <TitleText text="Leaderboards" /> */}
              <LeaderBoardCard
                leaderBoardName={"Style Stars"}
                description={"Users who have the most motion"}
                leaderBoardData={sortRecordsByKey(allUserData, "views")}
                visibleColumns={["views"]}
                maxRows={9}
                socialBadges={
                  nCols == 1
                    ? ["likes"]
                    : nCols < 5
                    ? ["favorites", "likes"]
                    : ["downloads", "likes", "favorites"]
                }
                containerClassName="col-12 my-3 mx-0 px-0"
              />
              <LeaderBoardCard
                leaderBoardName={"Who to Follow"}
                description={"Users who have make great content"}
                leaderBoardData={sortRecordsByKey(allUserData, "modelCount")}
                visibleColumns={["modelCount"]}
                maxRows={9}
                socialBadges={
                  nCols == 1
                    ? ["avergageRating"]
                    : nCols < 5
                    ? ["averageRating", "totalRatings", "downloads"]
                    : [
                        "averageRating",
                        "totalRatings",
                        "downloads",
                        "favorites",
                      ]
                }
                containerClassName="col-12 my-3 mx-0 px-0"
              />
              <LeaderBoardCard
                leaderBoardName={"Most Influential"}
                description={
                  "Users with the most downloads and used suggestions"
                }
                leaderBoardData={sortRecordsByKey(allUserData, "downloads")}
                visibleColumns={["location"]}
                maxRows={12}
                socialBadges={
                  nCols == 1
                    ? ["downloads"]
                    : nCols < 5
                    ? ["favorites", "downloads"]
                    : ["downloads", "favorites", "views"]
                }
                containerClassName="col-12 my-3 mx-0 px-0"
              />
              <LeaderBoardCard
                leaderBoardName={"Most Decorated"}
                description={
                  "Users with the most badges, titles, and achievements"
                }
                leaderBoardData={sortRecordsByKey(allUserData, "badgeCount")}
                visibleColumns={["badgeCount"]}
                maxRows={13}
                socialBadges={
                  nCols == 1
                    ? ["likes"]
                    : nCols < 5
                    ? ["favorites", "likes"]
                    : ["downloads", "likes", "favorites"]
                }
                containerClassName="col-12 my-3 mx-0 px-0"
              />
            </MDBContainer>
          </MDBCol>
        )}
      </MDBRow>
    </MDBContainer>
  );
}

export default HomePage;
