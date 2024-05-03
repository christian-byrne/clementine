import React, { useState } from "react";
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
          {stylistData.badges &&
            stylistData.badges.length > 0 &&
            stylistData.badges.map((badge, index) => (
              <span key={index} className="badge badge-secondary me-2 mb-2">
                {badge}
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
          <MDBCardText>{stylistData.description}</MDBCardText>
          <MDBCardText>
            {stylistData.requirements && (
              <>
                <MDBTypography tag="small" className="text-muted">
                  REQUIRES&nbsp;&nbsp;
                </MDBTypography>
                {stylistData.requirements}
              </>
            )}
          </MDBCardText>
        </MDBCollapse>
      </>
    )
  );
}

export default StylistCardText;
