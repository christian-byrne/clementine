import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import UserProfileSidebar from "../components/sidebars/user-profile/UserProfileSidebarMinimal";
import { MDBContainer, MDBRow } from "mdb-react-ui-kit";
import StylistCard from "../components/cards/StylistCard";
import PhotoCard from "../components/cards/PhotoCard";
import pathFormat from "@/utils/pathFormat";

const userProfileData = {
  achievementCount: 20,
  achievements: [
    {
      src: "/icons/badges/00125-974876523.png",
      alt: "Electic",
      title: "Electic",
    },
    {
      src: "/icons/badges/00124-2754537806.png",
      alt: "Hot Streak - 30 Days",
      title: "Hot Streak - 30 Days",
    },
    {
      src: "/icons/badges/00123-2754537805.png",
      alt: "Top 1%",
      title: "Top 1%",
    },
    {
      src: "/icons/badges/00122-2754537804.png",
      alt: "Adored",
      title: "Adored",
    },
    {
      src: "/icons/badges/00121-2754537803.png",
      alt: "Can't Miss",
      title: "Can't Miss",
    },
  ],
  averageRating: 4.98,
  badgeCount: 15,
  badges: {
    tier1: [
      {
        src: "/icons/badges/00084-1785361181.png",
        alt: "It Wasnt a Just a Phase, Mom",
        title: "It Wasnt a Just a Phase, Mom",
      },
      {
        src: "/icons/badges/00072-2440857873.png",
        alt: "Influencer",
        title: "Influencer",
      },
      {
        src: "/icons/badges/00073-2440857874.png",
        alt: "Shopping Addict",
        title: "Shopping Addict",
      },
    ],
    tier2: [
      {
        src: "/icons/badges/00075-2440857876.png",
        alt: "Rainy Day Badge",
        title: "Rainy Day Badge",
      },
      {
        src: "/icons/badges/00077-442550671.png",
        alt: "True Romantic",
        title: "True Romantic",
      },
      {
        src: "/icons/badges/00078-442550672.png",
        alt: "Neo Gothic Afficianado",
        title: "Neo Gothic Afficianado",
      },
      {
        src: "/icons/badges/00079-442550673.png",
        alt: "Pink and Black",
        title: "Pink and Black",
      },
    ],
    tier3: [
      {
        src: "/icons/badges/00080-1785361177.png",
        alt: "Pleated Pro",
        title: "Pleated Pro",
      },
      {
        src: "/icons/badges/00081-1785361178.png",
        alt: "Long Hair Don't Care",
        title: "Long Hair Don't Care",
      },
      {
        src: "/icons/badges/00082-1785361179.png",
        alt: "Stand Out!",
        title: "Stand Out!",
      },
      {
        src: "/icons/badges/00074-2440857875.png",
        alt: "Rainy Day Badge",
        title: "Rainy Day Badge",
      },
    ],
    // tier4: [
    //   {
    //     src: "/icons/badges/00152-3825309895.png",
    //     alt: "White Lotus - Top Creator",
    //     title: "White Lotus - Top Creator",
    //   },
    //   {
    //     src: "/icons/badges/00149-3825309892.png",
    //     alt: "White Dove - Boundary Breaker",
    //     title: "White Dove - Boundary Breaker",
    //   },
    //   {
    //     src: "/icons/badges/00128-974876526.png",
    //     alt: "Perfect",
    //     title: "Perfect",
    //   },
    //   {
    //     src: "/icons/badges/00126-974876524.png",
    //     alt: "Globetrotter",
    //     title: "Globetrotter",
    //   },
    // ],
  },
  downloads: 34456,
  favorites: 98021,
  id: 3,
  idHash: "d24a543560f7f67c7afe81e7fe001d8778463db64b3744db5e47b7ec59471172",
  joinDate: "November 23, 2022",
  likes: 978430,
  location: "Olympia, Lunar Colony",
  modelCount: 36,
  name: "Ellen Ripley",
  nameSystem: "ellen-ripley",
  ownModels: [
    "balenciaga-but-it's-emo",
    "goth-x-byzantine",
    "sweaters,-crocs,-and-despair",
    "streetwear,-but-make-it-angsty",
    "my-take-on-vintage-euro",
    "sun,-shades,-and-sarcasm",
  ],
  phone: "555-555-5555",
  ranks: [
    "#13 University Class Rank",
    "#129 Student in The Lunar Colonies 🌕",
  ],
  score: 203944453445,
  socialIcons: [
    {
      url: "https://simpleicons.org/icons/instagram.svg",
      alt: "Instagram",
    },
    { url: "https://simpleicons.org/icons/twitter.svg", alt: "Twitter" },
    { url: "https://simpleicons.org/icons/tiktok.svg", alt: "TikTok" },
  ],
  statuses: [
    {
      date: "Nov 2022",
      text: "Completed all Nodes in Tier 1.",
    },
    {
      date: "Jan 2024",
      text: "Completed all Math Nodes in Undergraduate Tier",
    },
    {
      date: "Dec 2023",
      text: "My wardrobe consists of various shades of black, with occasional accents of despair",
    },
    { date: "Oct 2023", text: "Corpse-chic is the new black" },
    {
      date: "Aug 2023",
      text: "Why wear your heart on your sleeve when you can wear it on a pentagram?",
    },
    {
      date: "Jul 2023",
      text: "I find beauty in the macabre, and my closet reflects that aesthetic.",
    },
    {
      date: "Jun 2023",
      text: "Clothes may maketh the man, but they definitely maketh the monster.",
    },
    {
      date: "Dec 2023",
      text: "Black is not just a color, it's a lifestyle.",
    },
    {
      date: "May 2023",
      text: "Life is short, and so are my skirts. But my disdain for pastels is everlasting.",
    },
    {
      date: "Apr 2023",
      text: "My fashion philosophy? The darker, the better.",
    },
    {
      date: "Mar 2023",
      text: "Why settle for silver linings when you can embrace the beauty of storm clouds?",
    },
    {
      date: "Feb 2023",
      text: "I prefer my accessories haunted and my outfits haunted-er.",
    },
    {
      date: "Jan 2023",
      text: "If you can't see the beauty in skulls, you're not looking hard enough.",
    },
    { date: "Nov 2023", text: "I believe in eternal black." },
    {
      date: "Dec 2022",
      text: "My style icon? Morticia Addams, obviously. She taught me that elegance is eternal, especially in black velvet.",
    },
    {
      date: "Oct 2022",
      text: "My ideal date night outfit? A little black dress and a lot of dark humor.",
    },
    {
      date: "Sep 2022",
      text: "Why wear flowers in your hair when you can wear thorns?",
    },
    {
      date: "Aug 2022",
      text: "I've mastered the art of making 'mourning' a year-round trend.",
    },
    {
      date: "Jul 2022",
      text: "Fashion tip: Add a touch of cobweb to any ensemble for that instant gothic glam.",
    },
  ],
  titleCount: 3,
  titles: [
    "Hardworker",
    "Last One Standing",
    "Underdog",
    "Sole Survivor",
    "Science Specialist",
    "Marine"
  ],
  totalRatings: 104634,
  username: "Ellen Ripley",
  views: 99987858,
};

