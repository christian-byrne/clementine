import React, { useRef } from "react";
import { MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";

function BannerVidHoverPlay({ videoSrc }) {
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    videoRef.current.play();
  };

  const handleMouseLeave = () => {
    videoRef.current.pause();
  };

  return (
    <MDBCol
    // style={{ height: "calc(40vh - 56px)", width: "100%"}}
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
    >
      <video
        src={process.env.PUBLIC_URL + "/videos/animated-pics/" + videoSrc}
        loop
        muted
        // className="video"
        className="video p-0 m-0 dynamic-height-col"
        ref={videoRef}
      />
    </MDBCol>
  );
}

export default BannerVidHoverPlay;
