import React from "react";
import {
  MDBContainer,
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardText,
  MDBTypography,
} from "mdb-react-ui-kit";
import { padNumber } from "@/utils/padNumber";
import placeholderImg from "@/data/placeholder-image.json";
import pathFormat from "@/utils/pathFormat";

function PhotoCard({ data, containerClass="col-md-6 col-lg-4 col-sm-12 mb-4 mx-0" }) {

  return (
    data?.imagePath && (
      <MDBContainer className={containerClass}>
        <MDBCard className="h-100 d-flex d-column">
          <a
            href={`/browse/photos/${data.imageFileName
              .replace(".png", "")
              .replace(".jpg", "")
              .replace(".jpeg", "")}`}
          >
            <MDBCardImage
            className="clickable"
              src={
                data.imagePath
                  ? pathFormat(data.imagePath)
                  : pathFormat(placeholderImg.imagePath)
              }
              alt={data.model || placeholderImg.alt}
              title={
                (data.model &&
                  data.creator &&
                  data.model + " by " + data.creator) ||
                placeholderImg.title
              }
              position="top"
            />
          </a>
          <MDBCardBody>
            {/* Engagement Statistics */}
            <div className="badge badge-secondary me-3 mb-3 p-2 clickable">
              <div className="d-flex justify-content-center align-items-center">
                <i
                  className="fas fa-heart me-2"
                  // style={{color: "red"}}
                ></i>
                <span className="font-weight-bold">
                  {data.likes && padNumber(data.likes, 5)}
                </span>
              </div>
              <p className="mb-0 mt-1 small text-muted">LIKES</p>
            </div>
            <div className="badge badge-secondary me-3 mb-3 p-2 clickable">
              <div className="d-flex justify-content-center align-items-center">
                <i className="fas fa-star me-2"></i>
                <span className="font-weight-bold">
                  {(data.favorites && padNumber(data.favorites, 5)) ||
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
              {data.stylistTitle && (
                <a
                  href={`/browse/stylists/${data.stylistTitleSystemName
                    .replace(".png", "")
                    .replace(".jpg", "")
                    .replace(".jpeg", "")}`}
                >
                  {data.stylistTitle}
                </a>
              )}
              {data.stylistTitle && data.creator ? (
                <span className="text-muted">&nbsp;by&nbsp;</span>
              ) : (
                ""
              )}
              {data?.creator != "UNKNOWN" ? (
                <a
                  href={pathFormat(
                    "/user/" +
                      data.creator.replaceAll(" ", "-").toLowerCase()
                  )}
                >
                  {data.creator}
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
