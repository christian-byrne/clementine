import React, { useEffect, useState } from "react";
import { MDBContainer } from "mdb-react-ui-kit";
import { padNumber } from "@/utils/padNumber";

function SocialStatsBadges({ userData, fields, numVisibleBadges = 3 }) {
  const [visibleBadgeFields, setVisibleBadgeFields] = useState([]);
  const badgeConfig = {
    likes: { icon: "fas fa-heart", label: "LIKES" },
    downloads: {
      icon: "fas fa-download",
      label: "DOWNLOADS",
    },
    favorites: { icon: "fas fa-star", label: "FAVORITES" },
    totalratings: {
      key: "totalratings",
      icon: "fas fa-star",
    },
    views: { icon: "fas fa-eye", label: "VIEWS" },
    badgecount: { icon: "fas fa-award", label: "AWARDS" },
    achievementcount: {
      icon: "fas fa-trophy",
      label: "ACHIEVEMENTS",
    },
    titlecount: {
      icon: "fas fa-crown",
      label: "TITLES",
    },
    score: { icon: "fas fa-trophy", label: "SCORE" },
    modelcount: { icon: "fas fa-cube", label: "MODELS" },
  };

  useEffect(() => {
    if (userData) {
      setVisibleBadgeFields(fields.slice(0, numVisibleBadges));
    }
  }, [userData, fields, numVisibleBadges]);

  return (
    visibleBadgeFields?.length > 0 &&
    userData && (
      <MDBContainer className="mb-3 d-flex flex-wrap">
        {visibleBadgeFields.map(
          (fieldName, index) =>
            badgeConfig && (
              <div key={index} className="badge badge-secondary me-2 mb-2 p-2">
                <div className="d-flex justify-content-center align-items-center">
                  <i className={badgeConfig[fieldName].icon + " me-2"}></i>
                  <span className="font-weight-bold">
                    {fieldName === "totalratings"
                      ? userData.averagerating
                      : !userData[fieldName]
                      ? 0
                      : padNumber(userData[fieldName], 3) || 0}
                  </span>
                </div>
                <p className="mb-0 mt-1 small text-muted">
                  {fieldName === "totalratings"
                    ? userData.totalratings
                    : badgeConfig[fieldName].label}
                </p>
              </div>
            )
        )}
      </MDBContainer>
    )
  );
}

export default SocialStatsBadges;
