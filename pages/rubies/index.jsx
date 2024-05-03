import React, { useEffect, useState } from "react";
import {
  MDBCard,
  MDBContainer,
  MDBRow,
  MDBTypography,
  MDBListGroup,
  MDBListGroupItem,
  MDBBadge,
  MDBCardTitle,
} from "mdb-react-ui-kit";
import formatDocTitle from "@/utils/formatDocTitle";
import EarnCard from "@/components/cards/EarnCard";
import ContentRow from "@/components/content-row/ContentRow";
import Breakpoints from "@/utils/breakpoints";
import IconGenerator from "@/utils/getIcon";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

// Ruby Color = rgb(221,24,63), #DD183F
const iconGen = new IconGenerator();

const earnMethods = [
  {
    title: "React",
    description:
      "Earn 5 rubies for every reaction you give to a post (max 50/day).",
    href: "/featured",
    linkText: "Featured Posts",
    icon: "far fa-heart",
  },
  {
    title: "Bounties",
    description: "Complete a bounty on an item to earn the posted reward.",
    href: "/bounties",
    linkText: "Find Bounties",
    icon: "fas fa-sack-dollar",
  },
  {
    title: "Follow",
    description: "Earn 20 rubies for the first person you follow each day.",
    href: "/leaderboards",
    linkText: "Leaderboards",
    icon: "fas fa-user-plus",
  },
  {
    title: "Generate Buzz",
    description:
      "Earn 1 ruby each time someone reacts to something you've made.",
    href: "/user",
    linkText: "My Profile",
    icon: "fas fa-comments",
  },
  {
    title: "Daily Tasks",
    description: "Earn rubies by completing all daily tasks for the day.",
    href: "/rubies/daily-tasks",
    linkText: "Check Daily Tasks",
    icon: "fas fa-list-check",
  },
  {
    title: "Post",
    description: "Earn 50 rubies for the first image you post each day.",
    href: "/upload/image",
    linkText: "Upload Image",
    icon: "fas fa-images",
  },
  {
    title: "Referral",
    description: "Refer a friend to earn rubies.",
    href: "/rubies/referral",
    linkText: "Refer a Friend",
    icon: "fas fa-user-friends",
  },
  {
    title: "Get Suggestions",
    description:
      "Earn 40 rubies for getting a suggestion from an AI Stylist (max 1/day).",
    href: "/dress",
    linkText: "Dress",
    icon: "fas fa-shirt",
  },
  {
    title: "Get Tipped",
    description: "Create and refine stylists and get tips from other users.",
    href: "/create",
    linkText: "Creator Dashboard",
    icon: "fas fa-gift",
  },
  {
    title: "Downloads",
    description:
      "Earn 2 rubies each time someone downloads one of your stylists.",
    href: "/user",
    linkText: "My Profile",
    icon: "fas fa-download",
  },
  {
    title: "Create Suggestions",
    description:
      "Earn 4 rubies each time one of your stylists is used to make a suggestion.",
    href: "/user",
    linkText: "My Stylists",
    icon: "fas fa-lightbulb",
  },
  {
    title: "Stylist Images",
    description:
      "Earn 50 rubies each time someone uses one of your stylists to make an image.",
    href: "/user",
    linkText: "My Stylists' Images",
    icon: "fas fa-camera-retro",
  },
  {
    title: "Purchase",
    description: "Buy rubies directly to spend on items.",
    href: "/rubies/purchase",
    linkText: "Buy Rubies",
    icon: "fas fa-circle-dollar-to-slot",
  },
  {
    title: "Moderate",
    description: "Earn 50 rubies each time a report you've made is accepted",
    href: "/browse/photos",
    linkText: "Browse Posts",
    icon: "fas fa-flag",
  },
];

const transactionList = [
  {
    title: "Post Reward",
    description: "Earned 50 rubies for posting an image",
    date: "2024-04-29",
    balance: 50,
  },
  {
    title: "Follow Reward",
    description: "Earned 20 rubies for following a user",
    date: "2021-04-28",
    balance: 20,
  },
  {
    title: "Daily Suggestions",
    description: "Earned 40 rubies for getting a suggestion",
    date: "2021-04-27",
    balance: 40,
  },
  {
    title: "Daily Suggestions",
    description: "Earned 40 rubies for getting a suggestion",
    date: "2021-04-26",
    balance: 40,
  },
  {
    title: "Unlocked a Stylist",
    description: "Spent 445 rubies unlocking Retrofuturism Stylist",
    date: "2021-05-01",
    balance: -200,
  },
  {
    title: "Daily Tasks Completed",
    description: "Earned 150 rubies for completing all daily tasks",
    date: "2021-05-02",
    balance: 150,
  },
];

const balanceData = [
  { name: "0", value: 123 },
  { name: "2", value: 163 },
  { name: "3", value: 223 },
  { name: "4", value: 243 },
  { name: "6", value: 273 },
  { name: "9", value: 73 },
  { name: "10", value: 223 },
];

