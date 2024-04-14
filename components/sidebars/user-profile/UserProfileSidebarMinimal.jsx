import React, { useState } from "react";
import {
  MDBContainer,
  MDBCollapse,
  MDBCard,
  MDBCardHeader,
  MDBCardFooter,
  MDBCardText,
  MDBCardBody,
} from "mdb-react-ui-kit";
import pathFormat from "@/utils/pathFormat";

function createLeaderboardRanks(ranks) {
  let ret = [];
  for (let i = 0; i < ranks.length; i++) {
    ret.push(
      <p className={i === 0 ? "mb-1" : "mb-0 small text-muted text-xs"} key={i}>
        {ranks[i]}
      </p>
    );
  }
  return ret;
}

function UserProfileSidebar({ userData }) {
  // Function to create the user-generated status elements
  const createUserStatusElements = () => {
    if (!userData["statuses"]) {
      return { initialStatuses: [], collapsedStatuses: [] };
    }
    // Map the first two statuses for initial display
    const initialStatuses = userData["statuses"]
      .slice(0, 2)
      .map((status, index) => (
        <p key={index} className={index === 0 ? "mt-3 mb-1" : "mt-2 mb-0"}>
          <small className="text-muted">{status.date}&nbsp;</small>&ldquo;
          {status.text}&rdquo;
        </p>
      ));

    if (userData["statuses"].length <= 2) {
      return { initialStatuses, collapsedStatuses: [] };
    }
    // Map the rest of the statuses for the collapsed section
    const collapsedStatuses = userData["statuses"]
      .slice(2)
      .map((status, index) => (
        <p key={index} className="mt-3">
          <small className="text-muted">{status.date}&nbsp;</small>&ldquo;
          {status.text}&rdquo;
        </p>
      ));

    return { initialStatuses, collapsedStatuses };
  };

  // Destructure the initial and collapsed status elements
  const { initialStatuses, collapsedStatuses } = createUserStatusElements();

  // Function to toggle the collapsed status section
  const [isOpen, setIsOpen] = useState(false);
  const toggleStatusCollapse = () => {
    setIsOpen(!isOpen);
    // hide/show the expand indicator
    const expandElipses = document.getElementById("expand-elipses");
    if (isOpen) {
      expandElipses.style.display = "block";
    } else {
      expandElipses.style.display = "none";
    }
  };

  return (
    <MDBCard>
      <MDBCardHeader className="text-center">
        {/* Triple-dot Dropdown and Report Icons */}
        <div className="d-flex justify-content-end">
          <span className="me-2 top-right-button">
            <i className="fas fa-ellipsis-v"></i>
          </span>
          <span className="top-right-button">
            <i className="fas fa-flag"></i>
          </span>
        </div>

        {/* Profile Picture */}
        <img
          src={pathFormat(
            "/pictures/pfps/" +
              userData["name"].replaceAll(" ", "-").toLowerCase() +
              "-3.png"
          )}
          alt="User Avatar"
          className="img-fluid rounded-circle mb-3"
        />

        {/* Username and Join Date */}
        <MDBContainer className="d-flex flex-column justify-content-center pe-4">
          <h5>{userData["username"]}</h5>
          <p className="text-muted text-sm">
            <small>Joined {userData["joinDate"]}</small>
          </p>
          {/* Ranking Status */}
          {userData["ranks"] && (
            <div className="mb-3">
              {createLeaderboardRanks(userData["ranks"])}
            </div>
          )}
        </MDBContainer>
      </MDBCardHeader>
      <MDBCardBody>
        {/* Titles Section */}
        {userData["titles"] && userData["titles"].length > 0 && (
          <MDBContainer className="mb-3 d-flex flex-wrap">
            {userData["titles"].map((title, index) => (
              <span key={index} className="badge badge-secondary me-2 mb-2">
                {title}
              </span>
            ))}
          </MDBContainer>
        )}

        {/* User-Generated Status */}
        {userData["statuses"] && userData["statuses"].length > 0 && (
          <MDBContainer onClick={toggleStatusCollapse} className="mt-3">
            {initialStatuses}
            <div className="mb-0 mt-0 d-flex align-items-center justify-content-center">
              <span id="expand-elipses" className="expand-indicator clickable">
                ...
              </span>
            </div>
            <MDBCollapse open={isOpen}>{collapsedStatuses}</MDBCollapse>
          </MDBContainer>
        )}
        {/* Divider */}
        <hr className="my-3" />

        {/* Badges Section */}
        {userData["badges"] && (
          <MDBContainer className="my-2">
            <h5 className="mt-3 mb-3">Badges</h5>
            {/* <!-- Badges Row 1: S-Tier --> */}
            <MDBContainer className="d-flex justify-content-center align-items-center mb-3">
              {userData["badges"]["tier1"]?.map((badge, index) => (
                <div className="me-3 mb-3 w-25" key={index}>
                  <img
                    src={pathFormat(badge.src)}
                    alt={badge.alt}
                    className="img-fluid rounded-circle"
                    title={badge.title}
                  />
                </div>
              ))}
            </MDBContainer>
            {/* <!-- Badges Row 2: A-Tier --> */}
            {userData["badges"]?.["tier2"] && (
              <MDBContainer className="d-flex justify-content-center align-items-center mb-3">
                {userData["badges"]["tier2"].map((badge, index) => (
                  <div className="me-3 mb-3 w-25" key={index}>
                    <img
                      src={pathFormat(badge.src)}
                      alt={badge.alt}
                      className="img-fluid rounded-circle"
                      title={badge.title}
                    />
                  </div>
                ))}
              </MDBContainer>
            )}
            {/* <!-- Badges Row 3: B-Tier --> */}
            {userData["badges"]?.["tier3"] && (
              <MDBContainer className="d-flex justify-content-center align-items-center mb-3">
                {userData["badges"]["tier3"].map((badge, index) => (
                  <div className="me-3 mb-3 w-25" key={index}>
                    <img
                      src={pathFormat(badge.src)}
                      alt={badge.alt}
                      className="img-fluid rounded-circle"
                      title={badge.title}
                    />
                  </div>
                ))}
              </MDBContainer>
            )}
            {/* <!-- Badges Row 4: C-Tier --> */}
            {userData["badges"]?.["tier4"] && (
              <MDBContainer className="d-flex justify-content-center align-items-center mb-3">
                {userData["badges"]["tier4"].map((badge, index) => (
                  <div className="me-3 mb-3 w-25" key={index}>
                    <img
                      src={pathFormat(badge.src)}
                      alt={badge.alt}
                      className="img-fluid rounded-circle"
                      title={badge.title}
                    />
                  </div>
                ))}
              </MDBContainer>
            )}
          </MDBContainer>
        )}

        {/* Achievements Section */}
        {userData["achievements"]?.length > 0 && (
          <>
            <h5 className="mt-3 mb-3">Achievements</h5>
            <MDBContainer className="d-flex justify-content-center align-items-center mb-3">
              {userData["achievements"].map((achievement, index) => (
                <div className="me-3 mb-3 w-25" key={index}>
                  <img
                    src={pathFormat(achievement.src)}
                    alt={achievement.alt}
                    className="img-fluid rounded-circle"
                    title={achievement.title}
                  />
                </div>
              ))}
            </MDBContainer>
          </>
        )}

        {/* Divider */}
        <hr className="my-3" />

        {/* Footer */}
        <MDBCardFooter>
          <MDBCardText className="text-muted">
            <small>University Student Since: {userData.joinDate}</small>
          </MDBCardText>
        </MDBCardFooter>
      </MDBCardBody>
    </MDBCard>
  );
}

export default UserProfileSidebar;