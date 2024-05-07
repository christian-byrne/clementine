import React from "react";

function TagBadges({ badgesData, windowWidth, breakpoints, badgeClass = "badge-secondary" }) {

  const getBadgeCount = (width) => {
    for (let key in breakpoints) {
        console.log("key: ", key);
        console.log("breakpoints[key]: ", breakpoints[key]);
      if (width < key) {
        return breakpoints[key];
      }
    }
    return Infinity;
  }

  return (
    <>
      {badgesData?.length > 0 &&
        badgesData
          .slice(
            0,
            getBadgeCount(windowWidth)
          )
          .map((badge, index) => (
            <span key={index} className={`badge ${badgeClass} me-2 mb-2`}>
              {badge.charAt(0).toUpperCase() + badge.slice(1)}
            </span>
          ))}
    </>
  );
}

export default TagBadges;