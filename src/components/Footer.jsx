import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';

export default function App() {
  return (
    <MDBFooter bgColor='light' className='text-center text-lg-start text-muted'>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
        <div className='me-5 d-none d-lg-block'>
          <span>Get connected with us on social networks:</span>
        </div>

        <div>
          <a href='github.com/christian-byrne' className='me-4 text-reset'>
            <MDBIcon fab icon="facebook-f" />
          </a>
          <a href='twitter.com/c__byrne' className='me-4 text-reset'>
            <MDBIcon fab icon="twitter" />
          </a>
          <a href='github.com/christian-byrne' className='me-4 text-reset'>
            <MDBIcon fab icon="google" />
          </a>
          <a href='github.com/christian-byrne' className='me-4 text-reset'>
            <MDBIcon fab icon="instagram" />
          </a>
          <a href='github.com/christian-byrne' className='me-4 text-reset'>
            <MDBIcon fab icon="linkedin" />
          </a>
          <a href='github.com/christian-byrne' className='me-4 text-reset'>
            <MDBIcon fab icon="github" />
          </a>
        </div>
      </section>

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <MDBIcon icon="gem" className="me-3" />
                Company Name
              </h6>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet similique culpa voluptate inventore distinctio iure.
              </p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Data</h6>
              <p>
                <a href='#!' className='text-reset'>
                  Lorem, ipsum dolor.
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Lorem, ipsum.
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Lorem.
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Lorem, ipsum.
                </a>
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
              <p>
                <a href='#!' className='text-reset'>
                  Documentation
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Dev Blog
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Help
                </a>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p>
                <MDBIcon icon="home" className="me-2" />
                Tucson, AZ 85746, US
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                cbyrne@arizona.edu
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" /> + 01 206 457 7675
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2024 Copyright:&nbsp;
        <a className='text-reset fw-bold' href=''>
          bymyself
        </a>
      </div>
    </MDBFooter>
  );
}