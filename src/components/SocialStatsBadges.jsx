import React from "react";
import { MDBContainer } from "mdb-react-ui-kit";
import { padNumber } from "../utils/padNumber";

function SocialStatsBadges({
  likes,
  downloads,
  favorites,
  ratings,
  averageRating,
}) {
  return (
    likes || downloads || favorites || ratings ? (
    <MDBContainer className="mb-3 d-flex flex-wrap">
      {likes && likes > 0 && (
          <div className="badge badge-secondary me-2 mb-2 p-2">
            <div className="d-flex justify-content-center align-items-center">
              {/* <!-- Font Awesome heart icon --> */}
              <i className="fas fa-heart me-2"></i>
              {/* Should be read if user has liked this thing already, otherwise default color */}
              <span className="font-weight-bold">{padNumber(likes, 6)}</span>
            </div>
            <p className="mb-0 mt-1 small text-muted">LIKES</p>
          </div>
      )}
      {/* <!-- Downloads Badge --> */}
      {downloads && downloads > 0 && (
        <div className="badge badge-secondary me-2 mb-2 p-2">
          <div className="d-flex justify-content-center align-items-center">
            {/* <!-- Font Awesome download icon --> */}
            <i className="fas fa-download me-2"></i>
            <span className="font-weight-bold">{padNumber(downloads, 6)}</span>
          </div>
          <p className="mb-0 mt-1 small text-muted">DOWNLOADS</p>
        </div>
      )}
      {favorites && favorites > 0 && (
        <div className="badge badge-secondary me-2 mb-2 p-2">
          <div className="d-flex justify-content-center align-items-center">
            {/* <!-- Font Awesome star icon --> */}
            <i className="fas fa-star me-2"></i>
            <span className="font-weight-bold">{padNumber(favorites, 4)}</span>
          </div>
          <p className="mb-0 mt-1 small text-muted">FAVORITES</p>
        </div>
      )}
      {ratings && ratings > 0 && averageRating && (
        <div className="badge badge-secondary me-2 mb-2 p-2">
          <div className="d-flex justify-content-center align-items-center">
            {/* <!-- Font Awesome star icon --> */}
            <i className="fas fa-star me-2"></i>
            <span className="font-weight-bold">{padNumber(averageRating, 4)}</span>
          </div>
          <p className="mb-0 mt-1 small text-muted">{padNumber(ratings, 6) + " ratings"}</p>
        </div>
      )}
    </MDBContainer>
    ) : null
  );
}

export default SocialStatsBadges;
