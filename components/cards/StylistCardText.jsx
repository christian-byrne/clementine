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
          href={`/browse/stylists/${stylistData.titleSystemName}`}
          // prevent blue hyperlink color
          style={{ color: "inherit" }}
        >
          <MDBCardTitle>{stylistData.title}</MDBCardTitle>
        </a>
        <div className="mb-3">
          {stylistData.badges?.length > 0 &&
            stylistData.badges
              .slice(
                0,
                windowWidth < 576
                  ? 3
                  : windowWidth < 768
                  ? 2
                  : windowWidth < 1600
                  ? 4
                  : windowWidth < 1800
                  ? 1
                  : windowWidth < 3200
                  ? 2
                  : windowWidth < 3920
                  ? 3
                  : Infinity
              )
              .map((badge, index) => (
                <span key={index} className="badge badge-secondary me-2 mb-2">
                  {badge.charAt(0).toUpperCase() + badge.slice(1)}
                </span>
              ))}
        </div>
        {/* Community Unlock */}
        {stylistData.communityUnlock &&
          stylistData.communityUnlock.goal &&
          stylistData.communityUnlock.progress && (
            <MDBCardText className="text-muted">
              <MDBTypography tag="strong">
                {stylistData.communityUnlock.progress}/
                {stylistData.communityUnlock.goal}
              </MDBTypography>
              {getIcon.createIcon("mainCurrency")}
              {stylistData.communityUnlock.message &&
                stylistData.communityUnlock.message}
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
