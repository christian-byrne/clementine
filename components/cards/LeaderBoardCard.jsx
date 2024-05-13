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
import { camelCaseToTitle } from "@/utils/camelCaseToTitle";
import SocialStatsBadges from "@/components/badges/SocialStatsBadges";
import { padNumber } from "@/utils/padNumber";
import pathFormat from "@/utils/pathFormat";

function LeaderBoardCard({
  sortField,
  visibleColumns,
  maxRows,
  leaderBoardName,
  description,
  socialBadges,
  containerClassName = "col-md-12 col-lg-6 col-sm-12 my-3",
}) {
  const [leaderBoardData, setLeaderBoardData] = useState([]);
  const [numVisibleBadges, setNumVisibleBadges] = useState(1);
  const [overflowX, setOverflowX] = useState("visible");

  const adjustNumVisibleBadges = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth > 2150) {
      setNumVisibleBadges(3);
    } else if (windowWidth > 1950) {
      setNumVisibleBadges(2);
    } else {
      setNumVisibleBadges(1);
    }
  };

  const adjustOverflowX = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth < 1700) {
      setOverflowX("hidden");
    } else {
      setOverflowX("visible");
    }
  };

  useEffect(() => {
    adjustNumVisibleBadges();
    adjustOverflowX();

    const handleResize = () => {
      adjustNumVisibleBadges();
      adjustOverflowX();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchSortedUsers = async () => {
      try {
        const response = await fetch(
          `/api/get/users/sorted-n?sortField=${sortField}&count=${maxRows}`
        );
        const data = await response.json();
        setLeaderBoardData(data);
      } catch (error) {
        console.error("Error fetching sorted users:", error);
      }
    };

    fetchSortedUsers();
  }, [sortField]);

  return (
    leaderBoardData?.length > 0 && (
      <MDBContainer className={containerClassName}>
        <MDBCard
          className="h-100 d-flex d-column"
          style={{ overflowX: overflowX }}
        >
          <MDBCardTitle className="mt-4 ms-3 mb-1 h2">
            &nbsp;{leaderBoardName || "Leaderboard"}
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
                {leaderBoardData?.length > 0 &&
                  leaderBoardData.slice(1, maxRows).map((member, index) => {
                    let backgroundColorStyle = {};
                    if (index === 0) {
                      backgroundColorStyle = {
                        backgroundColor: "rgba(255, 248, 208, .52",
                      };
                    } else if (index === 1) {
                      backgroundColorStyle = {
                        backgroundColor: "rgba(244, 233, 230, .5)",
                      };
                    } else if (index === 2) {
                      backgroundColorStyle = {
                        backgroundColor: "rgba(255, 218, 208, .2)",
                      };
                    }

                    return (
                      <tr key={index} style={backgroundColorStyle}>
                        {/** first, the name/picture column */}
                        {member.name && (
                          <td key={index} className="clickable">
                            <div className="d-flex align-items-center">
                              <a
                                href={pathFormat(
                                  "user/" +
                                    member.name
                                      .replaceAll(" ", "-")
                                      .toLowerCase()
                                )}
                                style={{
                                  color: "inherit",
                                  textDecoration: "inherit",
                                }}
                              >
                                <img
                                  src={pathFormat(
                                    "pictures/pfps/" +
                                      member["name"]
                                        .replaceAll(" ", "-")
                                        .toLowerCase() +
                                      "-3.png"
                                  )}
                                  alt=""
                                  style={{ width: "80px", height: "80px" }}
                                  className="rounded-circle"
                                />
                              </a>
                              <a
                                href={pathFormat(
                                  "user/" +
                                    member.name
                                      .replaceAll(" ", "-")
                                      .toLowerCase()
                                )}
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
                        <td className="px-0 pt-4 pb-2">
                          <SocialStatsBadges
                            userData={leaderBoardData[index]}
                            fields={socialBadges}
                            style={{ flexWrap: "nowrap" }}
                            numVisibleBadges={numVisibleBadges}
                          />
                        </td>
                        {visibleColumns?.length > 0 &&
                          visibleColumns.map((column, index) => {
                            const cellData = member[column];
                            const cellContent =
                              typeof cellData === "number" || column == "views"
                                ? padNumber(cellData, 4)
                                : cellData || "";
                            return <td key={index}>{cellContent}</td>;
                          })}
                      </tr>
                    );
                  })}
              </MDBTableBody>
            </MDBTable>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    )
  );
}

export default LeaderBoardCard;
