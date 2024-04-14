import React from "react";
import {
  MDBCardTitle,
  MDBCardText,
  MDBTypography,
  MDBBadge,
  MDBIcon,
} from "mdb-react-ui-kit";
import IconGenerator from "../../utils/getIcon";

const getIcon = new IconGenerator();

function ModelCardText({ modelData }) {
  return (
    <>
      <a
        href={`/browse/models/${modelData.titleSystemName}`}
        // prevent blue hyperlink color
        style={{ color: "inherit" }}
      >
        <MDBCardTitle>{modelData.title}</MDBCardTitle>
      </a>
      <div className="mb-3">
        {modelData.badges &&
          modelData.badges.length > 0 &&
          modelData.badges.map((badge, index) => (
            <span key={index} className="badge badge-secondary me-2 mb-2">
              {badge}
            </span>
          ))}
      </div>
      {/* Community Unlock */}
      {modelData.communityUnlock &&
        modelData.communityUnlock.goal &&
        modelData.communityUnlock.progress && (
          <MDBCardText className="text-muted">
            <MDBTypography tag="strong">
              {modelData.communityUnlock.progress}/
              {modelData.communityUnlock.goal}
            </MDBTypography>
            {getIcon.createIcon("mainCurrency")}
            {modelData.communityUnlock.message &&
              modelData.communityUnlock.message}
          </MDBCardText>
        )}
      {/* Bounty Offers */}
      {modelData.bounties && modelData.bounties.status && (
        <MDBCardText className="text-muted">
          <MDBBadge color="primary me-2 mt-0">
            <MDBIcon icon="search-dollar" />
            &nbsp;
            {modelData.bounties.status}
          </MDBBadge>
          {modelData.bounties.message && modelData.bounties.message}
          &nbsp;
          {modelData.bounties.reward && "for " + modelData.bounties.reward}
          {getIcon.createIcon("mainCurrency")}
        </MDBCardText>
      )}
      <MDBCardText>{modelData.description}</MDBCardText>
      <MDBCardText>
        {modelData.requirements && (
          <>
            <MDBTypography tag="small" className="text-muted">
              REQUIRES&nbsp;&nbsp;
            </MDBTypography>
            {modelData.requirements}
          </>
        )}
      </MDBCardText>
    </>
  );
}

export default ModelCardText;
