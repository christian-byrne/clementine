import React, { useEffect, useState } from "react";
import { MDBContainer, MDBRow } from "mdb-react-ui-kit";
import BannerVidHoverPlay from "@/components/videos/BannerVidHoverPlay";
import formatDocTitle from "@/utils/formatDocTitle";

const videos = [
  "comfyUI_00012-edited-blur_focus.mp4",
  "comfyUI_00018.mp4",
  "comfyUI_00008.mp4",
  "comfyUI_00011.mp4",
  "cowboy_coastal-banner_vid-3.mp4",
  "comfyUI_00010.mp4",
  "comfyUI_00019.mp4",
  "coastal_clean_girl-banner_vid-1.mp4",
  "cowboy_coastal-banner_vid-2.mp4",
  "cowboy_coastal-banner_vid-4.mp4",
  "comfyUI_00006.mp4",
  "cowboy_coastal-banner_vid-1.mp4",
];

const Custom404 = () => {
  const [windowWidth, setWindowWidth] = useState(1080);

  useEffect(() => {
    document.title = formatDocTitle("404");
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      setWindowWidth(window.innerWidth);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, [windowWidth]);

  return (
    <>
      <h1
        style={{
          position: "fixed",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: `${windowWidth / 40}rem`,
          zIndex: "1000",
        }}
      >
        404
      </h1>
      <MDBContainer fluid className="px-0">
        <div className="row mt-0 p-0">
          <main role="main" className="col-md-12 ms-sm-auto col-lg-12 px-md-4">
            <MDBContainer fluid className="mt-2">
              <MDBRow className="d-flex flex-column">
                {videos &&
                  videos.length > 0 &&
                  videos.map((video, index) => (
                    <BannerVidHoverPlay key={index} videoSrc={video} />
                  ))}
              </MDBRow>
              <MDBRow></MDBRow>
            </MDBContainer>
          </main>
        </div>
      </MDBContainer>
    </>
  );
};

export default Custom404;
