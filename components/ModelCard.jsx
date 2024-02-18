import React from "react";
import {
  MDBContainer,
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBTypography,
  MDBBtn,
  MDBBadge,
  MDBIcon,
} from "mdb-react-ui-kit";
import placeholderImg from "../data/placeholder-image.json";
import IconGenerator from "../utils/getIcon";

const getIcon = new IconGenerator();

function getGridPath(title) {
  let titleFormatted = title.toLowerCase().replace(/\s/g, "-");
  // need to handle hyphens next to other characters like (, ), etc.,
  let path = `/pictures/models/${titleFormatted}/${titleFormatted}-grid-2x2.png`;
  return path;
}

function ModelCard({ modelData }) {
  return (
    modelData?.title && (
      <MDBContainer className="col-md-6 col-lg-4 col-sm-12 mb-4">
        <MDBCard className="h-100 d-flex d-column">
          <MDBCardImage
            src={
              modelData.imageSrc
                ?  getGridPath(modelData.title)
                : placeholderImg.imageSrc
            }
            alt={modelData.title || placeholderImg.alt}
            title={modelData.title || placeholderImg.title}
            position="top"
          />
          <MDBCardBody>
            <MDBCardTitle>{modelData.title}</MDBCardTitle>
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
                {modelData.bounties.reward &&
                  "for " + modelData.bounties.reward}
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
          </MDBCardBody>
          <MDBContainer className="my-3">
            <MDBBtn color="primary" className="m-1">
              Details
            </MDBBtn>
            <MDBBtn color="success" className="m-1">
              Use with my Wardrobe
            </MDBBtn>
          </MDBContainer>
        </MDBCard>
      </MDBContainer>
    )
  );
}

export default ModelCard;
