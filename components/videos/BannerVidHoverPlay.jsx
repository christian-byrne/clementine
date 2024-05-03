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
    className="col-12 p-0 m-0 dynamic-height-col"
    >
      <video
        src={pathFormat("videos/animated-pics/" + videoSrc)}
        loop
        muted
        className="video px-0 py-1 m-0 rounded-6"
        ref={videoRef}
      />
    </MDBCol>
  );
}

export default BannerVidHoverPlay;
