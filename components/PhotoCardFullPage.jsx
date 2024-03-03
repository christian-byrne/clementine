import React, { useEffect, useState } from "react";
import {
  MDBContainer,
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardText,
  MDBTypography,
} from "mdb-react-ui-kit";
import { padNumber } from "../utils/padNumber";
import placeholderImg from "../data/placeholder-image.json";
import pathFormat from "../utils/pathFormat";

function PhotoCard({ photoData }) {
  const [detailsExpanded, setDetailsExpanded] = useState(false);

  return (
    <MDBContainer
      className={`${
        detailsExpanded
          ? "col-md-12 col-lg-12 col-xl-12 col-xxl-12"
          : "col-md-11 col-lg-10 col-xl-9 col-xxl-8"
      } col-sm-12 d-flex justify-content-center`}
    >
      <MDBCard className="d-flex flex-row">
        <MDBCardImage
          src={
            photoData.imagePath
              ? pathFormat(photoData.imagePath)
              : pathFormat(placeholderImg.imagePath)
          }
          alt={photoData.model || placeholderImg.alt}
          title={
            (photoData.model &&
              photoData.creator &&
              photoData.model + " by " + photoData.creator) ||
            placeholderImg.title
          }
          position="top"
        />
        <MDBCardBody>
          {/* Engagement Statistics */}
          <div className="badge badge-secondary me-3 mb-3 p-2 clickable">
            <div className="d-flex justify-content-center align-items-center">
              <i
                className="fas fa-heart me-2"
                // style={{color: "red"}}
              ></i>
              <span className="font-weight-bold">
                {photoData.likes && padNumber(photoData.likes, 5)}
              </span>
            </div>
            <p className="mb-0 mt-1 small text-muted">LIKES</p>
          </div>
          <div className="badge badge-secondary me-3 mb-3 p-2 clickable">
            <div className="d-flex justify-content-center align-items-center">
              <i className="fas fa-star me-2"></i>
              <span className="font-weight-bold">
                {(photoData.favorites && padNumber(photoData.favorites, 5)) ||
                  padNumber(0, 5)}
              </span>
            </div>
            <p className="mb-0 mt-1 small text-muted">FAVORITES</p>
          </div>
          {/* Model and Creator */}
          <MDBCardText className="clickable d-flex flex-column">
            <MDBTypography>
              <MDBTypography tag="small" className="text-muted">
                MADE WITH&nbsp;&nbsp;
              </MDBTypography>
              {photoData.modelTitle ? photoData.modelTitle : ""}
              {photoData.modelTitle && photoData.creator ? (
                <span className="text-muted">&nbsp;by&nbsp;</span>
              ) : (
                ""
              )}
              {photoData?.creator != "UNKNOWN" ? (
                <a
                  href={pathFormat(
                    "/user/" +
                      photoData.creator.replaceAll(" ", "-").toLowerCase()
                  )}
                >
                  {photoData.creator}
                </a>
              ) : (
                ""
              )}
            </MDBTypography>
          </MDBCardText>
          {photoData.views && (
            <MDBCardText className="d-flex flex-column">
              <MDBTypography>
                <MDBTypography tag="small" className="text-muted">
                  VIEWS&nbsp;&nbsp;
                </MDBTypography>
                {photoData.views}
              </MDBTypography>
            </MDBCardText>
          )}
          {photoData.shared && (
            <MDBCardText className="d-flex flex-column">
              <MDBTypography>
                <MDBTypography tag="small" className="text-muted">
                  SHARED&nbsp;&nbsp;
                </MDBTypography>
                {photoData.shared}
              </MDBTypography>
            </MDBCardText>
          )}
          {photoData.dateCreated && (
            <MDBCardText className="d-flex flex-column">
              <MDBTypography>
                <MDBTypography tag="small" className="text-muted">
                  CREATED&nbsp;&nbsp;
                </MDBTypography>
                {photoData.dateCreated}
              </MDBTypography>
            </MDBCardText>
          )}
          {photoData.comments && (
            <MDBCardText className="d-flex flex-column">
              <MDBTypography>
                <MDBTypography tag="small" className="text-muted">
                  COMMENTS&nbsp;&nbsp;
                </MDBTypography>
                {photoData.comments}
              </MDBTypography>
            </MDBCardText>
          )}
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default PhotoCard;
