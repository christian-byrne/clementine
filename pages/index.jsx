import React, { useEffect, useState } from "react";
import { MDBRow, MDBContainer, MDBCol } from "mdb-react-ui-kit";
import LeaderBoardCard from "@/components/cards/LeaderBoardCard";
import StylistCard from "@/components/cards/StylistCard";
import PhotoCard from "@/components/cards/PhotoCard";
import TitleText from "@/components/title-text/TitleText";
import allUserData from "@/data/users/all.json";
import Breakpoints from "@/utils/breakpoints";
import sortRecordsByKey from "@/utils/sortRecordsByKey";
import formatDocTitle from "@/utils/formatDocTitle";
import PhotosRow from "@/components/content-row/PhotosRow";
import StylistsRow from "@/components/content-row/StylistsRow";

function HomePage() {
  useEffect(() => {
    document.title = formatDocTitle(null);
  }, []);

  const [breakpoint, setBreakpoint] = useState("lg");
  const [colCSSClass, setColCSSClass] = useState("col-12 ms-sm-auto pe-2");
  const [leaderBoardsHidden, setLeaderBoardsHidden] = useState(false);
  const [leaderBoardVisibleCols, setLeaderBoardVisibleCols] = useState(1);
  const [contentRowsClass, setContentRowsClass] = useState(
    "col-9 ms-sm-auto pe-2"
  );
  const [leaderBoardClass, setLeaderBoardClass] = useState("col-5 ms-sm-auto");
  const [stylistData, setStylistData] = useState(null);

  useEffect(() => {
    const fetchFeaturedStylists = async () => {
      try {
        const response = await fetch("/api/get/stylists/n-stylists?n=30");
        const data = await response.json();
        setStylistData(data);
      } catch (error) {
        console.error("Error fetching featured stylists:", error);
      }
    };
    fetchFeaturedStylists();
  }, []);

  const breakpointsConfig = new Breakpoints({
    xs: {
      visibleRows: 7,
      cols: 12,
    },
    sm: {
      visibleRows: 5,
      cols: 12,
    },
    md: {
      visibleRows: 4,
      cols: 12,
    },
    lg: {
      visibleRows: 3,
      cols: 6,
    },
    xl: {
      visibleRows: 2,
      cols: 6,
    },
    xxl: {
      visibleRows: 2,
      cols: 6,
    },
    xxxl: {
      visibleRows: 2,
      cols: 6,
    },
    wi: {
      visibleRows: 2,
      cols: 6,
    },
    "wi+": {
      visibleRows: 2,
      cols: 6,
    },
    "2k": {
      visibleRows: 2,
      cols: 6,
    },
    "2k+": {
      visibleRows: 2,
      cols: 4,
    },
    "3k": {
      visibleRows: 2,
      cols: 4,
    },
    "3k+": {
      visibleRows: 2,
      cols: 4,
    },
    "3k++": {
      visibleRows: 2,
      cols: 3,
    },
    "4k": {
      visibleRows: 2,
      cols: 3,
    },
    "8k": {
      visibleRows: 2,
      cols: 2,
    },
  });

  const updateColCSSClass = () => {
    if (!breakpointsConfig.isStandard(breakpoint)) {
      setColCSSClass(`col-${breakpointsConfig[breakpoint].cols} mb-4 px-xl-2`);
    } else {
      setColCSSClass(breakpointsConfig.standardSizeClass);
    }
  };

  const updateLeaderBoards = () => {
    if (breakpointsConfig.isLess(breakpoint, "wi")) {
      setLeaderBoardsHidden(true);
      setContentRowsClass("col-xl-12 ms-sm-auto pe-2");
    } else if (breakpointsConfig.isLess(breakpoint, "3k")) {
      setLeaderBoardsHidden(false);
      setContentRowsClass("col-7 ms-sm-auto pe-2");
      setLeaderBoardClass("col-5 ms-sm-auto");
      setLeaderBoardVisibleCols(1);
    } else if (breakpointsConfig.isLess(breakpoint, "4k")) {
      setLeaderBoardsHidden(false);
      setContentRowsClass("col-7 ms-sm-auto pe-2");
      setLeaderBoardClass("col-5 ms-sm-auto");
      setLeaderBoardVisibleCols(2);
    } else {
      setLeaderBoardsHidden(false);
      setContentRowsClass("col-8 ms-sm-auto pe-2");
      setLeaderBoardClass("col-4 ms-sm-auto");
      setLeaderBoardVisibleCols(3);
    }
  };

  useEffect(() => {
    setBreakpoint(breakpointsConfig.getBreakpointName(window.innerWidth));
    updateColCSSClass();
    updateLeaderBoards();
    const handleResize = () => {
      setBreakpoint(breakpointsConfig.getBreakpointName(window.innerWidth));
      updateColCSSClass();
      updateLeaderBoards();
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [breakpoint]);

  return (
    <MDBContainer fluid>
      <MDBRow className="mt-3">
        {/* Content Preview */}
        <MDBCol className={contentRowsClass}>
          <MDBContainer fluid className="mt-4">
            <TitleText text="Featured Stylists" />
            <StylistsRow
              colComponent={StylistCard}
              colClassName={colCSSClass}
              initialVisibleNum={
                breakpointsConfig[breakpoint].visibleRows *
                (12 / breakpointsConfig[breakpoint].cols)
              }
              maxNum={20}
              colData={stylistData}
              sortField={"rating"}
              sortOrder={"DESC"}
              detailsStartExpanded={false}
            />
            <TitleText text="Featured Photos" />
            <PhotosRow
              colComponent={PhotoCard}
              colClassName={colCSSClass}
              initialVisibleNum={
                breakpointsConfig[breakpoint].visibleRows *
                (12 / breakpointsConfig[breakpoint].cols) *
                4
              }
              maxRequested={30}
              sortField={"likes"}
              sortOrder={"DESC"}
            />
          </MDBContainer>
        </MDBCol>
        {/* Leaderboard Preview */}
        {!leaderBoardsHidden && (
          <MDBCol className={leaderBoardClass}>
            <MDBContainer className="mt-4">
              <LeaderBoardCard
                leaderBoardName={"Style Stars"}
                description={"Users who have the most motion"}
                leaderBoardData={sortRecordsByKey(allUserData, "views")}
                visibleColumns={["views"]}
                maxRows={9}
                socialBadges={["likes", "favorites", "downloads"].slice(
                  0,
                  leaderBoardVisibleCols
                )}
                containerClassName="col-12 my-3 mx-0 px-0"
              />
              <LeaderBoardCard
                leaderBoardName={"Who to Follow"}
                description={"Users who have make great content"}
                leaderBoardData={sortRecordsByKey(allUserData, "modelCount")}
                visibleColumns={["modelCount"]}
                maxRows={9}
                socialBadges={[
                  "averageRating",
                  "totalRatings",
                  "downloads",
                  "favorites",
                ].slice(0, leaderBoardVisibleCols)}
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
                socialBadges={["downloads", "favorites", "views"].slice(
                  0,
                  leaderBoardVisibleCols
                )}
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
                socialBadges={["downloads", "likes", "favorites"].slice(
                  0,
                  leaderBoardVisibleCols
                )}
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
