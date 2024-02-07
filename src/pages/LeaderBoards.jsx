import React, { useEffect } from "react";
import { MDBContainer, MDBRow } from "mdb-react-ui-kit";
import LeaderBoardCard from "../components/LeaderBoardCard";
import leaderBoardCreators from "../data/leaderboards/top-creators.json";

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
              <LeaderBoardCard leaderBoardData={leaderBoardCreators} />
              <LeaderBoardCard leaderBoardData={leaderBoardCreators} />
              <LeaderBoardCard leaderBoardData={leaderBoardCreators} />
              <LeaderBoardCard leaderBoardData={leaderBoardCreators} />
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
