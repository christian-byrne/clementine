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
  MDBTabsPane,
} from "mdb-react-ui-kit";
import React, { useState, useEffect } from "react";
import { padNumber } from "@/utils/padNumber";
import orderedMechanics from "@/data/blog/gamification/game-mechanics/game-mechanics";

function SocialMediaGamification() {
  const [showAll, setShowAll] = useState(true);
  const [showSocialMedia, setShowSocialMedia] = useState(false);
  const [hoveredCardIndex, setHoveredCardIndex] = useState(null);
  const [screenWidth, setScreenWidth] = useState(null);
  const [hiddenCardIndexes, setHiddenCardIndexes] = useState([]);
  const [fillActiveTabCard, setFillActiveTabCard] = useState("tab1");

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

  const cardSizesDefault = {
    // Bootstrap 4 breakpoints: xs: 0, sm: 576px, md: 768px, lg: 992px, xl: 1200px
    xs: 12,
    sm: 12,
    md: 6,
    lg: 3,
    xl: 2,
  };
  const cardSizesEnlarged = {
    xs: 12,
    sm: 12,
    md: 12,
    lg: 6,
    xl: 4,
  };
  const cardSizesDefaultString = Object.entries(cardSizesDefault)
    .map(([bootstrapSizeName, colSize]) => {
      return `col-${bootstrapSizeName}-${colSize}`;
    })
    .join(" ");
  const cardSizesEnlargedString = Object.entries(cardSizesEnlarged)
    .map(([bootstrapSizeName, colSize]) => {
      return `col-${bootstrapSizeName}-${colSize}`;
    })
    .join(" ");

  const mustHideNeighbors = (index) => {
    // number of columns per determined by bootstrap col sizing of cards:
    let numCols;
    if (screenWidth > 1200) {
      numCols = 12 / cardSizesDefault.xl;
    } else if (screenWidth > 992) {
      numCols = 12 / cardSizesDefault.lg;
    } else if (screenWidth > 768) {
      numCols = 12 / cardSizesDefault.md;
    } else if (screenWidth > 576) {
      numCols = 12 / cardSizesDefault.sm;
    } else {
      numCols = 12 / cardSizesDefault.xs;
    }
    // if the index is the second last item in the row, return true
    return (index + 1) % numCols === 0;
  };

  useEffect(() => {
    const cards = document.querySelectorAll(".card-hoverable");
    cards.forEach((card) => {
      // text componenets are selected by .hidden-ct class
      let texts = card.querySelectorAll(".hidden-ct");
      let cardImage = card.querySelector(".card-img-top");

      card.addEventListener("mouseover", () => {
        cardImage.style.display = "none";
        texts.forEach((text) => {
          text.classList.remove("hidden-ct");
          text.classList.remove("fully-hidden");
          text.classList.add("visible-ct");
        });
      });
      card.addEventListener("mouseleave", () => {
        cardImage.style.display = "block";
        texts.forEach((text) => {
          text.classList.remove("visible-ct");
          text.classList.add("hidden-ct");
          text.classList.add("fully-hidden");
        });
      });
    });
  });

  useEffect(() => {
    const cardsColContainers = document.querySelectorAll(".card-col-container");
    const unHideCards = () => {
      for (let hiddenCardIndex of hiddenCardIndexes) {
        if (
          cardsColContainers?.length > 0 &&
          hiddenCardIndex < cardsColContainers.length
        ) {
          let hiddenCardContainer = cardsColContainers[hiddenCardIndex];
          if (hiddenCardContainer?.classList.contains("hidden-force")) {
            hiddenCardContainer.classList.remove("hidden-force");
            setHiddenCardIndexes([]);
          }
        }
      }
    };

    // Access cardsColContainers based on hoveredCardIndex
    if (hoveredCardIndex == null || !mustHideNeighbors(hoveredCardIndex)) {
      unHideCards();
      setFillActiveTabCard("tab1");
    } else if (
      cardsColContainers?.length > 0 &&
      hoveredCardIndex > 0 &&
      hoveredCardIndex < cardsColContainers.length
    ) {
      unHideCards();
      const previousCardContainer = cardsColContainers[hoveredCardIndex - 1];
      // Make sure previousCardContainer is defined before accessing its properties
      if (previousCardContainer) {
        previousCardContainer.classList.add("hidden-force");
        setHiddenCardIndexes([hoveredCardIndex - 1]);
      }
    }
  }, [hoveredCardIndex]); // Dependency on hoveredCardIndex

  const handleShowAll = () => {
    setShowAll(!showAll);
  };

  const handleShowSocialMedia = () => {
    setShowSocialMedia(!showSocialMedia);
  };

  return (
    <MDBContainer fluid className="mt-5 mb-6">
      <MDBTypography
        tag="div"
        className="display-1 py-3 my-2 text-center noto-display-h1"
      >
        Gamification in Social Media
      </MDBTypography>
      <MDBContainer fluid className="d-flex justify-content-center">
        <MDBContainer className="col-md-3 col-lg-3 col-sm-6 d-flex align-items-center flex-column me-1">
          <MDBTypography className="text-muted">
            <strong>All</strong> game mechanics from Chou
          </MDBTypography>
          <MDBBtn color="primary" onClick={handleShowAll}>
            {showAll ? "Hide" : "Show"}
          </MDBBtn>
        </MDBContainer>

        <MDBContainer className="col-md-3 col-lg-3 col-sm-6 d-flex align-items-center flex-column ms-1">
          <MDBTypography className="text-muted">
            <strong>Social Media</strong> game mechanics only
          </MDBTypography>
          <MDBBtn color="primary" onClick={handleShowSocialMedia}>
            {showSocialMedia ? "Hide" : "Show"}
          </MDBBtn>
        </MDBContainer>
      </MDBContainer>

      {(showAll || showSocialMedia) && (
        <MDBContainer
          fluid
          className="d-flex flex-column justify-content-center mt-3"
        >
          <MDBContainer className="col-md-5 col-lg-4 col-xl-3 col-sm-10 d-flex align-items-flex-start flex-column ms-0">
            <MDBTypography note noteColor="light">
              <strong>Hover</strong> over the mechanics to see more details
            </MDBTypography>
          </MDBContainer>
          <MDBContainer className="col-md-5 col-lg-4 col-xl-3 col-sm-10 d-flex align-items-flex-start flex-column ms-0">
            <MDBTypography note noteColor="light">
              Mechanics I found used on <strong>Social Media</strong> have{" "}
              <span className="text-primary text-bold">blue</span> titles and
              further details
            </MDBTypography>
          </MDBContainer>
        </MDBContainer>
      )}

      <MDBRow className="mt-4 px-5">
        {orderedMechanics?.map((mechanic, index) => {
          if (
            (!showAll && !showSocialMedia) ||
            (showSocialMedia && !mechanic.active)
          ) {
            return null;
          }
          return (
            <MDBCol
              key={index}
              className={`${
                hoveredCardIndex === index
                  ? cardSizesEnlargedString
                  : cardSizesDefaultString
              } p-2 card-col-container`}
              onMouseEnter={() => setHoveredCardIndex(index)}
              onMouseLeave={() => setHoveredCardIndex(null)}
            >
              <MDBCard className="h-100 card-hoverable">
                <MDBCardImage
                  className="img-fluid p-0 m-0"
                  style={{ opacity: 0.32 }}
                  src={`pictures/game-mechanics/${mechanic.name
                    .replaceAll(" ", "-")
                    .replaceAll("/", "-")
                    .replaceAll("'", "")
                    .toLowerCase()}.png`}
                  position="top"
                  alt={mechanic.name}
                ></MDBCardImage>
                <MDBCardBody>
                  {/* </MDBContainer> */}
                  <MDBCardTitle
                    className={
                      mechanic.active
                        ? "text-center text-primary"
                        : "text-center text-muted"
                    }
                  >
                    {mechanic.name}
                  </MDBCardTitle>

                  <MDBTabs fill className="mb-3 hidden-ct fully-hidden">
                    <MDBTabsItem>
                      <MDBTabsLink
                        onClick={() => setFillActiveTabCard("tab1")}
                        active={fillActiveTabCard === "tab1"}
                      >
                        Description
                      </MDBTabsLink>
                    </MDBTabsItem>

                    {mechanic.socialMediaUsed && (
                      <MDBTabsItem>
                        <MDBTabsLink
                          onClick={() => setFillActiveTabCard("tab2")}
                          active={fillActiveTabCard === "tab2"}
                        >
                          In Social Media
                        </MDBTabsLink>
                      </MDBTabsItem>
                    )}

                    {mechanic.examples?.length > 0 && (
                      <MDBTabsItem>
                        <MDBTabsLink
                          onClick={() => setFillActiveTabCard("tab3")}
                          active={fillActiveTabCard === "tab3"}
                        >
                          Examples
                        </MDBTabsLink>
                      </MDBTabsItem>
                    )}
                    {mechanic.bookQuote && (
                      <MDBTabsItem>
                        <MDBTabsLink
                          onClick={() => setFillActiveTabCard("tab4")}
                          active={fillActiveTabCard === "tab4"}
                        >
                          Book Quotes
                        </MDBTabsLink>
                      </MDBTabsItem>
                    )}
                    {mechanic.goal && (
                      <MDBTabsItem>
                        <MDBTabsLink
                          onClick={() => setFillActiveTabCard("tab5")}
                          active={fillActiveTabCard === "tab5"}
                        >
                          Purpose
                        </MDBTabsLink>
                      </MDBTabsItem>
                    )}
                  </MDBTabs>

                  <MDBTabsContent className="hidden-ct fully-hidden">
                    <MDBTabsPane open={fillActiveTabCard === "tab1"}>
                      {mechanic.description && (
                        <MDBCardText>
                          <strong>Description </strong>
                          {mechanic.description}
                        </MDBCardText>
                      )}
                      {mechanic.core_drive && (
                        <MDBCardText>
                          <strong>Core Drive </strong>
                          {mechanic.core_drive}
                        </MDBCardText>
                      )}
                      {mechanic.references?.length > 0 && (
                        <MDBCardText>
                          <strong>References&nbsp; </strong>
                          {mechanic.references.map((reference, index) => {
                            let label;
                            let icon;
                            let value;
                            if (
                              typeof reference === "string" &&
                              reference.includes("https://")
                            ) {
                              label = "LINK";
                              icon = "fas fa-link";
                              value = <a href={reference}>click</a>;
                            } else if (typeof reference === "string") {
                              label = "MISC";
                              icon = "fas fa-pen";
                              value = reference.slice(0, 5);
                            } else {
                              label = "PAGE";
                              icon = "fas fa-book";
                              value = padNumber(reference, 3);
                            }
                            return (
                              <div
                                key={index}
                                className="badge badge-secondary me-2 mb-2 p-2"
                              >
                                {/* Label */}
                                <p className="mt-0 mb-1 small text-muted">
                                  {label}
                                </p>
                                <div className="d-flex justify-content-center align-items-center m-0 p-0">
                                  {/* Icon */}
                                  <i className={icon + " me-2"}></i>
                                  {/* Value */}
                                  <span className="font-weight-bold">
                                    {value}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </MDBCardText>
                      )}
                    </MDBTabsPane>

                    {mechanic.socialMediaUsed && (
                      <MDBTabsPane open={fillActiveTabCard === "tab2"}>
                        {mechanic.socialMediaUsed && (
                          <MDBCardText className="hidden-ct fully-hidden">
                            <strong>How it's used in social media </strong>
                            {mechanic.socialMediaUsed}
                          </MDBCardText>
                        )}
                      </MDBTabsPane>
                    )}
                    {mechanic.examples?.length > 0 && (
                      <MDBTabsPane open={fillActiveTabCard === "tab3"}>
                        {mechanic.examples?.length > 0 && (
                          <MDBCardText className="hidden-ct fully-hidden">
                            <strong>Examples </strong>
                            <ul>
                              {mechanic.examples.map((example, index) => {
                                return <li key={index}>{example}</li>;
                              })}
                            </ul>
                          </MDBCardText>
                        )}
                      </MDBTabsPane>
                    )}
                    {mechanic.bookQuote && (
                      <MDBTabsPane open={fillActiveTabCard === "tab4"}>
                        <MDBCardText className="hidden-ct fully-hidden">
                          <strong>Book Quotes </strong>&#8220;
                          {mechanic.bookQuote}&#8221;
                          <br></br>
                          <br></br>
                          <span className="text-muted">
                            Chou, Y.-k. (2019). Actionable gamification: Beyond
                            points, badges, and leaderboards. Octalysis Media.
                          </span>
                        </MDBCardText>
                      </MDBTabsPane>
                    )}
                    {mechanic.goal && (
                      <MDBTabsPane open={fillActiveTabCard === "tab5"}>
                        {mechanic.goal && (
                          <MDBCardText className="hidden-ct fully-hidden">
                            <strong>Goal </strong>
                            {mechanic.goal}
                          </MDBCardText>
                        )}
                      </MDBTabsPane>
                    )}
                  </MDBTabsContent>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          );
        })}
      </MDBRow>

      <MDBTypography
        tag="h1"
        className="display-4 mt-5 pt-3 pb-1 mb-3 noto-display-h1 text-center"
      >
        Noteworthy Implementations
      </MDBTypography>
      <MDBContainer className="col-md-11 col-lg-10 col-sm-12 d-flex align-items-center flex-column p-4">
        <MDBAccordion
          initialActive={1}
          className="col-md-10 col-lg-10 col-sm-12 w-100"
        >
          <MDBAccordionItem collapseId={1} headerTitle="Success">
            <MDBContainer className="col-md-11 col-lg-11 col-sm-11 d-flex align-items-center flex-column p-4">
              <MDBTypography>
                Perhaps the
                <strong> most successful implementation </strong>of gamification
                in social media is Facebook. Facebook has successfully
                implemented a variety of gamification mechanics to encourage
                user engagement and interaction. The platform uses status
                points, group quests, and mentorship to encourage users to
                contribute to the site, work together to complete tasks, and
                onboard new users. Facebook also uses social prods and social
                treasures/gifting to encourage users to interact with each other
                and support each other's contributions. The platform also uses
                trophy shelves to encourage users to showcase their achievements
                and milestones to their social network. Lastly, Facebook uses
                appointment dynamics to establish a habit of regular engagement
                by notifying users of upcoming events, live streams, or content
                releases to create anticipation and encourage participation.
                These mechanics have contributed to Facebook's success in
                maintaining user engagement and retention, and have helped the
                platform become one of the most popular social media sites in
                the world.
              </MDBTypography>
            </MDBContainer>
          </MDBAccordionItem>
          <MDBAccordionItem collapseId={2} headerTitle="Failure">
            <MDBContainer className="col-md-11 col-lg-11 col-sm-11 d-flex align-items-center flex-column p-4">
              <MDBTypography>
                One example of a <strong>failed implementation </strong>of
                gamification in social media is Google+. Google+ attempted to
                use status points and group quests to encourage users to
                contribute to the site and work together to complete tasks.
                However, the platform failed to gain significant traction and
                was eventually shut down due to low user engagement and
                adoption. The mechanics used on Google+ were not effective in
                encouraging user interaction and participation, and the platform
                was unable to compete with other social media sites like
                Facebook and Twitter. As a result, Google+ was considered a
                failure in the realm of social media gamification.
              </MDBTypography>
            </MDBContainer>
          </MDBAccordionItem>
          <MDBAccordionItem collapseId={3} headerTitle="Innovation">
            <MDBContainer className="col-md-11 col-lg-11 col-sm-11 d-flex align-items-center flex-column p-4">
              <MDBTypography>
                An <strong>innovative example</strong> of gamification in social
                media is TikTok. TikTok has successfully implemented a variety
                of gamification mechanics to encourage user engagement and
                participation. The platform's biggest innovation was its
                discovery algorithm, which utilized the Dangling mechanic and
                gave users a stronger drive of higher meaning and calling
                &mdash; by knowing that they always have the chance to go viral
                due to a meritocritous discovery/promotion system. Furthermore,
                The platform uses status points, group quests, and mentorship to
                encourage users to contribute to the site, work together to
                complete tasks, and onboard new users. TikTok also uses social
                prods and social treasures/gifting to encourage users to
                interact with each other and support each other's contributions.
                The platform also uses appointment dynamics to establish a habit
                of regular engagement by notifying users of upcoming events,
                live streams, or content releases to create anticipation and
                encourage participation. These mechanics have contributed to
                TikTok's success in maintaining user engagement and retention,
                and have helped the platform become one of the most popular
                social media apps in the world.
              </MDBTypography>
            </MDBContainer>
          </MDBAccordionItem>
        </MDBAccordion>
      </MDBContainer>

      <MDBTypography
        tag="h1"
        className="display-4 mt-4 pt-3 pb-1 mb-3 noto-display-h1 text-center"
      >
        Beyond the Immediate Scope
      </MDBTypography>
      <MDBContainer className="col-md-11 col-lg-10 col-sm-12 d-flex align-items-center flex-column p-4">
        <MDBAccordion
          // initialActive={1}
          className="col-md-10 col-lg-10 col-sm-12 w-100"
        >
          <MDBAccordionItem collapseId={1} headerTitle="Implications">
            <MDBContainer className="col-md-11 col-lg-11 col-sm-11 d-flex align-items-center flex-column p-4">
              <MDBTypography>
                Gamification in social media has the potential to{" "}
                <strong>
                  significantly impact user engagement and retention
                </strong>
                . By implementing gamification mechanics, social media platforms
                can encourage users to contribute to the site, work together to
                complete tasks, and onboard new users. These mechanics can also
                foster a sense of community and shared purpose, and create a
                feedback loop that triggers intrinsic motivations to participate
                in generating content. Additionally, gamification can create a
                sense of ownership and investment in the platform, and stimulate
                social interactions between different user types. Overall, the
                implication of gamification in social media is that it has the
                potential to enhance user engagement, retention, and
                satisfaction, and to foster a strong sense of community and
                shared purpose among users.
              </MDBTypography>
            </MDBContainer>
          </MDBAccordionItem>
          <MDBAccordionItem collapseId={2} headerTitle="Ethical Considerations">
            <MDBContainer className="col-md-11 col-lg-11 col-sm-11 d-flex align-items-center flex-column p-4">
              <MDBTypography>
                Morality and ethics are subjective and can vary based on
                cultural, religious, and personal beliefs. However, gamification
                in social media can raise{" "}
                <strong>
                  ethical concerns related to user privacy, data security, and
                  psychological manipulation
                </strong>
                . For example, the use of gamification mechanics to encourage
                users to share personal information or engage in specific
                behaviors could raise concerns about privacy and data security.
                Additionally, the use of gamification to manipulate user
                behavior or create addictive experiences could raise concerns
                about psychological well-being and mental health. It is
                important for social media platforms to consider the ethical
                implications of gamification and to prioritize user well-being
                and safety in their design and implementation of gamification
                mechanics.
                <br></br>
                Given the difficulty of defining morality, it may be best for a
                company to build whatever product they want and let the market
                decide if it is moral or not -- i.e., let the moral conesensus
                to materialize through market-participants voting with their
                wallets. If a society deems a product immoral, it is up to them
                to stop using it. If they continue to use it, then it is moral.
              </MDBTypography>
            </MDBContainer>
          </MDBAccordionItem>
          <MDBAccordionItem collapseId={3} headerTitle="Additional Impacts">
            <MDBContainer className="col-md-11 col-lg-11 col-sm-11 d-flex align-items-center flex-column p-4">
              <MDBTypography>
                It's worth noting{" "}
                <strong>that ethical concerns are prevalent</strong> in
                discussions about gamification. This hesitancy reflects the
                public's apprehension regarding the manipulative potential of
                game mechanics and the magnitude to which they can compel user
                behavior. Within the realm of social media, a distinct set of
                moral considerations emerges alongside the broader ethical
                considerations inherent in gamification.
                <br></br>
                <br></br>
                Without a doubt, these considerations exist as a result of
                social media's ever-increasing pervasiveness &mdash; due in no
                small part to the successful implementation of game mechanics
                therein. This is perhaps best evidenced in the rising magnitude
                of discussion over social media in the world of politics,
                culminating in a March 2023 Congressional Hearing. There has
                even been earnest attempts to block and regulate social media
                platforms at a legislative level &mdash; something previously
                thought unthinkable due to its abject incompatibility with
                American ideals. Neverthless,&nbsp;
                <a href="https://www.newsobserver.com/news/politics-government/article283780348.html">
                  precedent has been recently established for such a thing
                </a>
                &nbsp;and legitimate&nbsp;
                <a href="https://www.reuters.com/technology/aclu-urges-us-lawmakers-not-ban-tiktok-2023-02-28/">
                  political capital is being wielded to make it happen.
                </a>
                Interestingly, these ethical dilemmas seem to stem more from the
                pervasiveness of social media itself rather than from the
                mechanics of gamification. Nevertheless, these ethical dilemmas
                undeniably loom over any aspiration to gamify social media
                application
                <br></br>
                <br></br>
                By furthering the success of social media and the attachment of
                the users therein, implementations of gamification bring
                concerns over:
                <ul>
                  <li>
                    Contributing to a societal landscape where individuals
                    struggle to cultivate genuine connections, potentially
                    fostering feelings of isolation and depression.
                  </li>
                  <li>
                    Eroding empathy and hinder individuals' ability to interpret
                    social cues accurately, potentially undermining
                    interpersonal relationships.
                  </li>
                  <li>
                    Exacerbating susceptibility to manipulation and the spread
                    of misinformation within society, impacting critical
                    thinking and decision-making abilities.
                  </li>
                  <li>
                    Increasing the risk of addiction and exacerbating existing
                    mental health issues among users, potentially leading to
                    widespread psychological distress.
                  </li>
                  <li>
                    Exacerbating issues of cyberbullying and online harassment,
                    as users compete for virtual rewards and status within the
                    platform.
                  </li>
                  <li>
                    Perpetuating societal pressure for constant engagement and
                    validation, leading to addictive behaviors and unhealthy
                    consumption patterns among users.
                  </li>
                  <li>
                    Amplifying existential risks and contributing to human
                    extinction scenarios, as individuals prioritize virtual
                    rewards over addressing global challenges.
                  </li>
                  <li>
                    Reinforcing filter bubbles and echo chambers, limiting
                    exposure to diverse perspectives and fostering ideological
                    isolation.
                  </li>
                  <li>
                    Amplifying the phenomenon of "performative" online behavior,
                    where users prioritize generating engagement over
                    authenticity, leading to disingenuous interactions.
                  </li>
                  <li>
                    Contributing to the erosion of offline social interactions
                    and community engagement, as users become increasingly
                    reliant on virtual rewards and interactions.
                  </li>
                  <li>
                    Exacerbating the commodification of personal data and
                    privacy breaches, as users engage with gamified features
                    that encourage sharing personal information.
                  </li>
                  <li>
                    Fostering a culture of comparison and social validation,
                    leading to increased anxiety and self-esteem issues among
                    users.
                  </li>
                  <li>
                    Contributing to the radicalization and extremism of
                    individuals, fostering ideological polarization and societal
                    division.
                  </li>
                  <li>
                    Elevating aggression and criminal behavior among users when
                    content is unmoderated, potentially contributing to a rise
                    in violence and unlawful activities within society.
                  </li>
                  <li>
                    Serving as a hub for criminals of particular types to
                    congregate &emdash; where previously not possible &mdash;
                    thus amplifying their criminal or immoral activity.
                  </li>
                  <li>
                    Deepening political polarization and societal tensions,
                    exacerbating ideological divides and undermining democratic
                    principles.
                  </li>
                  <li>
                    Exacerbating environmental degradation and hastening
                    ecological collapse, as users prioritize virtual rewards
                    over sustainable behaviors.
                  </li>
                </ul>
              </MDBTypography>
            </MDBContainer>
          </MDBAccordionItem>
          <MDBAccordionItem collapseId={4} headerTitle="Opportunities">
            <MDBContainer className="col-md-11 col-lg-11 col-sm-11 d-flex align-items-center flex-column p-4">
              <MDBTypography>
                Gamification in social media offers{" "}
                <strong>
                  unique opportunities to enhance user engagement and drive
                  positive social change
                </strong>
                . There remains opportunities both for novel implementations of
                game mechanics in existing media, and also existing media
                subdomains that have yet to implement game mechanics at all.
                Below are several innovative ways, showcasing the potential and
                possible horizon of gamification in social media platforms.
                <br></br>
                <br></br>
                <ul>
                  <li>
                    Leveraging gamification to incentivize users to participate
                    in philanthropic endeavors and social causes, such as
                    organizing fundraising challenges or igniting viral hashtag
                    campaigns to raise awareness.
                  </li>
                  <li>
                    Implementing gamification mechanics to bolster mental health
                    and well-being, by encouraging users to share uplifting
                    affirmations, engage in mindfulness exercises, or
                    participate in virtual support groups.
                  </li>
                  <li>
                    Harnessing gamification to foster cross-cultural
                    understanding and empathy, by prompting users to share
                    personal stories or experiences from diverse cultural
                    backgrounds, fostering a platform for dialogue and mutual
                    respect.
                  </li>
                  <li>
                    Utilizing gamification strategies to champion environmental
                    sustainability and conservation efforts, such as
                    incentivizing users to participate in eco-friendly
                    challenges, advocate for green initiatives, or collaborate
                    on community-based environmental projects.
                  </li>
                  <li>
                    Employing gamification to stimulate civic engagement and
                    political participation, by motivating users to share
                    information about local elections, community events, or
                    grassroots campaigns, fostering an informed and active
                    citizenry.
                  </li>
                  <li>
                    Transforming discussion forums into immersive gaming
                    experiences, where users earn points for contributing
                    thought-provoking content, insightful commentary, or
                    engaging discussions, with top contributors receiving
                    special badges or recognition, thereby enhancing community
                    participation and knowledge sharing.
                  </li>
                  <li>
                    Introducing gamified learning experiences within social
                    media platforms, where users can engage in interactive
                    educational challenges, quizzes, or simulations, fostering
                    continuous learning and skill development in a dynamic and
                    engaging manner.
                  </li>
                  <li>
                    Creating virtual mentorship programs using gamification,
                    where seasoned professionals or influencers can guide and
                    support aspiring individuals through gamified tasks,
                    challenges, and achievements, nurturing personal and
                    professional growth within the community.
                  </li>
                </ul>
              </MDBTypography>
            </MDBContainer>
          </MDBAccordionItem>
        </MDBAccordion>
      </MDBContainer>
    </MDBContainer>
  );
}

export default SocialMediaGamification;
