import {
  MDBContainer,
  MDBRow,
  MDBTypography,
  MDBTabs,
  MDBTabsContent,
  MDBIcon,
  MDBProgress,
  MDBProgressBar,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";
import React, { useState, useEffect } from "react";
import advocacyMechanics from "@/data/blog/gamification/game-mechanics/digital-advocacy-mechanics";
import BlogTab from "@/components/tabs/blog-tab";
import BlogTabPane from "@/components/tabs/blog-tab-pane";
import Confetti from "react-confetti";

function DigitalAdvocacyGamificationPage() {
  const [screenWidth, setScreenWidth] = useState(null);
  const [fillActiveTabCard, setFillActiveTabCard] = useState("tab1");
  const [haveReadAll, setHaveReadAll] = useState(false);
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
      setHaveReadAll(true);

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
      {/* Title */}
      <MDBTypography
        tag="div"
        className="display-1 py-5 my-2 text-center noto-display-h1"
      >
        Gamification & Digital Advocacy
      </MDBTypography>

      {/* Note */}
      {!haveReadAll && (
        <MDBContainer
          fluid
          className="d-flex flex-column justify-content-center mt-3"
        >
          <MDBContainer className="col-md-5 col-lg-4 col-xl-3 col-sm-10 d-flex align-items-flex-start flex-column ms-0">
            <MDBTypography note noteColor="light">
              <strong>Complete</strong> 100% on the progress bar below to see a
              special animation 🎉
            </MDBTypography>
          </MDBContainer>
          {/* <MDBContainer className="col-md-5 col-lg-4 col-xl-3 col-sm-10 d-flex align-items-flex-start flex-column ms-0">
          <MDBTypography note noteColor="light">
            Mechanics I found used on <strong>Social Media</strong> have{" "}
            <span className="text-primary text-bold">blue</span> titles and
            further details
          </MDBTypography>
        </MDBContainer> */}
        </MDBContainer>
      )}

      {/* Content */}
      <MDBRow className="m-4 p-2 mb-0">
        <MDBTypography tag="p" className="text-muted mb-4">
          <strong>What is Gamification</strong> &nbsp;&nbsp; Gamification, the
          integration of game-elements into non-game contexts, has surged in
          recent years, facilitated by the widespread adoption of digital
          platforms like social media.
          <br></br>
          <br></br>
          <strong>Applied to Advocacy</strong> &nbsp;&nbsp; While businesses
          have long employed game-design elements for marketing, civic actors,
          including nonprofits, are now embracing gamification to achieve
          various goals such as raising awareness and fundraising.
          <br></br>
          <br></br>
          <strong>Historical Context</strong> &nbsp;&nbsp; This crossover
          between game elements and advocacy isn't entirely new, as <em>games</em> aiming
          for social change have roots dating back decades. These games aim to
          raise awareness and critique certain issues, such as corporate
          practices or political decisions. However, there is a difference between games meant to raise awareness and the use of game elements in non-game advocacy initiatives.
          <br></br>
          <br></br>
          <strong>Popularity Increasing with Tech</strong> &nbsp;&nbsp; This
          trend is altering civic advocacy by supplementing traditional
          strategies with mobile applications and design thinking, promising
          increased engagement and collaboration for social causes.
          Technological advancements have facilitated the spread of gamified
          advocacy, with various platforms and devices enabling broader audience
          engagement
          <br></br>
          <br></br>
          <strong>Drawbacks</strong> &nbsp;&nbsp; Challenges arise, including
          concerns about security, inclusivity, and the effectiveness of
          gamification in driving meaningful social change.
          <br></br>
        </MDBTypography>
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
      <hr className="hr" />
      <MDBRow className="m-4 mt-5 p-2">
        <MDBTypography
          tag="h1"
          className="display-5 noto-display-h1 mb-3 py-1 ps-0"
        >
          Successes, Failures, and Innovations
        </MDBTypography>

        <MDBTypography tag="h2" className="pt-3 mb-2">
          Successes
        </MDBTypography>
        <MDBListGroup>
          <MDBListGroupItem>
            Platforms like Crowdrise that have raised millions of dollars for
            nonprofits through gamified fundraising
          </MDBListGroupItem>
          <MDBListGroupItem>
            Initiatives like the TGL Awards that have recognized and celebrated
            civic pro bono work and engaged participants in workshops
          </MDBListGroupItem>
          <MDBListGroupItem>
            Games like Zombies, Run! that have motivated users to exercise and
            adopt healthier habits
          </MDBListGroupItem>
          <MDBListGroupItem>
            Platforms like OpenIDEO that have hosted design challenges and
            invited users to collaborate on solutions to global challenges
          </MDBListGroupItem>
        </MDBListGroup>

        <MDBTypography tag="h2" className="pt-3 my-2">
          Failures
        </MDBTypography>
        <MDBListGroup>
          <MDBListGroupItem>
            Initiatives that have failed to sustain long-term engagement and
            commitment among participants
          </MDBListGroupItem>
          <MDBListGroupItem>
            Platforms that have struggled to attract a diverse and inclusive
            audience
          </MDBListGroupItem>
          <MDBListGroupItem>
            Games that have failed to drive meaningful social change or impact
          </MDBListGroupItem>
          <MDBListGroupItem>
            Platforms that were not inclusive and respectful of participants'
            rights and privacy and furthered the digital divide
          </MDBListGroupItem>
        </MDBListGroup>

        <MDBTypography tag="h2" className="pt-3 my-2">
          Innovations
        </MDBTypography>
        <MDBListGroup>
          <MDBListGroupItem>
            Platforms that have integrated with existing social networks and
            platforms to facilitate social sharing and engagement through viral
            trends and challenges
          </MDBListGroupItem>
          <MDBListGroupItem>
            Initiatives that have combined gamification with storytelling and
            narrative to create immersive experiences
          </MDBListGroupItem>
          <MDBListGroupItem>
            Platforms that have leveraged social media and digital technologies
            to engage a wider audience and previously unreached demographics
          </MDBListGroupItem>
        </MDBListGroup>
      </MDBRow>

      <MDBRow className="m-4 mt-5 p-2">
        <MDBTypography
          tag="h1"
          className="display-5 noto-display-h1 mb-3 py-1 ps-0"
        >
          Discussion
        </MDBTypography>
        <MDBTypography tag="h2" className="pt-3 mb-2">
          Implications
        </MDBTypography>

        <MDBTypography tag="p" className="mb-4">
          Gamification has the potential to revolutionize advocacy efforts by
          engaging a wider audience, fostering collaboration and community, and
          driving meaningful social change. By leveraging game-design elements
          and digital technologies, civic actors can create immersive and
          interactive experiences that motivate and inspire participants to take
          action. Gamification can help raise awareness, mobilize resources, and
          amplify the impact of advocacy efforts. It can also foster a sense of
          ownership and pride among participants, encouraging them to become
          more engaged and committed to the cause. Overall, gamification has the
          power to transform advocacy by making it more engaging, interactive,
          and effective.
        </MDBTypography>

        <MDBTypography tag="h2" className="pt-3 mb-2">
          Moral Considerations
        </MDBTypography>

        <MDBTypography tag="p" className="mb-4">
          The use of gamification in advocacy raises ethical questions about
          privacy, security, and inclusivity. It is essential to consider the
          potential risks and drawbacks of gamification, such as algorithmic
          biases, privacy concerns, and the digital divide. Civic actors must
          ensure that gamified advocacy initiatives are transparent, inclusive,
          and respectful of participants' rights and privacy. They must also be
          mindful of the unintended consequences of gamification, such as
          reinforcing stereotypes or perpetuating harmful behaviors. By adopting
          ethical guidelines and best practices, civic actors can harness the
          power of gamification to drive positive social change while upholding
          ethical standards and values.
        </MDBTypography>

        <MDBTypography tag="h2" className="pt-3 mb-2">
          Opportunities
        </MDBTypography>

        <MDBTypography tag="p" className="mb-4">
          There are many opportunities for gamification in advocacy that have
          not been fully realized. For example, gamification could be used to
          promote civic engagement and political participation by encouraging
          users to vote, contact their representatives, or participate in
          community events. Gamification could also be used to raise awareness
          about social issues and inspire action by creating immersive and
          interactive experiences that educate and inform the public.
          Additionally, gamification could be used to foster collaboration and
          cooperation among participants by creating challenges and rewards that
          encourage teamwork and collective action. By exploring new and
          innovative ways to gamify advocacy efforts, civic actors can unlock
          the full potential of gamification to drive social change and create a
          more just and equitable society.
        </MDBTypography>

        <MDBTypography tag="h2" className="pt-3 mb-2">
          Conclusion
        </MDBTypography>

        <MDBTypography tag="p" className="mb-4">
          Positive impacts of gamification in advocacy include increased
          engagement and participation, enhanced collaboration and community
          building, and greater awareness and support for social causes.
          Gamification can motivate and inspire participants to take action,
          drive meaningful social change, and amplify the impact of advocacy
          efforts. However, there are also negative impacts of gamification that
          should be addressed, such as privacy concerns, algorithmic biases, and
          the digital divide. Civic actors must be mindful of the potential
          risks and drawbacks of gamification and take steps to mitigate them.
          By adopting ethical guidelines and best practices, civic actors can
          ensure that gamified advocacy initiatives are transparent, inclusive,
          and respectful of participants' rights and privacy. They can also
          leverage the power of gamification to create positive social change
          while upholding ethical standards and values.
        </MDBTypography>
      </MDBRow>
    </MDBContainer>
  );
}

export default DigitalAdvocacyGamificationPage;
