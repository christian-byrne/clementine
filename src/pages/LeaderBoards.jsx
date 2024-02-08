import React, { useEffect } from "react";
import { MDBContainer, MDBRow } from "mdb-react-ui-kit";
import LeaderBoardCard from "../components/LeaderBoardCard";
import allUserData from "../data/users/all.json";

function sortByTargetColumn(data, targetColumn, targetOrder = "desc") {
  if (data && data.members) {
    const sortedMembers = [...data.members].sort((a, b) => {
      if (targetOrder === "asc") {
        return a[targetColumn] < b[targetColumn] ? -1 : 1;
      } else {
        return a[targetColumn] > b[targetColumn] ? -1 : 1;
      }
    });
    
    // Return a new object with sorted members array and other properties preserved
    return { ...data, members: sortedMembers };
  }
  
  // Return the original object if it doesn't contain members array
  return data;
}

function LeaderBoardPage() {
  useEffect(() => {
    document.title = "LeaderBoards";
  }, []);

  return (
    <MDBContainer fluid>
      <MDBRow>
        <main role="main" className="col-md-12 ms-sm-auto col-lg-12 px-md-4">
          <MDBContainer fluid className="mt-5">
            {/* LeaderBoard Cards for Micro-LeaderBoards */}
            <MDBRow>
              <LeaderBoardCard
                leaderBoardName={"Style Stars"}
                description={"Creators with the most views aka most motion aka most everything"}
                leaderBoardData={
                  sortByTargetColumn(allUserData, "views")}
                visibleColumns={[
                  "views",
                ]}
                maxRows={10}
              />
              <LeaderBoardCard
                leaderBoardName={"Most Influential"}
                description={"Creators whose stylists get downloaded and used the most"}
                leaderBoardData={
                  sortByTargetColumn(allUserData, "downloads")}
                visibleColumns={[
                  "location",
                ]}
                maxRows={10}
              />
              <LeaderBoardCard
                leaderBoardName={"Front-Runners"}
                description={"Creators with the highest average rating"}
                leaderBoardData={
                  sortByTargetColumn(allUserData, "averageRating")}
                visibleColumns={[
                  "averageRating",
                  "favorites"
                ]}
                maxRows={10}
              />
              <LeaderBoardCard
              leaderBoardName={"Chart-Toppers"}
                description={"Most prolific - Creators with the most models"}
                leaderBoardData={
                  sortByTargetColumn(allUserData, "modelCount")}
                visibleColumns={[
                  "modelCount",
                  "joinDate",
                ]}
                maxRows={10}
              />
              <LeaderBoardCard
              leaderBoardName={"Most Decorated"}
                description={"Users with the most badges, titles, and achievements"}
                leaderBoardData={
                  sortByTargetColumn(allUserData, "badgeCount")}
                visibleColumns={[
                  "badgeCount",
                  "titleCount",
                  "achievementCount"
                ]}
                maxRows={10}
              />
              <LeaderBoardCard
              leaderBoardName={"Hall of Fame"}
                description={"Veterans who never fell off"}
                leaderBoardData={
                  sortByTargetColumn(allUserData, "joinDate")}
                visibleColumns={[
                  "joinDate",
                  "lastActive",
                ]}
                maxRows={10}
              />
            </MDBRow>
            {/* Photos (User's) */}
            <MDBRow></MDBRow>
          </MDBContainer>
        </main>
      </MDBRow>
    </MDBContainer>
  );
}

export default LeaderBoardPage;
