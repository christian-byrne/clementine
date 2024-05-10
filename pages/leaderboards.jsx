import React, { useEffect } from "react";
import { MDBContainer, MDBRow } from "mdb-react-ui-kit";
import LeaderBoardCard from "@/components/cards/LeaderBoardCard";
import formatDocTitle from "@/utils/formatDocTitle";

function LeaderBoardPage() {
  useEffect(() => {
    document.title = formatDocTitle("Leaderboards");
  }, []);

  return (
    <MDBContainer fluid>
      <MDBRow>
        <main role="main" className="col-md-12 ms-sm-auto col-lg-12 px-md-4">
          <MDBContainer fluid className="mt-5">
            <MDBRow>
              <LeaderBoardCard
                leaderBoardName={"Style Stars"}
                description={"Users who have the most motion"}
                sortField={"views"}
                visibleColumns={["views"]}
                maxRows={10}
                socialBadges={["likes", "downloads", "favorites"]}
              />
              <LeaderBoardCard
                leaderBoardName={"Most Influential"}
                description={
                  "Creators whose stylists get downloaded and used the most"
                }
                sortField={"downloads"}
                visibleColumns={["location"]}
                maxRows={10}
                socialBadges={["likes", "favorites", "downloads"]}
              />
              <LeaderBoardCard
                leaderBoardName={"Front-Runners"}
                description={"Creators with the highest average rating"}
                sortField={"averagerating"}
                visibleColumns={["totalratings", "favorites"]}
                maxRows={10}
                socialBadges={["likes", "favorites"]}
              />
              <LeaderBoardCard
                leaderBoardName={"Chart-Toppers"}
                description={"Most prolific - Creators with the most models"}
                sortField={"modelcount"}
                visibleColumns={["modelcount", "joindate"]}
                maxRows={10}
                socialBadges={["totalratings", "downloads"]}
              />
              <LeaderBoardCard
                leaderBoardName={"Most Decorated"}
                description={
                  "Users with the most badges, titles, and achievements"
                }
                sortField={"awards"}
                visibleColumns={[
                  "badgecount",
                  "titlecount",
                  "achievementcount",
                ]}
                maxRows={10}
                socialBadges={["downloads"]}
              />
              <LeaderBoardCard
                leaderBoardName={"Hall of Fame"}
                description={"Veterans who never fell off"}
                sortField={"joindate"}
                visibleColumns={["joindate", "lastactive"]}
                maxRows={10}
                socialBadges={["favorites"]}
              />
            </MDBRow>
            <MDBRow></MDBRow>
          </MDBContainer>
        </main>
      </MDBRow>
    </MDBContainer>
  );
}

export default LeaderBoardPage;
