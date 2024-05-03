import React, { useEffect } from "react";
import { MDBContainer, MDBRow, MDBTypography } from "mdb-react-ui-kit";
import formatDocTitle from "@/utils/formatDocTitle";
import EarnCard from "@/components/cards/EarnCard";
import ContentRow from "@/components/content-row/ContentRow";

const earnMethods = [
  {
    title: "Bounties",
    description: "Complete a bounty on an item to earn the posted reward.",
    href: "/bounties",
    linkText: "Find Bounties",
    icon: "fas fa-sack-dollar",
  },
  {
    title: "Purchase",
    description: "Buy rubies directly to spend on items.",
    href: "/rubies/purchase",
    linkText: "Buy Rubies",
    icon: "fas fa-circle-dollar-to-slot",
  },
  {
    title: "Referral",
    description: "Refer a friend to earn rubies.",
    href: "/rubies/referral",
    linkText: "Refer a Friend",
    icon: "fas fa-user-friends",
  },
  {
    title: "Daily Tasks",
    description: "Earn rubies by completing all daily tasks for the day.",
    href: "/rubies/daily-tasks",
    linkText: "Check Daily Tasks",
    icon: "fas fa-list-check",
  },
  {
    title: "Get Tipped",
    description: "Create and refine stylists and get tips from other users.",
    href: "/create",
    linkText: "Creator Dashboard",
    icon: "fas fa-gift",
  },
  {
    title: "React",
    description:
      "Earn 5 rubies for every reaction you give to a post (max 50/day).",
    href: "/featured",
    linkText: "Featured Posts",
    icon: "far fa-heart",
  },
  {
    title: "Follow",
    description: "Earn 20 rubies for the first person you follow each day.",
    href: "/leaderboards",
    linkText: "Leaderboards",
    icon: "fas fa-user-plus",
  },
  {
    title: "Post",
    description: "Earn 50 rubies for the first image you post each day.",
    href: "/upload/image",
    linkText: "Upload Image",
    icon: "fas fa-images",
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
    title: "Downloads",
    description:
      "Earn 2 rubies each time someone downloads one of your stylists.",
    href: "/user",
    linkText: "My Profile",
    icon: "fas fa-download",
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
    title: "Moderate",
    description: "Earn 50 rubies each time a report you've made is accepted",
    href: "/browse/photos",
    linkText: "Browse Posts",
    icon: "fas fa-flag",
  },
];

function RubiesPage() {
  useEffect(() => {
    document.title = formatDocTitle("Rubies");
  }, []);
  return (
    <MDBContainer fluid>
      <div className="row mt-3">
        <main role="main" className="col-md-12 ms-sm-auto col-lg-12 px-md-4">
          <MDBContainer fluid className="mt-4">
            <MDBTypography tag="h1" className="my-4">
              My Rubies
            </MDBTypography>
            <MDBTypography tag="h1" className="my-4">
              Earn Rubies
            </MDBTypography>
            <ContentRow
              colComponent={EarnCard}
              colData={earnMethods}
              showFirstNCols={30}
              maxCols={60}
              colContainerClass={
                "col-xl-2 col-lg-3 col-md-4 col-sm-6 mb-4"
              }
              detailsStartExpanded={true}
            />
          </MDBContainer>
        </main>
      </div>
    </MDBContainer>
  );
}

export default RubiesPage;
