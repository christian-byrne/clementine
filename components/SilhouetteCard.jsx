import React, { useState, useEffect } from "react";
import {
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBTable,
  MDBInput,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import SilhouetteSketch from "./SilhouetteSketch";
import { camelCaseToTitle } from "@/utils/camelCaseToTitle";

function SilhouetteCard({ sketchData }) {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth / 5 : 400
  );
  const [updatedSketchData, setUpdatedSketchData] = useState(sketchData);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setWindowWidth(window.innerWidth / 5);
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []); // Empty dependency array ensures that this effect only runs once

  const handleInputChange = (key, value) => {
    setUpdatedSketchData({
      ...updatedSketchData,
      [key]: value,
    });
  };

  return (
    <MDBCol style={{ width: windowWidth }}>
      <MDBCard className="h-100">
        <MDBCardBody className="d-flex flex-column justify-content-end">
          <MDBCardTitle className="text-center mb-3 h-100">
            {sketchData.name ? camelCaseToTitle(sketchData.name) : "Silhouette"}
          </MDBCardTitle>
          <SilhouetteSketch
            containerSize={{ width: windowWidth, height: windowWidth }}
            sketchProportions={
              updatedSketchData.name ? updatedSketchData : sketchData
            }
          />
        </MDBCardBody>
        <MDBTable align="middle">
          <MDBTableHead light>
            <tr>
              <th scope="col">Ratio</th>
              <th scope="col">Value</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {Object.keys(sketchData).map((key, index) => {
              if (key !== "name" && key !== "examples") {
                return (
                  <tr key={index}>
                    <th scope="col">{camelCaseToTitle(key)}</th>
                    <td>
                      <MDBInput
                        type="number"
                        label={sketchData[key]}
                        onChange={(e) => handleInputChange(key, e.target.value)}
                        step="0.05"
                      />
                    </td>
                  </tr>
                );
              }
            })}
          </MDBTableBody>
        </MDBTable>
      </MDBCard>
    </MDBCol>
  );
}

export default SilhouetteCard;
