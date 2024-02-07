import React from "react";
import {
  MDBContainer,
  MDBCard,
  MDBCardTitle,
  MDBCardBody,
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import { camelCaseToTitle } from "../utils/camelCaseToTitle";
import PlaceholderImg from "../data/placeholder-image.json";

function LeaderBoardCard({ leaderBoardData }) {
  return (
    leaderBoardData &&
    leaderBoardData.members &&
    leaderBoardData.members.length > 0 && (
      <MDBContainer className="col-md-6 col-lg-6 col-sm-12 my-3">
        <MDBCard className="h-100 d-flex d-column">
          <MDBCardTitle className="mt-4 ms-4">
            <h2>&nbsp;{leaderBoardData.name || ""}</h2>
          </MDBCardTitle>
          <MDBCardBody>
            <MDBTable align="middle">
              <MDBTableHead>
                <tr>
                  {leaderBoardData.columns &&
                    leaderBoardData.columns.length > 0 &&
                    leaderBoardData.columns.map((column, index) => (
                      <th key={index} scope="col">
                        {camelCaseToTitle(column)}
                      </th>
                    ))}
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {leaderBoardData.members &&
                  leaderBoardData.members.length > 0 &&
                  leaderBoardData.members.map((member, index) => (
                    <tr key={index}>
                      {leaderBoardData.columns &&
                        leaderBoardData.columns.length > 0 &&
                        leaderBoardData.columns.map((column, index) => (
                          <>
                            {column.includes("name") ? (
                              <td key={index}>
                                <div className="d-flex align-items-center">
                                  <img
                                    src={
                                      member["profilePicSrc"] ||
                                      PlaceholderImg.src
                                    }
                                    alt=""
                                    style={{ width: "45px", height: "45px" }}
                                    className="rounded-circle"
                                  />
                                  <div className="ms-3">
                                    <p className="fw-bold mb-1">
                                      {member["username"] || member[column] || ""}
                                    </p>
                                    <p className="text-muted mb-0">
                                      {member[column] || ""}
                                    </p>
                                  </div>
                                </div>
                              </td>
                            ) : (
                              <td key={index}>{member[column] || ""}</td>
                            )}
                          </>
                        ))}
                    </tr>
                  ))}

                <tr>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src="https://mdbootstrap.com/img/new/avatars/8.jpg"
                        alt=""
                        style={{ width: "45px", height: "45px" }}
                        className="rounded-circle"
                      />
                      <div className="ms-3">
                        <p className="fw-bold mb-1">John Doe</p>
                        <p className="text-muted mb-0">john.doe@gmail.com</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="fw-normal mb-1">Software engineer</p>
                    <p className="text-muted mb-0">IT department</p>
                  </td>
                  <td>
                    <MDBBadge color="success" pill>
                      Active
                    </MDBBadge>
                  </td>
                  <td>Senior</td>
                  <td>
                    <MDBBtn color="link" rounded size="sm">
                      Edit
                    </MDBBtn>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src="https://mdbootstrap.com/img/new/avatars/6.jpg"
                        alt=""
                        style={{ width: "45px", height: "45px" }}
                        className="rounded-circle"
                      />
                      <div className="ms-3">
                        <p className="fw-bold mb-1">Alex Ray</p>
                        <p className="text-muted mb-0">alex.ray@gmail.com</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="fw-normal mb-1">Consultant</p>
                    <p className="text-muted mb-0">Finance</p>
                  </td>
                  <td>
                    <MDBBadge color="primary" pill>
                      Onboarding
                    </MDBBadge>
                  </td>
                  <td>Junior</td>
                  <td>
                    <MDBBtn color="link" rounded size="sm">
                      Edit
                    </MDBBtn>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src="https://mdbootstrap.com/img/new/avatars/7.jpg"
                        alt=""
                        style={{ width: "45px", height: "45px" }}
                        className="rounded-circle"
                      />
                      <div className="ms-3">
                        <p className="fw-bold mb-1">Kate Hunington</p>
                        <p className="text-muted mb-0">
                          kate.hunington@gmail.com
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="fw-normal mb-1">Designer</p>
                    <p className="text-muted mb-0">UI/UX</p>
                  </td>
                  <td>
                    <MDBBadge color="warning" pill>
                      Awaiting
                    </MDBBadge>
                  </td>
                  <td>Senior</td>
                  <td>
                    <MDBBtn color="link" rounded size="sm">
                      Edit
                    </MDBBtn>
                  </td>
                </tr>
              </MDBTableBody>
            </MDBTable>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    )
  );
}

export default LeaderBoardCard;
