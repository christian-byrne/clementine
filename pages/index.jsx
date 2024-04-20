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
import Breakpoints from "@/utils/breakpoints";
import sortRecordsByKey from "@/utils/sortRecordsByKey";

function HomePage() {
  useEffect(() => {
    document.title = "StyleThis";
  }, []);

  const [nCols, setNCols] = useState(6);
  const [breakpoint, setBreakpoint] = useState("lg");
  const [colCSSClass, setColCSSClass] = useState("col-12 ms-sm-auto pe-2");
  const [leaderBoardsHidden, setLeaderBoardsHidden] = useState(false);
  const [leaderBoardVisibleCols, setLeaderBoardVisibleCols] = useState(1);
  const [contentRowsClass, setContentRowsClass] = useState(
    "col-9 ms-sm-auto pe-2"
  );

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
      cols: 4,
    },
    wi: {
      visibleRows: 2,
      cols: 4,
    },
    "wi+": {
      visibleRows: 2,
      cols: 4,
    },
    "2k": {
      visibleRows: 2,
      cols: 3,
    },
    "2k+": {
      visibleRows: 2,
      cols: 3,
    },
    "3k+": {
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
    }
  });

  const updateColCSSClass = () => {
    if (!breakpointsConfig.isStandard(breakpoint)) {
      setColCSSClass(
        `col-${breakpointsConfig[breakpoint].cols} mb-4 px-xl-2`
      );
    } else {
      setColCSSClass(breakpointsConfig.standardSizeClass);
    }
  };

  const adjustNCols = () => {
    const windowWidth = window.innerWidth;
    const breakpoint = breakpointsConfig.getBreakpointName(windowWidth);
    setNCols(12 / breakpointsConfig[breakpoint].cols);
    setBreakpoint(breakpoint);
  };

  const adjustVisibleLeaderBoardCols = () => {
    if (breakpointsConfig.isLess(breakpoint, "lg")) {
      setLeaderBoardVisibleCols(1);
    } else if (breakpointsConfig.isLess(breakpoint, "2k++")) {
      setLeaderBoardVisibleCols(2);
    } else {
      setLeaderBoardVisibleCols(3);
    }

  const updateLeaderBoardsHidden = () => {
    if (breakpointsConfig.isGreater(breakpoint, "lg")) {
      setLeaderBoardsHidden(false);
      setContentRowsClass("col-xl-7 ms-sm-auto pe-2");
    } else {
      setLeaderBoardsHidden(true);
      setContentRowsClass("col-12 ms-sm-auto pe-2");
    }
  };

  useEffect(() => {
    adjustNCols();
    updateColCSSClass();
    updateLeaderBoardsHidden();
    const handleResize = () => {
      adjustNCols();
      updateColCSSClass();
      updateLeaderBoardsHidden();
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [breakpoint, nCols]);

  return (
    <MDBContainer fluid>
      <MDBRow className="mt-3">
        {/* Content Rows */}
        <MDBCol className={contentRowsClass}>
          <MDBContainer fluid className="mt-4">
            {/* Featured Models Row */}
            <TitleText text="Featured Stylists" />
            <ContentRow
              colComponent={StylistCard}
              colData={allStylistsData}
              sortKey="rating"
              showFirstNCols={
                breakpointsConfig[breakpoint].visibleRows *
                (12 / breakpointsConfig[breakpoint].cols)
              }
              maxCols={30}
              colContainerClass={colCSSClass}
              detailsStartExpanded={breakpointsConfig.isGreater(breakpoint, "2k")}
            />
            {/* Featured Photos Row */}
            <TitleText text="Featured Photos" />
            <ContentRow
              colComponent={PhotoCard}
              colData={allPhotosData}
              sortKey="likes"
              showFirstNCols={32}
              maxCols={50}
              colContainerClass={colCSSClass}
              detailsStartExpanded={breakpointsConfig.isGreater(breakpoint, "2k")}
            />
          </MDBContainer>
        </MDBCol>
        {/* Leaderboard Preview */}
        {!leaderBoardsHidden && (
          <MDBCol className="col-5 ms-sm-auto">
            {/* <MDBCol className="ms-sm-auto"> */}
            <MDBContainer className="mt-4">
              {/* <TitleText text="Leaderboards" /> */}
              <LeaderBoardCard
                leaderBoardName={"Style Stars"}
                description={"Users who have the most motion"}
                leaderBoardData={sortRecordsByKey(allUserData, "views")}
                visibleColumns={["views"]}
                maxRows={9}
                socialBadges={
                    ["likes", "favorites", "downloads"].slice(0, leaderBoardVisibleCols)
                }
                containerClassName="col-12 my-3 mx-0 px-0"
              />
              <LeaderBoardCard
                leaderBoardName={"Who to Follow"}
                description={"Users who have make great content"}
                leaderBoardData={sortRecordsByKey(allUserData, "modelCount")}
                visibleColumns={["modelCount"]}
                maxRows={9}
                socialBadges={[ "averageRating", "totalRatings", "downloads", "favorites"].slice(0, leaderBoardVisibleCols)
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
                  breakpointsConfig.isLess(breakpoint, "lg")
                    ? ["downloads"]
                    : breakpointsConfig.isLess(breakpoint, "3k")
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
                    ["downloads", "likes", "favorites"].slice(0, leaderBoardVisibleCols)
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
