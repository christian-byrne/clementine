import React from "react";
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
  return (
    photoData?.imagePath && (
      <MDBContainer className="col-md-6 col-lg-4 col-sm-12 mb-4 mx-0">
        <MDBCard className="h-100 d-flex d-column">
          <MDBCardImage
            src={
              photoData.imagePath
                ?  photoData.imagePath
                : placeholderImg.imagePath
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
          </MDBCardBody>
          {/* Model and Creator */}
          <MDBCardText className="ms-4 clickable d-flex flex-column">
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
        </MDBCard>
      </MDBContainer>
    )
  );
}

export default PhotoCard;
