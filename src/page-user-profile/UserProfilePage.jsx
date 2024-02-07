import React, { useEffect } from 'react';
import UserProfileSidebar from './UserProfileSidebar';
import { MDBContainer, MDBRow, MDBCard, MDBCardImage, MDBCardBody, MDBCardText, MDBCardTitle, MDBBadge, MDBIcon, MDBTypography, MDBBtn } from 'mdb-react-ui-kit';
import IconGenerator from '../icon-handlers/getIcon';
const getIcon = new IconGenerator();

const formatNumber = (likes) => {
    if (!likes) return "     "; // 5 spaces if likes is falsy
    if (likes > 1000) {
        const formattedLikes = (likes / 1000).toFixed(1) + "k";
        return formattedLikes.padStart(5);
    } else {
        return String(likes).padStart(5);
    }
};

function UserProfilePage() {
  // Example data
  const userProfileData = {
    username: 'Wednesday Addams',
    joinDate: 'November 23, 2022',
    ranks: [
        "#13 Dark Couture Stylists",
        "#1,234 in Stylist Views (Monthly)",
        "#129 Creator in NJ 🏴󠁵󠁳󠁮󠁪󠁿"
    ],
    titles: ['Trendsetter', 'Goth Revival', 'Fashionista', "Thrifting Guru", "All Black Everything"],
    socialIcons: [
      { url: 'https://simpleicons.org/icons/instagram.svg', alt: 'Instagram' },
      { url: 'https://simpleicons.org/icons/twitter.svg', alt: 'Twitter' },
      { url: 'https://simpleicons.org/icons/tiktok.svg', alt: 'TikTok' }
    ],
    statuses: [
        { date: "Nov 2022", text: "I don't believe in fashion victims. I believe in fashion villains." },
        { date: "Jan 2024", text: "Why follow trends when you can follow the shadows?" },
        { date: "Dec 2023", text: "My wardrobe consists of various shades of black, with occasional accents of despair" },
        { date: "Oct 2023", text: "Corpse-chic is the new black" },
        { date: "Aug 2023", text: "Why wear your heart on your sleeve when you can wear it on a pentagram?" },
        { date: "Jul 2023", text: "I find beauty in the macabre, and my closet reflects that aesthetic." },
        { date: "Jun 2023", text: "Clothes may maketh the man, but they definitely maketh the monster." },
        { date: "Dec 2023", text: "Black is not just a color, it's a lifestyle." },
        { date: "May 2023", text: "Life is short, and so are my skirts. But my disdain for pastels is everlasting." },
        { date: "Apr 2023", text: "My fashion philosophy? The darker, the better." },
        { date: "Mar 2023", text: "Why settle for silver linings when you can embrace the beauty of storm clouds?" },
        { date: "Feb 2023", text: "I prefer my accessories haunted and my outfits haunted-er." },
        { date: "Jan 2023", text: "If you can't see the beauty in skulls, you're not looking hard enough." },
        { date: "Nov 2023", text: "I believe in eternal black." },
        { date: "Dec 2022", text: "My style icon? Morticia Addams, obviously. She taught me that elegance is eternal, especially in black velvet." },
        { date: "Oct 2022", text: "My ideal date night outfit? A little black dress and a lot of dark humor." },
        { date: "Sep 2022", text: "Why wear flowers in your hair when you can wear thorns?" },
        { date: "Aug 2022", text: "I've mastered the art of making 'mourning' a year-round trend." },
        { date: "Jul 2022", text: "Fashion tip: Add a touch of cobweb to any ensemble for that instant gothic glam." }
    ],
    badges: {
        tier1: [
            { src: "icons/badges/00084-1785361181.png", alt: "It Wasnt a Just a Phase, Mom", title: "It Wasnt a Just a Phase, Mom" },
            { src: "icons/badges/00072-2440857873.png", alt: "Influencer", title: "Influencer" },
            { src: "icons/badges/00073-2440857874.png", alt: "Shopping Addict", title: "Shopping Addict" }
        ],
        tier2: [
            { src: "icons/badges/00075-2440857876.png", alt: "Rainy Day Badge", title: "Rainy Day Badge" },
            { src: "icons/badges/00077-442550671.png", alt: "True Romantic", title: "True Romantic" },
            { src: "icons/badges/00078-442550672.png", alt: "Neo Gothic Afficianado", title: "Neo Gothic Afficianado" },
            { src: "icons/badges/00079-442550673.png", alt: "Pink and Black", title: "Pink and Black" }
        ],
        tier3: [
            { src: "icons/badges/00080-1785361177.png", alt: "Pleated Pro", title: "Pleated Pro" },
            { src: "icons/badges/00081-1785361178.png", alt: "Long Hair Don't Care", title: "Long Hair Don't Care" },
            { src: "icons/badges/00082-1785361179.png", alt: "Stand Out!", title: "Stand Out!" },
            { src: "icons/badges/00074-2440857875.png", alt: "Rainy Day Badge", title: "Rainy Day Badge" }
        ],
        tier4: [
            { src: "icons/badges/00152-3825309895.png", alt: "White Lotus - Top Creator", title: "White Lotus - Top Creator" },
            { src: "icons/badges/00149-3825309892.png", alt: "White Dove - Boundary Breaker", title: "White Dove - Boundary Breaker" },
            { src: "icons/badges/00128-974876526.png", alt: "Perfect", title: "Perfect" },
            { src: "icons/badges/00126-974876524.png", alt: "Globetrotter", title: "Globetrotter" }
        ]
    },
    achievements: [
        { src: "icons/badges/00125-974876523.png", alt: "Electic", title: "Electic" },
        { src: "icons/badges/00124-2754537806.png", alt: "Hot Streak - 30 Days", title: "Hot Streak - 30 Days" },
        { src: "icons/badges/00123-2754537805.png", alt: "Top 1%", title: "Top 1%" },
        { src: "icons/badges/00122-2754537804.png", alt: "Adored", title: "Adored" },
        { src: "icons/badges/00121-2754537803.png", alt: "Can't Miss", title: "Can't Miss" }
    ],
    modelCards: [
        {
            title: "Balenciaga but it's emo",
            imageSrc: "pictures/model-card-pics/grid-0052.png",
            badges: ["🔥 Trending", "🔥 Top Rated"],
            bounties: {},
            likes: 123,
            communityUnlock: {},
            tags: ["#emo", "#goth", "#dark", "#black", "#allblackeverything", "#fashion", "high fashion", "balenciaga", "designer", "luxury"],
            description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur, excepturi tenetur. Aperiam non aliquam similique.",
            requirements: "Leather, Black Lipstick"
        },
        {
            title: "Goth x Byzantine",
            imageSrc: "pictures/model-card-pics/grid-0062.png",
            badges: [],
            bounties: {},
            communityUnlock: {
                goal: 300,
                progress: 297,
                message: "3 more rubies to unlock for all users!"
            },
            tags: ["#goth", "#dark", "#black", "#allblackeverything", "#fashion", "high fashion", "byzantine", "medieval", "renaissance", "vintage"],
            description: "Lorem ipsum dolor sit.",
            requirements: "Beanies, Tunics, Sweaters, Gold Colors"
        },
        {
            title: "Sweaters, Crocs, and Despair",
            imageSrc: "pictures/model-card-pics/grid-0103.png",
            badges: [],
            bounties: {
                "status": "BOUNTY AVAILABLE",
                message: "Refine this Model",
                reward: 500
            },
            communityUnlock: {},
            tags: ["#emo", "#goth", "#dark", "cottage core", "idc", "#black", "#allblackeverything", "#fashion", "high fashion", "sweaters", "crocs", "comfy", "comfortable"],
            description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eveniet libero ut accusantium adipisci!",
            requirements: "Clogs, Sweaters, Comfy Clothes"
        },
        {
            title: "Streetwear, but make it angsty",
            imageSrc: "pictures/model-card-pics/grid-0105.png",
            badges: ["😈 Cult Classic", "🔥 Top Rated"],
            bounties: {},
            communityUnlock: {
                goal: 80,
                progress: 80,
                message: "UNLOCKED 🎉 for all Users",
            },
            tags: ["#emo", "#goth", "#dark", "#black", "#allblackeverything", "#fashion", "high fashion", "streetwear", "urban", "angsty", "grunge"],
            description: "",
            requirements: "Lorem, ipsum dolor."
        },
        {
            title: "Vintage Euro - My Take (edgy)",
            imageSrc: "pictures/model-card-pics/grid-0117.png",
            badges: ["🌟 New"],
            bounties: {},
            communityUnlock: {},
            tags: ["#emo", "#goth", "#dark", "#black", "#allblackeverything", "#fashion", "high fashion", "vintage", "euro", "edgy", "retro", "european"],
            description: "Lorem ipsum dolor sit amet consectetur.",
            requirements: "Lorem, ipsum dolor."
        },
        {
            title: "Sun, Shades, and Sarcasm",
            imageSrc: "pictures/model-card-pics/grid-0118.png",
            badges: ["🖤 All Black", "☀️ Summer"],
            bounties: {},
            communityUnlock: {},
            tags: ["#emo", "#goth", "#dark", "#black", "#allblackeverything", "#fashion", "high fashion", "summer", "sunglasses", "shades", "sun", "beach"],
            description: "Lorem ipsum dolor sit amet consectetur.",
            requirements: "Lorem, ipsum dolor."
        }
    ],
    ownPhotos: [
        {
            imageUrl: "pictures/wednesday-user-photos/wednesday-byzantine-04.png",
            likes: 8400,
            favorites: 13,
            model: "Goth x Byzantine",
            creator: "Wednesday Addams"
        },
        {
            imageUrl: "pictures/wednesday-user-photos/wednesday-byzantine-05.png",
            likes: 8400,
            favorites: 5000,
            model: "Goth x Byzantine",
            creator: "Wednesday Addams"
        },
        {
            imageUrl: "pictures/wednesday-user-photos/wednesday-balenciaga-02.png",
            likes: 9200,
            favorites: 666,
            model: "Balenciaga, but it's emo",
            creator: "Wednesday Addams"
        },
        {
            imageUrl: "pictures/wednesday-user-photos/wednesday-streetwear-01.png",
            likes: 784,
            favorites: 300,
            model: "Streetwear, but make it angsty",
            creator: "Wednesday Addams"
        },
        {
            imageUrl: "pictures/wednesday-user-photos/wednesday-euro_vintage-03.png",
            likes: 2400,
            favorites: 120,
            model: "Euro Vintage - My Take (edgy)",
            creator: "Wednesday Addams"
        },
        {
            imageUrl: "pictures/wednesday-user-photos/wednesday-euro_vintage-01.png",
            likes: 2400,
            favorites: 120,
            model: "Euro Vintage - My Take (edgy)",
            creator: "Wednesday Addams"
        },
        {
            imageUrl: "pictures/wednesday-user-photos/wednesday-balenciaga-03.png",
            likes: 4200,
            favorites: 266,
            model: "Balenciaga, but it's emo",
            creator: "Wednesday Addams"
        },
        {
            imageUrl: "pictures/wednesday-user-photos/wednesday-byzantine-03.png",
            likes: 8400,
            favorites: 300,
            model: "Goth x Byzantine",
            creator: "Wednesday Addams"
        },
        {
            imageUrl: "pictures/wednesday-user-photos/wednesday-euro_vintage-02.png",
            likes: 2400,
            favorites: 120,
            model: "Euro Vintage - My Take (edgy)",
            creator: "Wednesday Addams"
        },
        {
            imageUrl: "pictures/wednesday-user-photos/wenesday-cottage-01.png",
            likes: 2400,
            favorites: 120,
            model: "Sweaters, Crocs, and Despair",
            creator: "Wednesday Addams"
        },
        {
            imageUrl: "pictures/wednesday-user-photos/wednesday-balenciaga-01.png",
            likes: 9200,
            favorites: 666,
            model: "Balenciaga, but it's emo",
            creator: "Wednesday Addams"
        },
        {
            imageUrl: "pictures/wednesday-user-photos/wednesday-byzantine-06.png",
            likes: 8400,
            favorites: 300,
            model: "Goth x Byzantine",
            creator: "Wednesday Addams"
        },
        {
            imageUrl: "pictures/wednesday-user-photos/wednesday-byzantine-01.png",
            likes: 8400,
            favorites: 300,
            model: "Goth x Byzantine",
            creator: "Wednesday Addams"
        },
        {
            imageUrl: "pictures/wednesday-user-photos/wednesday-byzantine-02.png",
            likes: 8400,
            favorites: 300,
            model: "Goth x Byzantine",
            creator: "Wednesday Addams"
        }
    ]
  };

    useEffect(() => {
        document.title = "Profile | " + userProfileData.username;
    }, []);

  return (
    <MDBContainer fluid>
        <div className="row mt-3">
            <div class="col-md-3 d-none d-md-block bg-light sidebar">
            <UserProfileSidebar {...userProfileData} />
            </div>
            <main role="main" class="col-md-9 ms-sm-auto col-lg-9 px-md-4">
                <MDBContainer fluid className="mt-5">
                    
                    {/* Most Popular Stylists */}
                    <MDBRow>
                        <h2 className="mb-4">Most Popular Stylists</h2>
                        {userProfileData.modelCards.map((modelCard, index) => (
                            <MDBContainer className="col-md-6 col-lg-4 col-sm-12 mb-4">
                                <MDBCard className="h-100 d-flex d-column">
                                <MDBCardImage src={modelCard.imageSrc} alt={modelCard.title} position="top" />
                                <MDBCardBody>
                                    <MDBCardTitle>{modelCard.title}</MDBCardTitle>
                                    <div class="mb-3">
                                        {modelCard.badges && modelCard.badges.length > 0 && modelCard.badges.map((badge, index) => (
                                            <span key={index} className="badge badge-secondary me-2 mb-2">{badge}</span>
                                        ))}
                                    </div>
                                    {/* Community Unlock */}
                                    {modelCard.communityUnlock && modelCard.communityUnlock.goal && modelCard.communityUnlock.progress && (
                                        <MDBCardText className="text-muted">
                                            <MDBTypography tag="strong">
                                            {modelCard.communityUnlock.progress}/{modelCard.communityUnlock.goal}
                                            </MDBTypography>
                                            {getIcon.createIcon("mainCurrency")}
                                            {modelCard.communityUnlock.message && (
                                                modelCard.communityUnlock.message
                                            )}
                                            </MDBCardText>
                                        )
                                    }
                                    {/* Bounty Offers */}
                                    {modelCard.bounties && modelCard.bounties.status && (
                                        <MDBCardText className="text-muted">
                                            <MDBBadge color="primary me-2 mt-0">
                                                <MDBIcon icon="search-dollar" />
                                                &nbsp;
                                                {modelCard.bounties.status}
                                            </MDBBadge>
                                            {modelCard.bounties.message && (
                                                modelCard.bounties.message
                                                )}
                                                &nbsp;
                                            {modelCard.bounties.reward && (
                                                "for " + modelCard.bounties.reward
                                            )}
                                            {getIcon.createIcon("mainCurrency")}
                                        </MDBCardText>
                                    )}
                                    <MDBCardText>{modelCard.description}</MDBCardText>
                                    <MDBCardText>
                                        {modelCard.requirements && (
                                            <>
                                                <MDBTypography tag="small" className="text-muted">REQUIRES&nbsp;&nbsp;</MDBTypography>
                                                {modelCard.requirements}
                                            </>
                                        )}
                                    </MDBCardText>
                                </MDBCardBody>
                                <MDBContainer className="my-3">
                                    <MDBBtn color="primary" className="m-1">Details</MDBBtn>
                                    <MDBBtn color="success" className="m-1">Use with my Wardrobe</MDBBtn>
                                </MDBContainer>
                              </MDBCard>
                            </MDBContainer>
                        ))}
                    </MDBRow>

                    {/* Photos (User's) */}
                    <MDBRow>
                        <h2 className="mb-4">Photos</h2>
                        {userProfileData.ownPhotos && userProfileData.ownPhotos.length > 0 && userProfileData.ownPhotos.map((photo, index) => (
                                <MDBContainer className="col-md-6 col-lg-4 col-sm-12 mb-4 mx-0">
                                    <MDBCard className="h-100 d-flex d-column">
                                        <MDBCardImage src={photo.imageUrl} alt={photo.model} title={photo.model + " by " + photo.creator} position="top" />
                                        <MDBCardBody>
                                            {/* Engagement Statistics */}
                                            <div class="badge badge-secondary me-3 mb-3 p-2 clickable">
                                            <div class="d-flex justify-content-center align-items-center">
                                                <i class="fas fa-heart me-2" 
                                                // style={{color: "red"}}
                                                ></i>
                                                <span class="font-weight-bold">{
                                                    photo.likes && (
                                                        formatNumber(photo.likes)
                                                    )
                                                }</span>
                                            </div>
                                            <p class="mb-0 mt-1 small text-muted">LIKES</p>
                                            </div>
                                            <div class="badge badge-secondary me-3 mb-3 p-2 clickable">
                                            <div class="d-flex justify-content-center align-items-center">
                                                <i class="fas fa-star me-2"></i>
                                                <span class="font-weight-bold">{
                                                    photo.favorites && photo.favorites > 1000 ? (photo.favorites/1000).toFixed(1) + "k" : photo.favorites
                                                }</span>
                                            </div>
                                            <p class="mb-0 mt-1 small text-muted">FAVORITES</p>
                                            </div>
                                        </MDBCardBody>
                                            {/* Model and Creator */}
                                            <MDBCardText className="ms-4 clickable d-flex flex-column">
                                                <MDBTypography>
                                                <MDBTypography tag="small" className="text-muted">
                                                MADE WITH&nbsp;&nbsp;
                                                </MDBTypography>
                                                    {photo.model} by {photo.creator}
                                                </MDBTypography>
                                            </MDBCardText>
                                    </MDBCard>
                                </MDBContainer>
                            )
                        )}
                    </MDBRow>
                </MDBContainer>
            </main>
        </div>
    </MDBContainer>
  );
}

export default UserProfilePage;
