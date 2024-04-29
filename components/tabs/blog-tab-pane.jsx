import React from "react";
import {
  MDBTabsPane,
  MDBTypography,
  MDBListGroup,
  MDBListGroupItem,
  MDBRow,
  MDBCol,
  MDBContainer,
} from "mdb-react-ui-kit";

function BlogTabPane({ index, fillActive, name, data }) {
  return (
    <MDBTabsPane open={fillActive === `tab${index}`} className="mt-5">
      <MDBContainer className="d-flex justify-content-start ps-0 ms-0 mb-5">
        <MDBTypography tag="h1" className="ms-0 ps-0 pe-3 noto-display-h1">
          {name}
        </MDBTypography>
        <MDBTypography tag="p" className="text-muted pt-2">
          {data.altname}
        </MDBTypography>
      </MDBContainer>
      <MDBRow>
        <MDBCol className="mb-4 col-lg-12 col-xl-6 px-3">
          <MDBTypography tag="h3">Goals</MDBTypography>
          <MDBListGroup light numbered style={{ minWidth: "22rem" }}>
            {data.goals.map((goal, index) => (
              <MDBListGroupItem
                key={index}
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">{goal.split(" ")[0]}</div>
                  {goal.split(" ").slice(1).join(" ")}
                </div>
              </MDBListGroupItem>
            ))}
          </MDBListGroup>
        </MDBCol>
        <MDBCol className="mb-4 col-lg-12 col-xl-6 px-3">
          <MDBTypography tag="h3">Associated Components</MDBTypography>
          <MDBListGroup light numbered style={{ minWidth: "22rem" }}>
            {data.components.map((component, index) => (
              <MDBListGroupItem
                key={index}
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">{component.split(" ")[0]}</div>
                  {component.split(" ").slice(1).join(" ")}
                </div>
              </MDBListGroupItem>
            ))}
          </MDBListGroup>
        </MDBCol>
        <MDBCol className="mb-4 col-lg-12 col-xl-12 px-3">
          <MDBTypography tag="h3">Examples</MDBTypography>
          <MDBListGroup light numbered style={{ minWidth: "22rem" }}>
            {data.examples.map((example, index) => (
              <MDBListGroupItem
                key={index}
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">{example.split(" ")[0]}</div>
                  {example.split(" ").slice(1).join(" ")}
                </div>
              </MDBListGroupItem>
            ))}
          </MDBListGroup>
        </MDBCol>
      </MDBRow>
    </MDBTabsPane>
  );
}

export default BlogTabPane;
