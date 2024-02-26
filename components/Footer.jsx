import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import pathFormat from '@/utils/pathFormat';

export default function App() {
  return (
    <MDBFooter bgColor='light' className='text-center text-lg-start text-muted'>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
        <div className='me-5 d-none d-lg-block'>
          <span>Get connected with me on social networks:</span>
        </div>

        <div>
          <a href='https://civitai.com/user/_______SO_SRY_MY_BAD' className='me-4 text-reset'>
            <MDBIcon fas icon="camera-retro" />
          </a>
          <a href='https://twitter.com/c__byrne' className='me-4 text-reset'>
            <MDBIcon fab icon="twitter" />
          </a>
          <a href='https://leetcode.com/trevor-reznik/' className='me-4 text-reset'>
            <MDBIcon fas icon="code" />
          </a>
          <a href='https://codepen.io/trevor-reznik' className='me-4 text-reset'>
            <MDBIcon fab icon="codepen" />
          </a>
          <a href='https://christian-byrne.com' className='me-4 text-reset'>
            <MDBIcon fas icon="address-card" />
          </a>
          <a href='https://github.com/christian-byrne' className='me-4 text-reset'>
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
                Christian P. Byrne
              </h6>
              <p>
                {/* A sun of rubber was convulsed and set. And blood black nothingness began to spin. A system of cells interlinked within cells interlinked within cells interlinked within one stem. And dreadfully distinct. */}
                Fear is the mind-killer. Fear is the little-death that brings total obliteration. I will face my fear. I will permit it to pass over me and through me. And when it has gone past I will turn the inner eye to see its path. Where the fear has gone there will be nothing. Only I will remain.
              </p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Data</h6>
              <p>
                <a href={pathFormat('https://github.com/christian-byrne/clementine/commits/main/')} className='text-reset'>
                  Commit History
                </a>
              </p>
              <p>
                <a href={pathFormat('https://github.com/christian-byrne/clementine/issues')} className='text-reset'>
                  Issues
                </a>
              </p>
              <p>
                <a href={pathFormat('https://github.com/christian-byrne/clementine/pulse')} className='text-reset'>
                  Insights
                </a>
              </p>
              <p>
                <a href={pathFormat('https://github.com/christian-byrne/clementine/pulls')} className='text-reset'>
                  Pull Requests
                </a>
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
              <p>
                <a href={pathFormat('https://github.com/christian-byrne/clementine')} className='text-reset'>
                  Documentation
                </a>
              </p>
              <p>
                <a href={pathFormat('https://github.com/christian-byrne/clementine/commits/main/')} className='text-reset'>
                  Dev Blog
                </a>
              </p>
              <p>
                <a href={pathFormat('https://github.com/christian-byrne/clementine/issues')} className='text-reset'>
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
        <a className='text-reset fw-bold' href={pathFormat('https://github.com/christian-byrne')}>
          bymyself
        </a>
      </div>
    </MDBFooter>
  );
}