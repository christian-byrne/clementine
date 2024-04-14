import React from "react";
import { MDBContainer } from "mdb-react-ui-kit";
import { padNumber } from "../../utils/padNumber";

function SocialStatsBadges({
  likes,
  downloads,
  favorites,
  totalRatings,
  averageRating,
  numVisibleBadges
}) {
  const badges = [
    { key: 'likes', icon: 'fas fa-heart', label: 'LIKES', value: likes },
    { key: 'downloads', icon: 'fas fa-download', label: 'DOWNLOADS', value: downloads },
    { key: 'favorites', icon: 'fas fa-star', label: 'FAVORITES', value: favorites },
    { key: 'totalRatings', icon: 'fas fa-star', label: `${padNumber(totalRatings, 4)} ratings`, value: averageRating }
  ];

  return (
    <MDBContainer className="mb-3 d-flex flex-wrap">
      {badges
        .filter(badge => badge.value > 0)
        .slice(0, numVisibleBadges)
        .map(({ key, icon, label, value }) => (
          <div key={key} className="badge badge-secondary me-2 mb-2 p-2">
            <div className="d-flex justify-content-center align-items-center">
              {/* Icon */}
              <i className={icon + " me-2"}></i>
              {/* Value */}
              <span className="font-weight-bold">{padNumber(value, 4)}</span>
            </div>
            {/* Label */}
            <p className="mb-0 mt-1 small text-muted">{label}</p>
          </div>
        ))}
    </MDBContainer>
  );
}

export default SocialStatsBadges;