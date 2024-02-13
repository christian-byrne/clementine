import React, { useEffect, useRef, useState } from "react";
import { MDBContainer, MDBRow, MDBBtn } from "mdb-react-ui-kit";
import BannerVidHoverPlay from "../components/BannerVidHoverPlay";

const videos = [
  "comfyUI_00008.mp4",
  "comfyUI_00018.mp4",
  "comfyUI_00010.mp4",
  "comfyUI_00019.mp4",
  "comfyUI_00006.mp4",
  "comfyUI_00011.mp4",
  // "comfyUI_00012.mp4",
  // "comfyUI_00017.mp4",
  // "comfyUI_00020.mp4",
];

function LandingPage() {
  useEffect(() => {
    document.title = "Welcome";
  }, []);

  return (
    <MDBContainer fluid>
      <div className="row mt-0 p-0">
        <main role="main" className="col-md-12 ms-sm-auto col-lg-12 px-md-4">
          <MDBContainer fluid className="mt-5">
            {/* Featured Models */}
            <MDBRow className="d-flex flex-column">
              {videos &&
                videos.length > 0 &&
                videos.map((video, index) => (
                  <BannerVidHoverPlay key={index} videoSrc={video} />
                ))}
            </MDBRow>
            {/* Featured Photos */}
            <MDBRow></MDBRow>
          </MDBContainer>
        </main>
      </div>
    </MDBContainer>
  );
}

export default LandingPage;
