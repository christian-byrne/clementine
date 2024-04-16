import React, { useState } from "react";
// import SilhouetteCard from "@/components/silhouette/SilhouetteCard";
import { MDBTypography, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import silhouetteSketches from "@/data/sketches/silhouettes";
import dynamic from "next/dynamic";

const SilhouetteCard = dynamic(
  () => import("@/components/silhouette/SilhouetteCard"),
  {
    ssr: false,
  }
);

export default function SilhouettePage() {
  const [visibleCards, setVisibleCards] = useState(
    Array(silhouetteSketches.length).fill(true)
  );

const toggleVisibility = (index) => {
  setVisibleCards((prev) => {
    // Create a copy of the previous state array
    const updated = [...prev];

    // Toggle the visibility state for all elements except the one at 'index'
    for (let i = 0; i < updated.length; i++) {
      if (i !== index) {
        updated[i] = !updated[i]; // Flip the visibility state
      }
    }

    return updated; // Return the updated state array
  });
};
  return (
    <MDBContainer fluid className="mt-5">
      <MDBTypography
        tag="div"
        className="display-1 pb-3 mb-4 text-center noto-display-h1"
      >
        Fashionable Silhouettes
      </MDBTypography>
      <MDBContainer fluid className="d-flex justify-content-center">
        <MDBTypography className="text-muted">
          <strong>Hover</strong> over silhouettes to see examples
        </MDBTypography>
      </MDBContainer>
      <MDBRow className="mt-4 row-eq-height">
        {silhouetteSketches.map((sketch, index) => (
          <SilhouetteCard
            key={index}
            sketchData={sketch}
            index={index}
            toggleFn={toggleVisibility}
            visible={visibleCards[index]}
          />
        ))}
      </MDBRow>
    </MDBContainer>
  );
}
