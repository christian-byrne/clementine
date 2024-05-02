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

function BlogCardText({ blogData, textExpandedState }) {

  return (
    <>
      <a
        href={blogData.path}
        // prevent blue hyperlink color
        style={{ color: "inherit" }}
      >
        <MDBCardTitle>{blogData.title}</MDBCardTitle>
      </a>
      <div className="mb-3">
        {blogData.badges &&
          blogData.badges.length > 0 &&
          blogData.badges.map((badge, index) => (
            <span key={index} className="badge badge-secondary me-2 mb-2">
              {badge}
            </span>
          ))}
      </div>
      {/* Community Unlock */}
      {blogData.communityUnlock &&
        blogData.communityUnlock.goal &&
        blogData.communityUnlock.progress && (
          <MDBCardText className="text-muted">
            <MDBTypography tag="strong">
              {blogData.communityUnlock.progress}/
              {blogData.communityUnlock.goal}
            </MDBTypography>
            {getIcon.createIcon("mainCurrency")}
            {blogData.communityUnlock.message &&
              blogData.communityUnlock.message}
          </MDBCardText>
        )}
      {/* Bounty Offers */}
      {blogData.bounties && blogData.bounties.status && (
        <MDBCardText className="text-muted">
          <MDBBadge color="primary me-2 mt-0">
            <MDBIcon icon="search-dollar" />
            &nbsp;
            {blogData.bounties.status}
          </MDBBadge>
          {blogData.bounties.message && blogData.bounties.message}
          &nbsp;
          {blogData.bounties.reward && "for " + blogData.bounties.reward}
          {getIcon.createIcon("mainCurrency")}
        </MDBCardText>
      )}

      <MDBCollapse open={textExpandedState}>
        <MDBCardText>{blogData.description}</MDBCardText>
        <MDBCardText>
          {blogData.requirements && (
            <>
              <MDBTypography tag="small" className="text-muted">
                REQUIRES&nbsp;&nbsp;
              </MDBTypography>
              {blogData.requirements}
            </>
          )}
        </MDBCardText>
      </MDBCollapse>
    </>
  );
}

export default BlogCardText;