function KnowledgeMapPage() {
  useEffect(() => {
    document.title = "Knowledge Map | Ripley";
  }, []);

  return (
    <MDBContainer fluid 
    // style={{"backgroundColor": "#143548 !important"}}
    >
      <div className="row mt-3">
        <div className="col-md-2 d-none d-md-block bg-light sidebar">
          <UserProfileSidebar userData={userProfileData} />
        </div>
        <main role="main" className="col-md-10 ms-sm-auto col-lg-10 px-md-4" >
          <MDBContainer fluid className="mt-5" >
            <MDBRow className="justify-content-center" >
                  <h2 className="mb-4">My Knowledge Map</h2>
              <img
                src={pathFormat("/pictures/knowledge-maps/ComfyUI_00035_.png")}
                // src={pathFormat("/pictures/knowledge-maps/ComfyUI_00074_.png")}
                // src={pathFormat("/pictures/knowledge-maps/ComfyUI_00033_.png")}
                // src={pathFormat("/pictures/knowledge-maps/ComfyUI_00037_.png")}
                // className="img-fluid rounded-pill shadow-4"
                className="img-fluid shadow-4"
                alt="..."
                style={{"opacity": "0.82", "borderRadius": "4rem"}}
              />
            </MDBRow>
            <MDBRow></MDBRow>
          </MDBContainer>
        </main>
      </div>
    </MDBContainer>
  );
}

export default KnowledgeMapPage;
