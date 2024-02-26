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
} from "mdb-react-ui-kit";
import React, { useState, useEffect } from "react";

function SocialMediaGamification() {
  const orderedMechanics = [
    {
      number: 21,
      core_drive: "Scarcity & Impatience",
      references: [33, 244, 245],
      description:
        "Users are encouraged to return to the site at specific times or intervals.",
      socialMediaUsed:
        "Allowing users to create content that expires/dissapears after a certain time interval. Notifying users of upcoming events, live streams, or content releases to create anticipation and encourage participation.",
      goal: "To establish a habit of regular engagement by leveraging the psychological principle of commitment and consistency. By creating anticipation and expectation around scheduled events or content releases, users are motivated to return to the platform regularly, fostering long-term engagement and loyalty.",
      examples: [
        "Snapchat Stories",
        "Instagram Stories",
        "Twitter Fleets",
        "Twitch Live Streams",
        "YouTube Premieres",
      ],
      active: true,
      name: "Appointment Dynamics",
    },
    {
      number: 10,
      core_drive: "Epic Meaning & Calling",
      references: [99, 420, 70, 305, 83, 84, 252],
      active: false,
      name: "Narrative",
    },
    {
      number: 23,
      core_drive: "Epic Meaning & Calling",
      references: [88, 262],
      active: false,
      name: "Beginner's Luck",
    },
    {
      number: 24,
      core_drive: "Epic Meaning & Calling",
      references: [88],
      active: false,
      name: "Free Lunch",
    },
    {
      number: 8,
      core_drive: "Development & Accomplishment",
      references: [33, 217, 212, 185, 317, 158],
      description:
        "Users can earn or purchase virtual goods to enhance their experience",
      socialMediaUsed:
        "Offering virtual gifts or tokens that users can send to each other as a form of appreciation or support. Or, offering virtual goods or tokens that users can purchase or earn through their activity on the platform. Some social media platforms, particularly those with live streaming features, allow users to purchase and send virtual gifts or stickers to content creators as a form of support or appreciation. These virtual gifts often have monetary value attached to them and can be a source of income for creators.",
      bookQuote:
        " the successful accumulation of goods leads to Core Drive 2: Development & Accomplishment, and when the sense of ownership sparks the need to become better and innovate, Core Drive 3: Empowerment of Creativity & Feedback comes in play.",
      goal: "To create a sense of ownership and investment in the platform, to encourage users to support each other, and to create a sense of scarcity or exclusivity.",
      examples: ["Facebook Stickers", "Twitch Emotes", "Reddit Awards"],
      active: true,
      name: "Virtual Goods",
    },
    {
      number: 26,
      core_drive: "Epic Meaning & Calling",
      references: [198, 442, 85, 86, 87, 410],
      active: false,
      name: "Elitism",
    },
    {
      number: 69,
      core_drive: "Scarcity & Impatience",
      references: [256, 239, 240, 241, 242, 249, 445],
      description:
        "Presenting two options side by side to highlight the differences and drive user decisions.",
      socialMediaUsed:
        "Comparing users' progress or activity levels with those of their peers to highlight achievements or encourage further engagement.",
      bookQuotes:
        "With this technique, you place two options side by side: one that costs money, the other requiring a great amount of effort in accomplishing the Desired Actions which will benefit the system. For example, a site could give you two options for obtaining a certain reward: a) Pay $20 right now, or b) complete a ridiculous number of Desired Actions. The Desired Actions could be in the form of “Invite your friends,” ‘Upload photos,” and/or “stay on the site for 30 days in a row.” In this scenario, you will find that many users will irrationally choose to complete the Desired Actions. You’ll see users slaving away for dozens, even hundreds of hours, just so they can save the $20 to reach their goal. At one point, many of them will realize that it’s a lot of time and work. At that moment, the $20 investment becomes more appealing and they end up purchasing it anyway. Now your users have done both: paid you money, and committed a great deal of Desired Actions.",
      goal: "To motivate users through social comparison and competition by highlighting their progress or activity levels relative to their peers, leveraging the psychological principle of social comparison. By showcasing achievements or milestones in comparison with others, the platform stimulates users' intrinsic motivations and fosters a sense of achievement and competitiveness, driving continued engagement and participation.",
      examples: [
        "Instagram Following/Follower Counts",
        "Twitter Retweets/Likes",
        "YouTube Views/Likes/Comments",
        "Twitch Subscribers/Donations",
        "LinkedIn Profile Strength",
      ],
      active: true,
      name: "Anchored Juxtaposition",
    },
    {
      number: 27,
      core_drive: "Epic Meaning & Calling",
      references: [84],
      active: false,
      name: "Humanity Hero",
    },
    {
      number: 68,
      core_drive: "Scarcity & Impatience",
      references: [242],
      bookQuote:
        "Magnetic Caps are limitations placed on how many times a user can commit certain Desired Actions, which then stimulates more motivation to commit them",
      description:
        "Limiting the number of interactions or actions users can take within a certain timeframe to prevent spam or abuse and to create a sense of scarcity or exclusivity.",
      socialMediaUsed:
        "Limiting the availability of certain features, such as invites to exclusive groups or access to limited-time offers, to drive demand and engagement. Limiting the number of interactions or actions users can take within a certain timeframe to prevent spam or abuse and to create a sense of scarcity or exclusivity.",
      goal: "To manage user engagement and prevent overuse or abuse of platform features by imposing limits or constraints on user interactions, leveraging the psychological principle of scarcity and constraint. By restricting the availability of certain features or actions, the platform encourages users to prioritize their engagement and make deliberate choices, enhancing overall user experience and satisfaction.",
      examples: [
        "Instagram Stories",
        "Snapchat Streaks",
        "Twitter Follow Limits",
        "LinkedIn Connection Limits",
        "Facebook Friend Requests",
      ],
      active: true,
      name: "Magnetic Caps",
    },
    {
      number: 2,
      core_drive: "Development & Accomplishment",
      references: [440, 115, 439, 120, 94],
      active: false,
      name: "Achievement Symbols",
    },
    {
      number: 3,
      core_drive: "Development & Accomplishment",
      references: [32, 439, 2, 261, 102, 180, 118, 119, 25, 27, 60, 93],
      active: false,
      name: "Leaderboards",
    },
    {
      number: 67,
      core_drive: "Scarcity & Impatience",
      references: [88],
      bookQuote:
        "If the game designer also adds Scarcity & Impatience (Core Drive 6) through Moats (Game Technique #67) by telling the user he can only equip this sword once he defeats all the adversaries at a particularly difficult level, the user now becomes obsessed and tries to figure out all sorts of ways to conquer that level",
      description:
        "Creating barriers to entry or exclusive features to encourage users to invest time and effort into the platform and to create a sense of scarcity or exclusivity.",
      socialMediaUsed:
        "Limiting access to certain features or content, such as invites to exclusive groups or access to limited-time offers, to drive demand and engagement. Limiting the number of interactions or actions users can take within a certain timeframe to prevent spam or abuse and to create a sense of scarcity or exclusivity.",
      goal: "To incentivize user investment and commitment by introducing barriers to entry or offering exclusive features, leveraging the psychological principle of exclusivity. By limiting access to certain features or content, the platform enhances perceived value and prestige, motivating users to invest time and effort into the platform to gain access to exclusive benefits or opportunities.",
      examples: [
        "Private FaceBook Groups",
        "Twitter Communities",
        "Instagram Verification",
        "Twitter Verification",
        "YouTube Partner Program",
        "Twitch Affiliate/Partner Status",
      ],
      active: true,
      name: "Moats",
    },
    {
      number: 4,
      core_drive: "Development & Accomplishment",
      references: [328, 93, 118, 111],
      active: false,
      name: "Progress Bars",
    },
    {
      number: 6,
      core_drive: "Development & Accomplishment",
      active: false,
      name: "Step-by-step Tutorial",
    },
    {
      number: 66,
      core_drive: "Scarcity & Impatience",
      references: [256, 33, 247, 95],
      bookQuote:
        "this is what I now call a “Torture Break” (Game Technique #66), where a user must wait an interval of time regardless of their actions, a game technique to be explored under Core Drive 6: Scarcity & Impatience",
      description:
        "Introducing delays or waiting periods between content updates or notifications to maintain user interest and prevent burnout.",
      socialMediaUsed:
        "Social media naturally introduces delays or waiting periods between content updates or notifications to maintain user interest and prevent burnout.",
      goal: "To regulate user engagement and prevent burnout by strategically introducing breaks or delays in content delivery, leveraging the psychological principle of intermittent reinforcement. By spacing out content updates or notifications, the platform maintains user interest and anticipation, preventing users from becoming overwhelmed or disengaged.",
      examples: [
        "Daily YouTube Vlogs",
        "Twitter Feed",
        "YouTube Subscriptions",
        "Scheduled Twitch Streams",
        "LinkedIn Feed",
      ],
      active: true,
      name: "Torture Breaks",
    },
    {
      number: 14,
      core_drive: "Development & Accomplishment",
      references: [26],
      active: false,
      name: "Boss Fights",
    },
    {
      number: 53,
      core_drive: "Scarcity & Impatience",
      references: [95],
      bookQuote:
        "n that frenzy, people quickly outbid each other before the time runs out. This effect is a combination of a Countdown Timer (Game Technique #65) and a Last Mile Drive (Game Technique #53), where users feel that they are so close to the goal that they rush to complete it. For the record, these mostly employ Black Hat techniques.",
      description:
        "Users are motivated to complete a task or goal by creating a sense of urgency or scarcity.",
      socialMediaUsed:
        "Creating arbitrary thresholds or goals by displaying engagement metrics like follower counts. Encouraging users to complete their profiles or take specific actions to unlock additional features or benefits.",
      goal: "To guide users towards completing specific actions or tasks that contribute to their engagement and overall experience on the platform, leveraging the psychological principle of goal-setting. By prompting users to fill out their profiles or take other essential actions, the platform increases user investment and commitment, enhancing user satisfaction and retention.",
      examples: [
        "Instagram Verification",
        "Twitter Verification",
        "YouTube Partner Program",
        "Twitch Affiliate/Partner Status",
        "LinkedIn Profile Strength",
        "Facebook Profile Completion",
      ],
      active: true,
      name: "Last Mile Drive",
    },
    {
      number: 15,
      core_drive: "Development & Accomplishment",
      active: false,
      name: "Anticipation Parade",
    },
    {
      number: 17,
      core_drive: "Development & Accomplishment",
      active: false,
      name: "High Five",
    },
    {
      number: 44,
      core_drive: "Scarcity & Impatience",
      references: [256, 421, 239, 240, 347, 445],
      description:
        "Users are presented with incomplete challenges or tantalizing rewards that are just out of reach, driving continued engagement and participation.",
      socialMediaUsed:
        "Giving users the possibility that they could go viral, become famous, start a career, be noticed by a streamer or creator or celebrity, etc. by using the platform.",
      bookQuote:
        "An important factor to consider when using the Dangling technique is the pathway to obtaining the reward. You have to allow the user to know that it’s very challenging to get the reward, but not impossible. If it is perceived as impossible, then people turn on their Core Drive 8: Loss & Avoidance modes and go into self-denial. “It’s probably for losers anyway. However, if the banner said, “Joining Prerequisite: Prince/Princess by royal blood, OR individuals who have previously ran a marathon.” Now you are motivated, and might even ponder the effort required to run a marathon. As long as there is a realistic chance to get in, the Scarcity through exclusivity is enough to engage you. Interestingly, at this point you still haven’t even determined what the organization actually does! Without any information on its actual function, the human-focused motivation of scarcity is compelling enough for you to consider running a marathon",
      goal: "To create a sense of urgency and anticipation by leveraging the psychological principle of scarcity. By presenting users with incomplete challenges or tantalizing rewards that are just out of reach, the platform motivates continued engagement and participation, driving users to take action to complete tasks or unlock rewards before they expire or become unavailable.",
      examples: [
        "TikTok Viral Challenges",
        "Instagram Influencer Status",
        "YouTube Creator Awards",
        "Twitch Affiliate/Partner Status",
        "Streamers Reading Twitch Chats",
        "Celebrites Reacting to Tweets",
      ],
      active: true,
      name: "Dangling",
    },
    {
      number: 18,
      core_drive: "Development & Accomplishment",
      active: false,
      name: "Crowning",
    },
    {
      number: 37,
      core_drive: "Scarcity & Impatience",
      references: [256, 244, 251, 252, 253, 254],
      description:
        "The user interface changes over time to reflect the user's progress or status.",
      socialMediaUsed:
        "Displaying user-specific content or features based on their activity or preferences, such as personalized recommendations or content feeds. Introducing new features, layouts, or design elements periodically to keep the platform fresh and engaging.",
      goal: "To provide users with a sense of progress and advancement through their interaction with the platform, leveraging the psychological principle of progression and advancement. By adapting the user interface to reflect users' evolving needs, preferences, and accomplishments, the platform enhances user satisfaction and retention, fostering continued engagement over time.",
      examples: [
        "Facebook Redesigns",
        "Facebook News Feed",
        "Instagram Explore Page",
        "YouTube Recommendations",
      ],
      active: true,
      name: "Evolved UI",
    },
    {
      number: 38,
      core_drive: "Development & Accomplishment",
      references: [267, 281, 106, 107],
      active: false,
      name: "Desert Oasis",
    },
    {
      number: 92,
      core_drive: "Development & Accomplishment",
      references: [112],
      active: false,
      name: "The Rockstar Effect",
    },
    {
      number: 11,
      core_drive: "Empowerment & Feedback",
      references: [148],
      active: false,
      name: "Plant Picker/Meaningful Choices",
    },
    {
      number: 12,
      core_drive: "Empowerment & Feedback",
      active: false,
      name: "Dynamic Feedback",
    },
    {
      number: 19,
      core_drive: "Empowerment & Feedback",
      references: [144, 145, 149],
      active: false,
      name: "Milestone Unlock",
    },
    {
      number: 31,
      core_drive: "Empowerment & Feedback",
      references: [98, 456, 142, 143, 144, 207, 241, 347, 345, 154, 219, 447],
      active: false,
      name: "Boosters",
    },
    {
      number: 64,
      core_drive: "Social Influence & Relatedness",
      references: [208, 209, 210, 84, 88],
      description:
        "Providing users with virtual spaces to display their achievements or milestones.",
      socialMediaUsed:
        "The ability to show off realworld accomplishments, engagements statistics on the site, friends and follower counts, etc. is a common feature in social media platforms.",
      bookQuote:
        "Bragging is when a person explicitly and vocally expresses their accomplishments and achievements, whereas a Trophy Shelf allows a person to implicitly show off what they have accomplished without really saying it. Intuitively encouraging users to brag about and show off their achievements comes in handy when it comes to recruiting new players and keeping veteran players active, but the two techniques are appropriate for different scenarios. A Brag Button is a Desired Action that users can take in order to broadcast what they feel accomplished about - driven by Core Drive 2: Development & Accomplishment. In other words, Brag Buttons are little action tools and mechanisms for users to broadcast how awesome they are. Take the game Temple Run for example. Whenever a game is over, there is a quick and easy way for users to tap a button and share a screenshot of their high scores on Facebook, Instagram, and Twitter.",
      goal: "To encourage users to showcase their achievements or milestones to their social network. To create a sense of ownership and investment in the platform. To nurture a sense of accomplishment from contributions.",
      examples: [
        "Instagram/Twitter Follower Count",
        "LinkedIn Profile",
        "Facebook Timeline",
        "Instagram Highlights",
      ],
      active: true,
      name: "Trophy Shelves",
    },
    {
      number: 89,
      core_drive: "Empowerment & Feedback",
      references: [145],
      active: false,
      name: "Poison Picker/Choice Perception",
    },
    {
      number: 101,
      core_drive: "Empowerment & Feedback",
      active: false,
      name: "Creative Counters",
    },
    {
      number: 63,
      core_drive: "Social Influence & Relatedness",
      references: [212],
      description:
        "Features allowing users to exchange virtual gifts or tokens of appreciation.",
      socialMediaUsed:
        "Often seen in social media in the specific form of likes, tips, or other forms of virtual appreciation. Or, offering virtual gifts or tokens that users can send to each other as a form of appreciation or support.",
      bookQuote:
        "Back in the days of Farmville, there were certain types of virtual goods that were not obtainable through regular channels, including purchasing with real money. The only way to obtain these items was to have friends click on the “Give to Friend” button and have them sent to you, without your friends losing anything in the process. As a result of this type of design, when people wanted these unique Social Treasure items, they just gave one to each other, ensuring a win-win situation. This of course, pushed people to get their friends to join the game, so they could get more opportunities to obtain these Social Treasures",
      goal: "To encourage users to support each other and to create a sense of community and shared purpose. To create a sense of scarcity or exclusivity. To create a sense of unpredictability.",
      examples: ["Facebook Likes", "Twitch Bits", "Reddit Awards"],
      active: true,
      name: "Social Treasures/Gifting",
    },
    {
      number: 13,
      core_drive: "Ownership & Possession",
      references: [33, 99, 420, 421, 294, 424, 429, 174, 210],
      active: false,
      name: "Avatar",
    },
    {
      number: 62,
      core_drive: "Social Influence & Relatedness",
      references: [424, 45, 213, 214],
      description:
        "Mechanisms that encourage social interactions or engagements within the platform.",
      socialMediaUsed:
        "Sending notifications or prompts to encourage users to interact with friends' posts or join group discussions.",
      bookQuote:
        "A Social Prod is an action of minimal effort to create a social interaction, often a simple click of a button. Good examples are Facebook Pokes/Likes and Google’s +1s.",
      goal: "To encourage users to interact with each other and to create a sense of community and shared purpose. To prompt and encourage users to interact with friends' content or join group discussions.",
      examples: [
        "Facebook Pokes",
        "Facebook Notifications",
        "LinkedIn Connection Requests",
      ],
      active: true,
      name: "Social Prods",
    },
    {
      number: 16,
      core_drive: "Ownership & Possession",
      references: [58, 175],
      active: false,
      name: "Prize Pacing/Collection Sets",
    },
    {
      number: 42,
      core_drive: "Ownership & Possession",
      references: [180, 181, 182],
      active: false,
      name: "Monitor Attachment",
    },
    {
      number: 43,
      core_drive: "Ownership & Possession",
      references: [174, 175],
      active: false,
      name: "Build-From-Scratch",
    },
    {
      number: 75,
      core_drive: "Ownership & Possession",
      references: [440, 444, 179, 116],
      active: false,
      name: "Exchangeable Points",
    },
    {
      number: 61,
      core_drive: "Social Influence & Relatedness",
      references: [33, 194, 204, 205, 206, 207, 217, 189],
      description: "Experienced users guide or mentor newer ones",
      socialMediaUsed:
        "Incorporating elements where experienced users like moderators or admins can guide or mentor newer ones through user-created tutorial-like content or guides.",
      bookQuote:
        "As a result, instead of quitting, I joined his Kingdom, became a valid member on his team, and helped the Kingdom collect resources such as lumber, fruits, stones, and equipment. Instead of playing the intended two hours, I ended up playing the game for two months before I forced myself to quit in order to start researching other games. Sadly, when I did quit, one of the members in the Kingdom did become fairly upset with me because he spent a good amount of time helping my character grow, in the hope that I would become a strong force within the Kingdom. At the time, I felt quite horrible being such a big letdown. This is the power of Mentorship, one of the Game Techniques in Core Drive 5: Social Influence & Relatedness that we will cover in this chapter. How many times have you tried to withdraw from a volunteer group, team, church, or even a relationship, but had an extremely hard time because you didn’t want to upset other people? We derive some of our most joyful experiences when we are with friends and family, and experience stress and anxiety when these relationships aren’t going well. We are innate social animals, and naturally endowed with a sense of empathy. We are influenced by what other people feel and think about us.",
      goal: "To onboard new users and to create a sense of community and shared purpose. To give a sense of purposes to veteran users. To stimulate social interactions between different user types. To create a system where users prevent each other from quitting.",
      examples: ["Reddit Moderators", "Facebook Group Admins"],
      active: true,
      name: "Mentorship",
    },
    {
      number: 83,
      core_drive: "Ownership & Possession",
      references: [100, 421, 423, 427, 429, 182, 183, 184, 318],
      active: false,
      name: "Alfred Effect",
    },
    {
      number: 57,
      core_drive: "Social Influence & Relatedness",
      references: [208, 209, 210],
      active: false,
      name: "Brag Buttons",
    },
    {
      number: 60,
      core_drive: "Social Influence & Relatedness",
      socialMediaUsed:
        "Recommending connections based on mutual friends or interests, and prompting users to interact with friends' content.",
      goal: "To encourage users to connect and interact with each other. To prompt and encourage users to interact with friends' content or join group discussions. To explicitly facilitate the formation of social connections and relationships.",
      examples: [
        "Facebook Friend Suggestions",
        "LinkedIn Connection Recommendations",
      ],
      active: true,
      name: "Friendship Loop",
    },
    {
      number: 28,
      core_drive: "Unpredictability & Curiosity",
      references: [105, 106, 107, 210, 439, 280, 281, 442, 252],
      active: false,
      name: "Glowing Choice",
    },
    {
      number: 30,
      core_drive: "Unpredictability & Curiosity",
      references: [284],
      active: false,
      name: "Sudden Rewards/Easter Eggs",
    },
    {
      number: 41,
      core_drive: "Unpredictability & Curiosity",
      active: false,
      name: "Sudden Tips",
    },
    {
      number: 58,
      core_drive: "Social Influence & Relatedness",
      references: [420, 408, 215, 216, 217, 444],
      bookQuote:
        "A game design technique I call Conformity Anchors implements this effect into products or experiences by displaying how close users are to the social norm through Feedback Mechanics. The SaaS (Software-as-a-Service) company Opower, which supplies services to public utilities, is a great example of using Conformity Anchors. Opower’s mission is to reduce our collective energy consumption. Their model is inspired by Robert Cialdini whom we have mentioned a few times in this book and is one of the leading experts on Core Drives 4 and 5, as well as the upcoming Core Drive 6: Scarcity & Impatience. Opower has discovered that, the best way to motivate households to consume less energy is to show them a chart comparing them to their neighbors.",
      description: "Users are encouraged to conform to the norms of the site",
      socialMediaUsed:
        "Displaying popular or trending content prominently to encourage users to engage with what's popular or widely accepted within the platform.",
      goal: "To influence user behavior and preferences by highlighting popular or trending content and encouraging users to conform to established norms or trends, leveraging the psychological principle of social proof. By showcasing popular content or activities, the platform shapes user perceptions and preferences, driving increased engagement and participation in activities endorsed by the community.",
      examples: [
        "Facebook Trending Topics",
        "Twitter Trending Hashtags",
        "YouTube Trending Videos",
        "Twitch Top Clips",
        "LinkedIn Trending Posts",
      ],
      active: true,
      name: "Conformity Anchor",
    },
    {
      number: 48,
      core_drive: "Unpredictability & Curiosity",
      active: false,
      name: "MiniQuests",
    },
    {
      number: 51,
      core_drive: "Unpredictability & Curiosity",
      active: false,
      name: "Pure Mischief",
    },
    {
      number: 71,
      core_drive: "Unpredictability & Curiosity",
      references: [422],
      active: false,
      name: "Oracle Effect",
    },
    {
      number: 72,
      core_drive: "Unpredictability & Curiosity",
      references: [282],
      active: false,
      name: "Random Rewards/Mystery Boxes",
    },
    {
      number: 73,
      core_drive: "Unpredictability & Curiosity",
      references: [346],
      active: false,
      name: "Refreshing Content",
    },
    {
      number: 55,
      core_drive: "Social Influence & Relatedness",
      references: [217],
      description: "Users are encouraged to engage in casual conversation",
      socialMediaUsed:
        "Incorporating comments sections, chat rooms, or forums where users can engage in discussions about shared interests or trending topics.",
      bookQuote:
        " In American corporate office culture, the water cooler is often the place where people take a small break from work and chat about a variety of non-work related topics. Much of the conversations focus around office gossip or complaints, and actively gets employees to bond with one another. One example of a Water Cooler is adding a forum to your site. Forums are very helpful for getting a community to bond and share ideas with each other. For this purpose, it also provides an environment to broadcast a social norm, while also connecting veterans to newbies for Mentorship opportunities.",
      goal: "To foster a sense of community and camaraderie among users by providing spaces for casual conversation and social interaction, leveraging the psychological principle of social bonding. By facilitating discussions around shared interests or trending topics, the platform strengthens user connections and engagement, enhancing overall user satisfaction and loyalty.",
      examples: [
        "Facebook Groups",
        "Twitter Chats",
        "YouTube Comments",
        "Twitch Chat",
        "LinkedIn Groups",
      ],
      active: true,
      name: "Water Coolers",
    },
    {
      number: 74,
      core_drive: "Unpredictability & Curiosity",
      references: [286],
      active: false,
      name: "Rolling Rewards/Lottery",
    },
    {
      number: 45,
      core_drive: "Social Influence & Relatedness",
      description:
        "Users are encouraged to thank each other for their contributions",
      socialMediaUsed:
        "Implementing features like gratitude buttons or thank-you notes where users can appreciate each other's content or actions.",
      examples: ["LinkedIn Endorsements", "Facebook Reactions"],
      goal: "To encourage users to appreciate and support each other's contributions and to create a sense of community and shared purpose. Also, to create a feedback loop that triggers intrinsic motivations to participate in generating content. Lastly, to create a sense of future reciprocity",
      active: true,
      name: "Thank-You Economy",
    },
    {
      number: 76,
      core_drive: "Unpredictability & Curiosity",
      references: [36, 326, 7, 399, 272, 273, 402, 276, 343],
      active: false,
      name: "Suspense",
    },
    {
      number: 22,
      core_drive: "Social Influence & Relatedness",
      references: [210, 211, 342, 377, 347, 189, 446],
      description: "Users are encouraged to work together to complete a task",
      socialMediaUsed:
        "Social media challenges or events where users participate together to achieve a common goal, such as fundraising challenges or viral hashtag campaigns.",
      bookQuote:
        "Group Quests are very effective in collaborative play as well as viral marketing because it requires group participation before any individual can achieve the Win-State.",
      examples: ["Facebook Fundraisers", "Twitter Hashtag Campaigns"],
      goal: "To encourage users to work together and to create a sense of community and shared purpose. Also, to create a sense of unpredictability and to create a sense of accomplishment from positive responses to content.",
      active: true,
      name: "Group Quests",
    },
    {
      number: 87,
      core_drive: "Unpredictability & Curiosity",
      active: false,
      name: "Obvious Wonder",
    },
    {
      number: 36,
      core_drive: "Loss & Avoidance",
      active: false,
      name: "Protector Quest",
    },
    {
      number: 46,
      core_drive: "Loss & Avoidance",
      references: [309, 311],
      active: false,
      name: "Rightful Heritage",
    },

    {
      number: 47,
      core_drive: "Loss & Avoidance",
      active: false,
      name: "Visual Grave",
    },
    {
      number: 1,
      core_drive: "Development & Accomplishment",
      references: [421, 440, 179, 116, 439, 120],
      description: "Users earn points for their contributions to the site",
      socialMediaUsed:
        "Social media sites often create status points for individual contributions.",
      bookQuote:
        "When you design your Status Point systems, make sure it is based on something meaningful - something that the users themselves want to engage in. Or else, points just become meaningless counters meant to stress people out.",
      goal: "To encourage users to contribute to the site and to allow users to see who is viewing their content and receive immediate feedback. Further, to create a sense of accomplishment from positive responses to content and possibly to create a sense of competition between users. Lastly, to create a sense of unpredictability.",
      examples: ["Reddit Karma", "StackOverflow Reputation"],
      active: true,
      name: "Status Points",
    },
    {
      number: 49,
      core_drive: "Loss & Avoidance",
      active: false,
      name: "Weep Tune",
    },
    {
      number: 50,
      core_drive: "Loss & Avoidance",
      references: [316],
      active: false,
      name: "The Sunk Cost Prison",
    },
    {
      number: 65,
      core_drive: "Loss & Avoidance",
      references: [304, 401, 439, 312, 313, 95, 319],
      active: false,
      name: "Countdown Timers",
    },
    {
      number: 81,
      core_drive: "Loss & Avoidance",
      active: false,
      name: "Progress Loss",
    },
    {
      number: 82,
      core_drive: "Loss & Avoidance",
      active: false,
      name: "Scarlet Letter",
    },
    {
      number: 84,
      core_drive: "Loss & Avoidance",
      references: [320, 313, 314, 315, 316, 446, 319],
      active: false,
      name: "FOMO Punch",
    },
    {
      number: 85,
      core_drive: "Loss & Avoidance",
      references: [308, 313, 314, 315, 62, 319],
      active: false,
      name: "Status Quo Sloth",
    },
    {
      number: 86,
      core_drive: "Loss & Avoidance",
      references: [312, 313, 319],
      active: false,
      name: "Evanescent Opportunities",
    },
    {
      number: 40,
      core_drive: "Undefined",
      references: [449, 433, 443],
      active: false,
      name: "Chain Combos",
    },
    {
      number: 94,
      core_drive: "Undefined",
      active: false,
      name: "Daily Catch",
    },
    {
      number: 95,
      core_drive: "Undefined",
      active: false,
      name: "Bandwagon Streak",
    },
    {
      number: 101,
      core_drive: "Undefined",
      active: false,
      name: "Daily Tipper",
    },
    {
      number: 102,
      core_drive: "Undefined",
      active: false,
      name: "Bootleg Quest",
    },
  ];

  const [showAll, setShowAll] = useState(true);
  const [showSocialMedia, setShowSocialMedia] = useState(false);

  useEffect(() => {
    const cards = document.querySelectorAll(".card-hoverable");
    cards.forEach((card) => {
      // text componenets are selected by .hidden-ct class
      let texts = card.querySelectorAll(".hidden-ct");
      let cardImage = card.querySelector(".card-img-top");
      console.log(texts);

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

  const handleShowAll = () => {
    setShowAll(!showAll);
  };

  const handleShowSocialMedia = () => {
    setShowSocialMedia(!showSocialMedia);
  };

  return (
    <MDBContainer fluid className="mt-5">
      <MDBTypography
        tag="div"
        className="display-1 pb-3 mb-4 text-center noto-display-h1"
      >
        Gamification in Social Media
      </MDBTypography>
      <MDBContainer fluid className="d-flex justify-content-center">
        <MDBContainer className="col-md-3 col-lg-3 col-sm-6 d-flex align-items-center flex-column me-1">
          <MDBTypography className="text-muted">
            <strong>All</strong> game mechanics from Chou
          </MDBTypography>
          <MDBBtn color="primary" onClick={handleShowAll}>
            Show
          </MDBBtn>
        </MDBContainer>

        <MDBContainer className="col-md-3 col-lg-3 col-sm-6 d-flex align-items-center flex-column ms-1">
          <MDBTypography className="text-muted">
            <strong>Social Media</strong> game mechanics only
          </MDBTypography>
          <MDBBtn color="primary" onClick={handleShowSocialMedia}>
            Show
          </MDBBtn>
        </MDBContainer>
      </MDBContainer>

      {(showAll || showSocialMedia) && (
        <MDBContainer fluid className="d-flex justify-content-center">
          <MDBContainer className="col-md-3 col-lg-3 col-sm-6 d-flex align-items-center flex-column ms-1">
            <MDBTypography note noteColor="light">
              <strong>Hover</strong> over the mechanics to see more details
              (specifically, the ones used on social media sites with blue
              titles)
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
            <MDBCol className="col-md-3 col-lg-2 col-sm-6 p-2" key={index}>
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
                  {/* <MDBContainer className="d-flex justify-content-center m-0 p-0" style={{opacity: ".67"}}> */}
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
                  {mechanic.description && (
                    <MDBCardText className="hidden-ct fully-hidden">
                      <strong>Description </strong>
                      {mechanic.description}
                    </MDBCardText>
                  )}
                  {mechanic.core_drive && (
                    <MDBCardText className="hidden-ct fully-hidden">
                      <strong>Core Drive </strong>
                      {mechanic.core_drive}
                    </MDBCardText>
                  )}
                  {mechanic.socialMediaUsed && (
                    <MDBCardText className="hidden-ct fully-hidden">
                      <strong>How it's used in social media </strong>
                      {mechanic.socialMediaUsed}
                    </MDBCardText>
                  )}
                  {mechanic.goal && (
                    <MDBCardText className="hidden-ct fully-hidden">
                      <strong>Goal </strong>
                      {mechanic.goal}
                    </MDBCardText>
                  )}
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
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          );
        })}
      </MDBRow>

      <MDBTypography tag="h1" className="mt-5 mb-3 noto-display-h1 text-center">
        Notable Examples of Gamified Social Media Apps
      </MDBTypography>
      <MDBContainer className="col-md-11 col-lg-11 col-sm-11 d-flex align-items-center flex-column p-4">
        <MDBTypography tag="h3">Success</MDBTypography>
        <MDBTypography>
          Across these examples, the
          <strong> most successful implementation </strong>of gamification in
          social media is Facebook. Facebook has successfully implemented a
          variety of gamification mechanics to encourage user engagement and
          interaction. The platform uses status points, group quests, and
          mentorship to encourage users to contribute to the site, work together
          to complete tasks, and onboard new users. Facebook also uses social
          prods and social treasures/gifting to encourage users to interact with
          each other and support each other's contributions. The platform also
          uses trophy shelves to encourage users to showcase their achievements
          and milestones to their social network. Lastly, Facebook uses
          appointment dynamics to establish a habit of regular engagement by
          notifying users of upcoming events, live streams, or content releases
          to create anticipation and encourage participation. These mechanics
          have contributed to Facebook's success in maintaining user engagement
          and retention, and have helped the platform become one of the most
          popular social media sites in the world.
        </MDBTypography>
      </MDBContainer>
      <MDBContainer className="col-md-11 col-lg-11 col-sm-11 d-flex align-items-center flex-column p-4">
        <MDBTypography tag="h3">Failure</MDBTypography>
        <MDBTypography>
          One example of a <strong>failed implementation </strong>of
          gamification in social media is Google+. Google+ attempted to use
          status points and group quests to encourage users to contribute to the
          site and work together to complete tasks. However, the platform failed
          to gain significant traction and was eventually shut down due to low
          user engagement and adoption. The mechanics used on Google+ were not
          effective in encouraging user interaction and participation, and the
          platform was unable to compete with other social media sites like
          Facebook and Twitter. As a result, Google+ was considered a failure in
          the realm of social media gamification.
        </MDBTypography>
      </MDBContainer>
      <MDBContainer className="col-md-11 col-lg-11 col-sm-11 d-flex align-items-center flex-column p-4">
        <MDBTypography tag="h3">Innovation</MDBTypography>
        <MDBTypography>
          An <strong>innovative example</strong> of gamification in social media
          is TikTok. TikTok has successfully implemented a variety of
          gamification mechanics to encourage user engagement and participation.
          The platform's biggest innovation was its discovery algorithm, which
          utilized the Dangling mechanic and gave users a stronger drive of
          higher meaning and calling -- by knowing that they always have the
          chance to go viral due to a meritocritous discovery/promotion system.
          Furthermore, The platform uses status points, group quests, and
          mentorship to encourage users to contribute to the site, work together
          to complete tasks, and onboard new users. TikTok also uses social
          prods and social treasures/gifting to encourage users to interact with
          each other and support each other's contributions. The platform also
          uses appointment dynamics to establish a habit of regular engagement
          by notifying users of upcoming events, live streams, or content
          releases to create anticipation and encourage participation. These
          mechanics have contributed to TikTok's success in maintaining user
          engagement and retention, and have helped the platform become one of
          the most popular social media apps in the world.
        </MDBTypography>
      </MDBContainer>

      <MDBTypography tag="h1" className="mt-5 mb-3 noto-display-h1 text-center">
        Implications, Opportunities and Ethics
      </MDBTypography>
      <MDBContainer className="col-md-11 col-lg-11 col-sm-11 d-flex align-items-center flex-column p-4">
        <MDBTypography tag="h3">Implications</MDBTypography>
        <MDBTypography>
          Gamification in social media has the potential to significantly impact
          user engagement and retention. By implementing gamification mechanics,
          social media platforms can encourage users to contribute to the site,
          work together to complete tasks, and onboard new users. These
          mechanics can also foster a sense of community and shared purpose, and
          create a feedback loop that triggers intrinsic motivations to
          participate in generating content. Additionally, gamification can
          create a sense of ownership and investment in the platform, and
          stimulate social interactions between different user types. Overall,
          the implication of gamification in social media is that it has the
          potential to enhance user engagement, retention, and satisfaction, and
          to foster a strong sense of community and shared purpose among users.
        </MDBTypography>
      </MDBContainer>

      <MDBContainer className="col-md-11 col-lg-11 col-sm-11 d-flex align-items-center flex-column p-4">
        <MDBTypography tag="h3">Ethical Considerations</MDBTypography>
        <MDBTypography>
          Morality and ethics are subjective and can vary based on cultural,
          religious, and personal beliefs. However, gamification in social media
          can raise ethical concerns related to user privacy, data security, and
          psychological manipulation. For example, the use of gamification
          mechanics to encourage users to share personal information or engage
          in specific behaviors could raise concerns about privacy and data
          security. Additionally, the use of gamification to manipulate user
          behavior or create addictive experiences could raise concerns about
          psychological well-being and mental health. It is important for social
          media platforms to consider the ethical implications of gamification
          and to prioritize user well-being and safety in their design and
          implementation of gamification mechanics.
          <br></br>
          Given the difficulty of defining morality, it may be best for a
          company to build whatever product they want and let the market decide
          if it is moral or not -- i.e., let the moral conesensus to materialize
          through market-participants voting with their wallets. If a society
          deems a product immoral, it is up to them to stop using it. If they
          continue to use it, then it is moral.
        </MDBTypography>
      </MDBContainer>

      <MDBContainer className="col-md-11 col-lg-11 col-sm-11 d-flex align-items-center flex-column p-4">
        <MDBTypography tag="h3">Opportunities</MDBTypography>
        <MDBTypography>
          <ul>
            <li>
              Using gamification to encourage users to engage in charitable
              activities or social causes, such as fundraising challenges or
              viral hashtag campaigns.
            </li>
            <li>
              Implementing gamification mechanics to promote mental health and
              well-being, such as encouraging users to share positive
              affirmations or engage in self-care activities.
            </li>
            <li>
              Using gamification to foster cross-cultural understanding and
              empathy, such as encouraging users to share stories or experiences
              from different cultural backgrounds.
            </li>
            <li>
              Implementing gamification mechanics to promote environmental
              sustainability and conservation, such as encouraging users to
              participate in eco-friendly challenges or initiatives.
            </li>
            <li>
              Using gamification to promote civic engagement and political
              participation, such as encouraging users to share information
              about local elections or community events.
            </li>
            <li>
              Turning discussion forums into a game where users can earn points
              for contributing to the conversation, and the most active users
              are rewarded with special badges or recognition.
            </li>
          </ul>
        </MDBTypography>
      </MDBContainer>

      <MDBContainer className="col-md-11 col-lg-11 col-sm-11 d-flex align-items-center flex-column p-4">
        <MDBTypography tag="h3">Additional Impacts</MDBTypography>
        <MDBTypography>
          There are concerns about a theoretical society wherein social media
          communication becomes more commonplace than face-to-face
          communication. This could lead to a society where people are less
          empathetic and less able to read social cues. This could lead to a
          society where people are less able to form meaningful relationships
          and are more prone to loneliness and depression. This could lead to a
          society where people are more prone to manipulation and
          misinformation. This could lead to a society where people are more
          prone to addiction and mental health issues. This could lead to a
          society where people are more prone to radicalization and extremism.
          This could lead to a society where people are more prone to violence
          and crime. This could lead to a society where people are more prone to
          political polarization and social unrest. This could lead to a society
          where people are more prone to authoritarianism and totalitarianism.
          This could lead to a society where people are more prone to
          environmental degradation and ecological collapse. This could lead to
          a society where people are more prone to economic inequality and
          social injustice. This could lead to a society where people are more
          prone to war and conflict. This could lead to a society where people
          are more prone to existential risk and human extinction.
        </MDBTypography>
      </MDBContainer>
    </MDBContainer>
  );
}

export default SocialMediaGamification;