function RubiesPage() {
  useEffect(() => {
    document.title = formatDocTitle("Rubies");
  }, []);

  const [windowWidth, setWindowWidth] = useState(1200);
  const [chartWidth, setChartWidth] = useState(600);
  const [chartHeight, setChartHeight] = useState(300);

  const [breakpoint, setBreakpoint] = useState("lg");
  const [colCSSClass, setColCSSClass] = useState("col-12 ms-sm-auto pe-2");

  const breakpointsConfig = new Breakpoints({
    sm: {
      visibleRows: 5,
      cols: 12,
    },
    md: {
      visibleRows: 4,
      cols: 6,
    },
    lg: {
      visibleRows: 3,
      cols: 4,
    },
    xxl: {
      visibleRows: 2,
      cols: 3,
    },
    "2k+": {
      visibleRows: 2,
      cols: 2,
    },
    "4k": {
      visibleRows: 2,
      cols: 1,
    },
  });

  const updateColCSSClass = () => {
    if (!breakpointsConfig.isStandard(breakpoint)) {
      setColCSSClass(`col-${breakpointsConfig[breakpoint].cols} mb-4 px-xl-2`);
    } else {
      setColCSSClass(breakpointsConfig.standardSizeClass);
    }
  };

  useEffect(() => {
    setBreakpoint(breakpointsConfig.getBreakpointName(window.innerWidth));
    updateColCSSClass();
    const handleResize = () => {
      setBreakpoint(breakpointsConfig.getBreakpointName(window.innerWidth));
      updateColCSSClass();
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [breakpoint]);

  useEffect(() => {
    const handleResize = () => {
      setChartWidth(
        window.innerWidth * 0.42 > 1200 ? 1200 : window.innerWidth * 0.42
      );
      setChartHeight(
        window.innerHeight * 0.27 > 550 ? 550 : window.innerHeight * 0.27
      );

      setWindowWidth(window.innerWidth);
    };

    if (typeof window !== "undefined") {
      handleResize();
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  return (
    <MDBContainer fluid>
      <div className="row mt-3">
        <main role="main" className="col-md-12 ms-sm-auto col-lg-12 px-md-4">
          <MDBContainer fluid className="mt-4">
            <MDBTypography tag="h1" className="my-4">
              My Rubies
            </MDBTypography>

            <MDBContainer fluid className="d-flex px-0 flex-wrap">
              <MDBContainer
                className={
                  windowWidth > 1200 // bootstrap xl breakpoint
                    ? "col-lg-12 col-xl-6 p-3 ps-0"
                    : "col-lg-12 col-xl-6 p-3"
                }
              >
                <MDBCard className="h-100">
                  <MDBContainer fluid className="d-flex flex-row">
                    <MDBTypography tag="h2" className="my-4 me-0 pe-0">
                      Current Rubies: 223
                    </MDBTypography>
                    <MDBContainer
                      className="d-flex align-items-center ms-0 ps-1 my-1"
                      style={{ width: "min-content" }}
                    >
                      {iconGen.createIcon("mainCurrency", "54px")}
                    </MDBContainer>
                  </MDBContainer>
                  <MDBContainer className="my-4">
                    <LineChart
                      width={chartWidth}
                      height={chartHeight}
                      data={balanceData}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#DD183F"
                        // label={{ fill: '#DD183F', fontSize: 12, offset: 16, position: 'left'}}
                      />
                    </LineChart>
                  </MDBContainer>
                </MDBCard>
              </MDBContainer>
              <MDBContainer
                className={
                  windowWidth > 1200 // bootstrap xl breakpoint
                    ? "col-lg-12 col-xl-6 p-3 pe-0"
                    : "col-lg-12 col-xl-6 p-3"
                }
              >
                <MDBCard className="h-100">
                  <MDBCardTitle className="my-4 ms-3" tag="h2">
                    Rubies History
                  </MDBCardTitle>
                  <MDBListGroup light className="px-4 mb-4">
                    {transactionList.map((transaction, index) => {
                      return (
                        <MDBListGroupItem
                          key={index}
                          className="d-flex justify-content-between align-items-start"
                        >
                          <div className="ms-2 me-auto">
                            <div className="fw-bold">{transaction.title}</div>
                            {transaction.description}
                          </div>
                          <MDBBadge
                            pill
                            light
                            color={
                              transaction.balance > 0 ? "success" : "danger"
                            }
                          >
                            {transaction.balance}
                          </MDBBadge>
                        </MDBListGroupItem>
                      );
                    })}
                  </MDBListGroup>
                </MDBCard>
              </MDBContainer>
            </MDBContainer>

            <MDBTypography tag="h1" className="my-4">
              Earn Rubies
            </MDBTypography>

            <ContentRow
              colComponent={EarnCard}
              colData={earnMethods}
              showFirstNCols={30}
              maxCols={60}
              colContainerClass={colCSSClass}
              detailsStartExpanded={true}
            />
          </MDBContainer>
        </main>
      </div>
    </MDBContainer>
  );
}

export default RubiesPage;
