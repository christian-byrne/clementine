import React, { useState, useEffect } from "react";
import {
  MDBNavbar,
  MDBContainer,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
  MDBBtn,
  MDBIcon,
  MDBNavbarNav,
  MDBInputGroup,
} from "mdb-react-ui-kit";
import ProgressBar from "@/components/progress-bars/ProgressBar";
import pathFormat from "@/utils/pathFormat";
import IconGenerator from "@/utils/getIcon";
const iconGen = new IconGenerator();

function Navbar() {
  const [screenWidth, setScreenWidth] = useState(null);
  const [screenHeight, setScreenHeight] = useState(null);
  const [openNav, setOpenNav] = useState(true);
  const handleResize = () => {
    setScreenWidth(window.innerWidth);
    setScreenHeight(window.innerHeight);

    if (window.innerWidth < 992) {
      document.querySelector("button.navbar-toggler").click();
    }
  };

  useEffect(() => {
    handleResize();
    setScreenWidth(window.innerWidth);
    setScreenHeight(window.innerHeight);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const closeNav = () => {
    setOpenNav(false);
  };

  return (
    <MDBNavbar expand="lg" light bgColor="light">
      <MDBContainer fluid className="m-1 my-3">
        <MDBNavbarToggler
          type="button"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded={openNav}
          aria-label="Toggle navigation"
          onClick={() => setOpenNav(!openNav)}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>
        <MDBCollapse navbar open={openNav}>
          <MDBNavbarBrand
            className="clickable"
            href={pathFormat("/")}
            onClick={closeNav}
          >
            {iconGen.createIcon("mainBrand", "54px")}
          </MDBNavbarBrand>
          <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">
            <MDBNavbarItem>
              <MDBNavbarLink
                href={pathFormat("/browse/stylists/0")}
                onClick={closeNav}
              >
                Stylists
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink
                href={pathFormat("/browse/photos/0")}
                onClick={closeNav}
              >
                Photos
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href={pathFormat("/featured")} onClick={closeNav}>
                Featured
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink
                href={pathFormat("/leaderboards")}
                onClick={closeNav}
              >
                Leaderboards
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink
                href={pathFormat("/blog")}
                onClick={closeNav}
              >
                Blog
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href={pathFormat("/dress")} onClick={closeNav}>
                Dress
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href={pathFormat("/upload")} onClick={closeNav}>
                Upload
              </MDBNavbarLink>
            </MDBNavbarItem>
            {screenWidth && screenWidth > 1540 && (
              <MDBNavbarItem>
                <MDBNavbarLink
                  href={pathFormat("/creator-dashboard")}
                  onClick={closeNav}
                >
                  Dashboard
                </MDBNavbarLink>
              </MDBNavbarItem>
            )}
            {screenWidth && screenWidth > 1400 && (
              <MDBNavbarItem>
                <MDBNavbarLink
                  className="my-0"
                  href={pathFormat("/currency")}
                  onClick={closeNav}
                >
                  DAILY TASKS (3/9)
                  <ProgressBar min={0} max={100} now={33} />
                </MDBNavbarLink>
              </MDBNavbarItem>
            )}
          </MDBNavbarNav>
          <MDBInputGroup tag="form" className="me-3 d-flex w-auto ms-auto">
            <input
              className="form-control"
              placeholder="AI Search"
              aria-label="Search"
              type="Search"
            />
            <MDBBtn outline>Search</MDBBtn>
          </MDBInputGroup>
          <MDBNavbarNav right className="w-auto ms-auto align-items-center">
            <MDBNavbarItem className="me-0">
              <MDBNavbarLink href={pathFormat("/currency")}>
                <div className="d-flex flex-row align-items-center justify-content-center">
                  {iconGen.createIcon("mainCurrency")}
                  <span className="text-muted">79&nbsp;RUBIES</span>
                </div>
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem className="ml-4 ml-lg-0">
              <MDBNavbarLink href={pathFormat("/user/wednesday-addams")}>
                <MDBIcon fas icon="user" />
              </MDBNavbarLink>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}

export default Navbar;
