import React, { useState, useEffect } from "react";
import {
  MDBCardTitle,
  MDBCardText,
  MDBTypography,
  MDBBadge,
  MDBIcon,
  MDBCollapse,
} from "mdb-react-ui-kit";
import IconGenerator from "@/utils/getIcon";
import TagBadges from "@/components/badges/TagBadges";

const getIcon = new IconGenerator();

function StylistCardText({ stylistData, textExpandedState = false }) {
  const [windowWidth, setWindowWidth] = useState(1200);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [windowWidth]);

  return (
    textExpandedState !== undefined && (
      <>
        <a
          href={`/browse/stylists/${stylistData.titlesystemname}`}
          // prevent blue hyperlink color
          style={{ color: "inherit" }}
        >
          <MDBCardTitle>{stylistData.title}</MDBCardTitle>
        </a>
        <div className="mb-3">
          <TagBadges badgesData={stylistData.badges} windowWidth={windowWidth} breakpoints={{
            576: 3,
            768: 2,
            1600: 4,
            1800: 1,
            3200: 2,
            3920: 3
          }} />
        </div>
        {/* Community unlock */}
        {stylistData.communityunlock &&
          stylistData.communityunlock.goal &&
          stylistData.communityunlock.progress && (
            <MDBCardText className="text-muted">
              <MDBTypography tag="strong">
                {stylistData.communityunlock.progress}/
                {stylistData.communityunlock.goal}
              </MDBTypography>
              {getIcon.createIcon("mainCurrency")}
              {stylistData.communityunlock.message &&
                stylistData.communityunlock.message}
            </MDBCardText>
          )}
        {/* Bounty Offers */}
        {stylistData.bounties && stylistData.bounties.status && (
          <MDBCardText className="text-muted">
            <MDBBadge color="primary me-2 mt-0">
              <MDBIcon icon="search-dollar" />
              &nbsp;
              {stylistData.bounties.status}
            </MDBBadge>
            {stylistData.bounties.message && stylistData.bounties.message}
            &nbsp;
            {stylistData.bounties.reward &&
              "for " + stylistData.bounties.reward}
            {getIcon.createIcon("mainCurrency")}
          </MDBCardText>
        )}

        <MDBCollapse open={textExpandedState}>
          <MDBCardText>
            {stylistData.description
              .split(" ")
              .slice(0, 30)
              .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
              .join(" ").slice(0, -1) + "..."}
          </MDBCardText>
          <MDBCardText>
            {stylistData.requirements?.length > 0 && (
              <>
                <MDBTypography tag="small" className="text-muted">
                  REQUIRES&nbsp;&nbsp;
                </MDBTypography>
                {stylistData.requirements.map((item) => item.charAt(0).toUpperCase() + item.slice(1)).join(", ")}
              </>
            )}
          </MDBCardText>
        </MDBCollapse>
      </>
    )
  );
}

export default StylistCardText;
