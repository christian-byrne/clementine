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
  MDBCollapse,
  MDBBtn,
} from "mdb-react-ui-kit";
// import SilhouetteSketch from "./SilhouetteSketch";
import { camelCaseToTitle } from "@/utils/camelCaseToTitle";
import dynamic from "next/dynamic";

const SilhouetteSketch = dynamic(() => import("./SilhouetteSketch"), {
  ssr: false,
});

function SilhouetteCard({ sketchData, index, toggleFn, visible }) {
  const BREAKPOINT = 600;

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth / 5 : 400
  );
  const [updatedSketchData, setUpdatedSketchData] = useState(sketchData);
  const [tableExpanded, setTableExpanded] = useState(false);

  const handleToggle = () => {
    toggleFn(index);
    setTableExpanded(!tableExpanded);
  };

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
    visible && (
      <MDBCol
        // style={{ width: windowWidth }}
        className={
          (tableExpanded
            ? "col-lg-12"
            : windowWidth > BREAKPOINT
            ? "col-lg-4"
            : "col-lg-6") +
          " col-md-12 col-sm-12 mb-lg-2 p-xl-2 p-xxl-3 p-md-1 mb-md-1"
        }
      >
        <MDBCard className="h-100">
          <MDBCardBody className="d-flex flex-column justify-content-end">
            <MDBCardTitle className="text-center mb-3 h-100">
              {sketchData.name
                ? camelCaseToTitle(sketchData.name)
                : "Silhouette"}
            </MDBCardTitle>
            <SilhouetteSketch
              containerSize={{
                width: windowWidth > BREAKPOINT ? windowWidth : windowWidth * 2,
                height:
                  windowWidth > BREAKPOINT ? windowWidth : windowWidth * 2,
              }}
              sketchProportions={
                updatedSketchData.name ? updatedSketchData : sketchData
              }
            />
          </MDBCardBody>
          <MDBBtn tag="a" onClick={handleToggle} color="secondary" className="mx-4 mb-3">
            {tableExpanded ? "Fewer Details" : "Details"}
          </MDBBtn>
          <MDBCollapse open={tableExpanded}>
            <MDBTable align="middle" responsive>
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
                            onChange={(e) =>
                              handleInputChange(key, e.target.value)
                            }
                            step="0.05"
                          />
                        </td>
                      </tr>
                    );
                  }
                })}
              </MDBTableBody>
            </MDBTable>
          </MDBCollapse>
        </MDBCard>
      </MDBCol>
    )
  );
}

export default SilhouetteCard;
