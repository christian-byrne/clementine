import React, { useState } from 'react';
import { MDBContainer, MDBCollapse, MDBCard, MDBCardHeader, MDBCardFooter, MDBCardText, MDBBtn, MDBCardBody } from 'mdb-react-ui-kit';

function createLeaderboardRanks(ranks) {
  let ret = []
  for (let i = 0; i < ranks.length; i++) {
    ret.push(<p className={
      i === 0 ? "mb-1" : "mb-0 small text-muted text-xs"
    }>{ranks[i]}</p>)
  }
  return ret;
}

function UserProfileSidebar({ username, joinDate, ranks, titles, socialIcons, statuses, badges, achievements }) {

  // Function to create the user-generated status elements
  const createUserStatusElements = () => {
    // Map the first two statuses for initial display
    const initialStatuses = statuses.slice(0, 2).map((status, index) => (
      <p key={index} className={index === 0 ? "mt-3 mb-1" : "mt-2 mb-0"}>
        <small className="text-muted">{status.date}&nbsp;</small>
        "{status.text}"
      </p>
    ));

    // Map the rest of the statuses for the collapsed section
    const collapsedStatuses = statuses.slice(2).map((status, index) => (
      <p key={index} className="mt-3">
        <small className="text-muted">{status.date}&nbsp;</small>
        "{status.text}"
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
  }

  return (
    <MDBCard>
      <MDBCardHeader className="text-center">
        {/* Triple-dot Dropdown and Report Icons */}
        <div className="d-flex justify-content-end">
          <span className="me-2 top-right-button"><i className="fas fa-ellipsis-v"></i></span>
          <span className="top-right-button"><i className="fas fa-flag"></i></span>
        </div>

        {/* Profile Picture */}
        <img src="pictures/avatars/wednesday-avatar-04.png" alt="User Avatar" className="img-fluid rounded-circle mb-3" />

        {/* Username and Join Date */}
        <MDBContainer className="d-flex flex-column justify-content-center pe-4">
          <h5>{username}</h5>
          <p className="text-muted text-sm"><small>Joined {joinDate}</small></p>
          {/* Ranking Status */}
          <div className="mb-3">
            {createLeaderboardRanks(ranks)}
          </div>
        </MDBContainer>
      </MDBCardHeader>
      <MDBCardBody>

        {/* Titles Section */}
        <MDBContainer className="mb-3 d-flex flex-wrap">
          {titles.map((title, index) => (
            <span key={index} className="badge badge-secondary me-2 mb-2">{title}</span>
          ))}
        </MDBContainer>

        {/* Social Media Icons */}
        <MDBContainer className="mt-3">
          {socialIcons.map((icon, index) => (
            <img key={index} src={icon.url} alt={icon.alt} width="30" className="social-icon me-3" />
            ))}
        </MDBContainer>

        {/* User-Generated Status */}
        <MDBContainer onClick={toggleStatusCollapse} className="mt-3">
            {initialStatuses}
            <div className="mb-0 mt-0 d-flex align-items-center justify-content-center">
              <span id="expand-elipses" className="expand-indicator clickable">...</span>
            </div>
        <MDBCollapse open={isOpen}>
          {collapsedStatuses}
          </MDBCollapse>
        </MDBContainer>

        {/* Follow, Favorite, Message Buttons */}
        <MDBContainer className="mt-2">
          <MDBBtn color="primary" className="m-1 ms-0">Follow</MDBBtn>
          <MDBBtn color="danger" className="m-1">Favorite</MDBBtn>
          <MDBBtn color="success" className="m-1 me-0">Message</MDBBtn>
        </MDBContainer>
        
        {/* Divider */}
        <hr className="my-3" />

        {/* Statistics Section */}
        <MDBContainer className="mb-3 d-flex flex-wrap">
          {/* <!-- Likes Badge --> */}
          <div class="badge badge-secondary me-2 mb-2 p-2">
            <div class="d-flex justify-content-center align-items-center">
              {/* <!-- Font Awesome heart icon --> */}
              <i class="fas fa-heart me-2"></i> 
              <span class="font-weight-bold">8.4k</span>
            </div>
            <p class="mb-0 mt-1 small text-muted">LIKES</p>
          </div>
          {/* <!-- Downloads Badge --> */}
          <div class="badge badge-secondary me-2 mb-2 p-2">
            <div class="d-flex justify-content-center align-items-center">
              {/* <!-- Font Awesome download icon --> */}
              <i class="fas fa-download me-2"></i> 
              <span class="font-weight-bold">200</span>
            </div>
            <p class="mb-0 mt-1 small text-muted">DOWNLOADS</p>
          </div>
          {/* <!-- Favorites Badge --> */}
          <div class="badge badge-secondary me-2 mb-2 p-2">
            <div class="d-flex justify-content-center align-items-center">
              {/* <!-- Font Awesome star icon --> */}
              <i class="fas fa-star me-2"></i> 
              <span class="font-weight-bold">300</span>
            </div>
            <p class="mb-0 mt-1 small text-muted">FAVORITES</p>
          </div>
          {/* <!-- Rating Badge --> */}
          <div class="badge badge-secondary me-2 mb-2 p-2">
            <div class="d-flex justify-content-center align-items-center">
              {/* <!-- Font Awesome star icon --> */}
              <i class="fas fa-star me-2"></i>
              <span class="font-weight-bold">4.94</span>
            </div>
            <p class="mb-0 mt-1 small text-muted">697 ratings</p>
          </div>
        </MDBContainer> 
        
        {/* Hot Take Section */}
        <MDBContainer className="my-3">
          <h5>Hottest Fashion Take 🌟</h5>
          <p>Fashion fades, but darkness is forever</p>
        </MDBContainer>

        {/* Divider */}
        <hr className="my-3" />

        {/* Badges Section */}
        <MDBContainer className="my-2">
            <h5 className="mt-3 mb-3">Badges</h5>
            {/* <!-- Badges Row 1: S-Tier --> */}
            <MDBContainer className="d-flex justify-content-center align-items-center mb-3">
            {badges.tier1.map((badge, index) => (
              <div class="me-3 mb-3 w-25">
                <img src={badge.src} alt={badge.alt} class="img-fluid rounded-circle" title={badge.title} />
              </div>
            ))}
            </MDBContainer>
            {/* <!-- Badges Row 2: A-Tier --> */}
            <MDBContainer className="d-flex justify-content-center align-items-center mb-3">

            {badges.tier2.map((badge, index) => (
              <div class="me-3 mb-3 w-25">
                <img src={badge.src} alt={badge.alt} class="img-fluid rounded-circle" title={badge.title} />
              </div>
            ))}
            </MDBContainer>
            {/* <!-- Badges Row 3: B-Tier --> */}
            <MDBContainer className="d-flex justify-content-center align-items-center mb-3">

            {badges.tier3.map((badge, index) => (
              <div class="me-3 mb-3 w-25">
                <img src={badge.src} alt={badge.alt} class="img-fluid rounded-circle" title={badge.title} />
              </div>
            ))}
            </MDBContainer>
            {/* <!-- Badges Row 4: C-Tier --> */}
            <MDBContainer className="d-flex justify-content-center align-items-center mb-3">
            {badges.tier4.map((badge, index) => (
              <div class="me-3 mb-3 w-25">
                <img src={badge.src} alt={badge.alt} class="img-fluid rounded-circle" title={badge.title} />
              </div>
            ))}
            </MDBContainer>
        </MDBContainer>

        {/* Achievements Section */}
        <h5 className="mt-3 mb-3">Achievements</h5>
        <MDBContainer className="d-flex justify-content-center align-items-center mb-3">
          {achievements.map((achievement, index) => (
            <div class="me-3 mb-3 w-25">
              <img src={achievement.src} alt={achievement.alt} class="img-fluid rounded-circle" title={achievement.title} />
            </div>
          ))}
        </MDBContainer>

        {/* Divider */}
        <hr className="my-3" />

        {/* Favorites Section */}
        <h5 className="mt-3 mb-3">Favorites</h5>

        {/* Footer */}
        <MDBCardFooter>
          <MDBCardText className="text-muted">
            <small>Member Since: {joinDate}</small>
          </MDBCardText>
        </MDBCardFooter>
    </MDBCardBody>
  </MDBCard>
  );
}

export default UserProfileSidebar;
