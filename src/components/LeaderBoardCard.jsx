import React, { useEffect, useState } from "react";
import {
  MDBContainer,
  MDBCard,
  MDBCardTitle,
  MDBCardBody,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBCardText,
} from "mdb-react-ui-kit";
import { camelCaseToTitle } from "../utils/camelCaseToTitle";
import SocialStatsBadges from "./SocialStatsBadges";

function LeaderBoardCard({
  leaderBoardData,
  visibleColumns,
  maxRows,
  leaderBoardName,
  description,
}) {
  const sortedData = leaderBoardData ? leaderBoardData : [];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 992) {
        setNumVisibleColumns(4);
      } else if (window.innerWidth > 768) {
        setNumVisibleColumns(3);
      } else {
        setNumVisibleColumns(5);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [numVisibleColumns, setNumVisibleColumns] = useState(
    visibleColumns.length || 4
  ); // Initial number of visible columns is 4

  return (
    leaderBoardData &&
    leaderBoardData.members &&
    leaderBoardData.members.length > 0 && (
      <MDBContainer className="col-md-12 col-lg-6 col-sm-12 my-3">
        <MDBCard
          className="h-100 d-flex d-column"
          style={{ overflowX: "scroll" }}
        >
          <MDBCardTitle className="mt-4 ms-3 mb-1">
            <h2>
              &nbsp;{leaderBoardName || leaderBoardData.name || "Leaderboard"}
            </h2>
          </MDBCardTitle>
          {description && (
            <MDBCardText className="ms-4 mb-4 text-muted">
              {description}
            </MDBCardText>
          )}
          <MDBCardBody>
            <MDBTable align="middle">
              <MDBTableHead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Social Stats</th>
                  {visibleColumns &&
                    visibleColumns.length > 0 &&
                    visibleColumns.map((column, index) => (
                      <th key={index} scope="col">
                        {camelCaseToTitle(column)}
                      </th>
                    ))}
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {leaderBoardData.members &&
                  leaderBoardData.members.length > 0 &&
                  leaderBoardData.members
                    .slice(0, maxRows)
                    .map((member, index) => (
                      <tr
                        key={index}
                        style={
                          index == 0
                            ? { backgroundColor: "rgba(255, 248, 208, .52" }
                            : index == 1
                            ? { backgroundColor: "rgba(244, 233, 230, .5)" }
                            : index == 2
                            ? { backgroundColor: "rgba(255, 218, 208, .2)" }
                            : {}
                        }
                      >
                        {/** first, the name/picture column */}
                        {member.name && (
                          <td key={index} className="clickable">
                            <div className="d-flex align-items-center">
                              <a
                                href={
                                  "/" +
                                  member.name.replaceAll(" ", "-").toLowerCase()
                                }
                                style={{
                                  color: "inherit",
                                  textDecoration: "inherit",
                                }}
                              >
                                <img
                                  src={
                                    "pictures/pfps/" +
                                    member["name"]
                                      .replaceAll(" ", "-")
                                      .toLowerCase() +
                                    "-3.png"
                                  }
                                  alt=""
                                  style={{ width: "80px", height: "80px" }}
                                  className="rounded-circle"
                                />
                              </a>
                              <a
                                href={
                                  "/" +
                                  member.name.replaceAll(" ", "-").toLowerCase()
                                }
                                style={{
                                  color: "inherit",
                                  textDecoration: "inherit",
                                }}
                              >
                                <div className="ms-3">
                                  <p className="fw-bold mb-1">
                                    {member["username"] || member["name"] || ""}
                                  </p>
                                  <p className="text-muted mb-0">
                                    {member["name"] || ""}
                                  </p>
                                </div>
                              </a>
                            </div>
                          </td>
                        )}
                        {/** second, get the social stats badges and put them in a column */}
                        <td>
                          <SocialStatsBadges
                            {...member}
                            style={{ flexWrap: "nowrap" }}
                          />
                        </td>
                        {visibleColumns &&
                          visibleColumns.length > 0 &&
                          visibleColumns.map((column, index) => (
                            <>
                              <td key={index}>{member[column] || ""}</td>
                            </>
                          ))}
                      </tr>
                    ))}
              </MDBTableBody>
            </MDBTable>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    )
  );
}

export default LeaderBoardCard;
