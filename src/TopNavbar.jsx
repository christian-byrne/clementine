import React, { useState, useEffect } from 'react';
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
  MDBBadge
} from 'mdb-react-ui-kit';
import IconGenerator from "./icon-handlers/getIcon";
const iconGen = new IconGenerator();


function Navbar() {
  const [openNav, setOpenNav] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const isSmallScreen = window.matchMedia('(max-width: 600px)').matches;
      setOpenNav(!isSmallScreen);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <MDBNavbar expand='lg' light bgColor='light'>
      <MDBContainer fluid className="m-1 my-3">
        <MDBNavbarToggler
          type='button'
          data-target='#navbarNav'
          aria-controls='navbarNav'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setOpenNav(!openNav)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>
        <MDBCollapse navbar open={openNav}>
          <MDBNavbarBrand>
            { iconGen.createIcon("mainBrand", "54px") }
          </MDBNavbarBrand>
          <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
            <MDBNavbarItem>
              <MDBNavbarLink href='#'>
                Dress
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href='#'>
                Upload
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href='#'>
                Browse
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href='#'>
                Creator Dashboard
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink style={{ color: 'rgb(251, 0, 88)' }} href='#'>
                DAILY TASKS (2/8)
              </MDBNavbarLink>
            </MDBNavbarItem>
          </MDBNavbarNav>
          <MDBInputGroup tag="form" className='me-3 d-flex w-auto ms-auto' >
            <input className='form-control' placeholder="AI Search" aria-label="Search" type='Search' />
            <MDBBtn outline>Search</MDBBtn>
          </MDBInputGroup>
          <MDBNavbarNav right className='w-auto ms-auto align-items-center'>
            <MDBNavbarItem className="me-0">
              <MDBNavbarLink href='#'>
                {/* <MDBBadge pill color='danger'>179</MDBBadge> */}
                <div className="d-flex flex-row align-items-center justify-content-center">
                { iconGen.createIcon("mainCurrency") }
                <span className='text-muted'>79&nbsp;RUBIES</span>
                </div>
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem className="ml-4 ml-lg-0">
              <MDBNavbarLink href='#'><MDBIcon fas icon='user' /></MDBNavbarLink>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}


export default Navbar;
