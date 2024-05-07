import React from "react";

function TagBadges({ badgesData, windowWidth }) {
  return (
    <>
      {badgesData?.length > 0 &&
        badgesData
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
    </>
  );
}

export default TagBadges;
