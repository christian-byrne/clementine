import { useRef } from "react";
import { MDBCol } from "mdb-react-ui-kit";
import pathFormat from "@/utils/pathFormat";

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
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
    >
      <video
        src={pathFormat("videos/animated-pics/" + videoSrc)}
        loop
        muted
        className="video p-0 m-0 dynamic-height-col"
        ref={videoRef}
      />
    </MDBCol>
  );
}

export default BannerVidHoverPlay;
