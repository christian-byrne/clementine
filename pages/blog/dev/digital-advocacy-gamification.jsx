import {
  MDBContainer,
  MDBRow,
  MDBTypography,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
  MDBAccordion,
  MDBAccordionItem,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBIcon,
  MDBTabsPane,
  MDBProgress,
  MDBProgressBar,
} from "mdb-react-ui-kit";
import React, { useState, useEffect } from "react";
import advocacyMechanics from "@/data/blog/gamification/game-mechanics/digital-advocacy-mechanics";
import BlogTab from "@/components/tabs/blog-tab";
import BlogTabPane from "@/components/tabs/blog-tab-pane";
import { padNumber } from "@/utils/padNumber";
import Confetti from "react-confetti";

function DigitalAdvocacyGamificationPage() {
  const [screenWidth, setScreenWidth] = useState(null);
  const [fillActiveTabCard, setFillActiveTabCard] = useState("tab1");
  let readArray = [];
  for (let i = 0; i < Object.keys(advocacyMechanics).length; i++) {
    if (i == 0) {
      readArray.push(true);
    } else {
      readArray.push(false);
    }
  }
  const [read, setRead] = useState(readArray);
  const [progressWidth, setProgressWidth] = useState(0);
  const [confetti, setConfetti] = useState(false);

  const updateProgress = () => {
    let count = 0;
    read.forEach((value) => {
      if (value) {
        count++;
      }
    });
    setProgressWidth((count / read.length) * 100);

    if (count === read.length) {
      setConfetti(true);

      setTimeout(() => {
        setConfetti(false);
      }, 4200);
    }
  };

  const setTabAsRead = (index) => {
    let tempRead = [...read];
    tempRead[index] = true;
    setRead(tempRead);
    console.log(read);
  };

  const [fillActive, setFillActive] = useState("tab0");

  const handleFillClick = (value) => {
    if (value === fillActive) {
      return;
    }

    setFillActive(value);
  };

  useEffect(() => {
    updateProgress();
  }, [read]);

  // Use conditional check to ensure that only accessing window object in the browser
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    if (typeof window !== "undefined") {
      setScreenWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  });

  return (
    <MDBContainer fluid className="mt-5 mb-6">
      <MDBTypography
        tag="div"
        className="display-1 py-5 my-2 text-center noto-display-h1"
      >
        Gamification & Digital Advocacy
      </MDBTypography>
      <MDBRow className="m-4 p-2 mb-0">
        {/* <MDBTypography tag="h5" className="pt-4 mt-4 pb-2 ps-1">
          Game Mechanics used in Digital Advocacy Gamification
        </MDBTypography> */}
        <MDBProgress>
          <MDBProgressBar
            striped
            animated
            width={progressWidth}
            valuemin={0}
            valuemax={100}
          />
        </MDBProgress>
        {confetti && screenWidth > 768 ? (
          <Confetti
            width={screenWidth}
            height={screenWidth}
            recycle={false}
            numberOfPieces={200}
            gravity={0.2}
          />
        ) : (
          ""
        )}
      </MDBRow>
      <MDBRow className="mx-4 px-2 mt-0 pt-0 mb-4 text-end">
        <MDBTypography className="py-1 mt-1 mb-0 text-muted small">
          {progressWidth < 100 ? (
            <>
              Read {progressWidth.toPrecision(2)}%. Keep Going! &nbsp;
              <MDBIcon fas icon="rocket" />
            </>
          ) : (
            <>
              You've read all the game mechanics. Great job! &nbsp;
              <MDBIcon fas icon="check-circle" className="text-success" />{" "}
            </>
          )}
        </MDBTypography>
      </MDBRow>
      <MDBRow className="m-4 mt-5 p-2">
        <MDBTabs fill className="mb-3">
          {Object.keys(advocacyMechanics).map((mechanic, index) => (
            <BlogTab
              key={index}
              index={index}
              handleFillClick={handleFillClick}
              fillActive={fillActive}
              name={mechanic}
              data={advocacyMechanics[mechanic]}
              clickHandler={setTabAsRead}
            />
          ))}
        </MDBTabs>

        <MDBTabsContent>
          {Object.keys(advocacyMechanics).map((mechanic, index) => (
            <BlogTabPane
              key={index}
              index={index}
              fillActive={fillActive}
              name={mechanic}
              data={advocacyMechanics[mechanic]}
            />
          ))}
        </MDBTabsContent>
      </MDBRow>
    </MDBContainer>
  );
}

export default DigitalAdvocacyGamificationPage;
