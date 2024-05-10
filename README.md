**Social UGC-based AI fashion-suggestions** app. Users upload pictures to refine base recommendation models to match specific styles or trends and merge existing models to create style fusions. Models are then used to help complete outfits. Users select models by browsing other users' creations.

# [👉 VIEW THE APP LIVE](https://clementine-christian-byrnes-projects.vercel.app/featured)


### Description


<details>

<summary>Click to expand</summary>

Main thing the user will do: (1) Upload selfies of what they are currenlt wearing (2) segmentation + txt2img -> the items are automatically catalogued, (3) They choose which of the items they are wearing shouldn't change which can change, (4) They choose a model (e.g., an athleisure model, a 90s model, a grunge model, etc.), (5) They get suggestions for how to complete/alter the outfit. 

Since the only user data required is a selfie once per use, it avoids the hurdle of forcing users to upload/enter their entire wardrobe at any point (the main hurdle that holds back the fashion-tech space IMO). The zero-to-demo time on first use should be <3 minutes.

In this app, I applied the lessons I learned in a Gamification course to create a more engaging interface, account for different player types, design with the user's loops in mind, and motivate desired behaviors in a purposeful way 🤗.



Populated with AI-generated content/posts/pictures and 200+ users, each with their own set of cohesive data/photoes/models/

</details>

<!-- &nbsp; -->

### PAGES


<details>

<summary>Click to expand</summary>

- 🌐 Home Page
  - Live View - [Home Page (returning user)](https://clementine-christian-byrnes-projects.vercel.app/)
  - Source - [/index.jsx](https://github.com/christian-byrne/clementine/blob/main/pages/index.jsx)
- 📦 Dress
  - Live View - [Dress - Get Suggestions (main use)](https://clementine-christian-byrnes-projects.vercel.app/dress)
  - Source - [dress.jsx](https://github.com/christian-byrne/clementine/blob/main/pages/dress.jsx)
- 💎 Currency
  - Live View - [Rubies - In-site Currency Dashboard](https://clementine-christian-byrnes-projects.vercel.app/rubies)
  - Source - [rubies/index.jsx](https://github.com/christian-byrne/clementine/blob/main/pages/rubies/index.jsx)
- 🏆 Leaderboards
  - Live View - [Micro-Leaderboards Page](https://clementine-christian-byrnes-projects.vercel.app/leaderboards)
  - Source - [leaderboards.jsx](https://github.com/christian-byrne/clementine/blob/main/pages/leaderboards.jsx)
- 👤 User Profile
  - Live View - Example Users
    - Wednesday Addams - [user/wednesday-addams](https://clementine-christian-byrnes-projects.vercel.app/user/wednesday-addams)
    - astarisborn - [user/astarisborn](https://clementine-christian-byrnes-projects.vercel.app/user/astarisborn)
    - Kate Mercer - [user/kate-mercer](https://clementine-christian-byrnes-projects.vercel.app/user/kate-mercer)
    - Lena Double - [user/lena-double](https://clementine-christian-byrnes-projects.vercel.app/user/lena-double)
  - Source - [user/[name].jsx](https://github.com/christian-byrne/clementine/blob/main/pages/user/%5Bname%5D.jsx)
- 🎨 Create
  - Live View - [Create/Refine Stylists (models)](https://clementine-christian-byrnes-projects.vercel.app/create/refine)
  - Source - [create/refine/index.jsx](https://github.com/christian-byrne/clementine/blob/main/pages/create/refine/index.jsx)
- 🔄 Merge
  - Live View - [Merge Stylists (models)](https://clementine-christian-byrnes-projects.vercel.app/create/merge)
  - Source - [create/merge/index.jsx](https://github.com/christian-byrne/clementine/blob/main/pages/create/merge/index.jsx)
- 👒 Styles
  - Live View - [Styles - Stylist Creation Reference Points/Glossary](https://clementine-christian-byrnes-projects.vercel.app/styles)
  - Source - [styles.jsx](https://github.com/christian-byrne/clementine/blob/main/pages/styles.jsx)
- 🌟 Featured
  - Live View - [Featured Content (live feed)](https://clementine-christian-byrnes-projects.vercel.app/featured)
  - Source - [featured.jsx](https://github.com/christian-byrne/clementine/blob/main/pages/featured.jsx)
- 👗 Stylists
  - Live View - [Stylists (models scroller browsing)](https://clementine-christian-byrnes-projects.vercel.app/browse/stylists/0)
  - Source - [browse/[contentType]/[itemName].jsx](https://github.com/christian-byrne/clementine/blob/main/pages/browse/%5BcontentType%5D/%5BitemName%5D.jsx)
- 📷 Photos
  - Live View - [Photos (scroller browsing)](https://clementine-christian-byrnes-projects.vercel.app/browse/photos/0)
  - Source - [browse/[contentType]/[itemName].jsx](https://github.com/christian-byrne/clementine/blob/main/pages/browse/%5BcontentType%5D/%5BitemName%5D.jsx) 
- 📝 Blog Pages
  - Live View - [Blog - All Articles](https://clementine-christian-byrnes-projects.vercel.app/blog)
  - Source - [blog/index.jsx](https://github.com/christian-byrne/clementine/blob/main/pages/blog/index.jsx)
- 📜 Silhouettes
  - Live View - [Silhouettes - Reference & Workshop (canvas)](https://clementine-christian-byrnes-projects.vercel.app/blog/blue-is-a-language/silhouettes) 
  - Source - [blog/blue-is-a-language/silhouettes.jsx](https://github.com/christian-byrne/clementine/blob/main/pages/blog/blue-is-a-language/silhouettes.jsx)
- 🎉 New User Welcome/Signup Page
  - In Progress...
- My Closet
  - In Progress... 
- Daily Tasks
  - In Progress...
- Site-wide Search
  - In Progress...


&nbsp; 

</details>

### TODO

<details>

<summary>Click to expand</summary>



- [ ] Site-wide search
  - [ ] search bar in navbar
  - [ ] search page
  - [ ] search results page
- [ ] Upload process - main part of demo
  - [ ] 1 selfie -> 
  - [ ] 2 txt2img -> 
  - [ ] 3 segmentation -> 
  - [ ] 4 descriptions paired with segmented alpha layers ->
  - [ ] 5 display -> 
  - [ ] 6 update req
- [ ] User login and signup
  - [ ] ruby fields to user record
  - [ ] login credential db separated
  - [ ] sessions 
- [ ] Cards accept badge breakpoint arg from Pages and pass to TagBadges component when appropriate (given differing card col sizings per page)
- [ ] small image/svg/icon property for items/stylists/etc.
  - [ ] use in tables
  - [ ] use in .... 
- [x] Create Stylist page
  - [x] merge n existing styles indicating n weight for each
  - [x] merge existing style with new photos drag and drop
- [x] Dress page
  - [x] choose from stylist list (table mapping user pkeys to saved or accessible Stylist pkeys)
  - [x] choose input items from closet (table which includes Item records)
- [x] StyleCard xOverflow on small width screens
- [x] X-axis units on currency graph
- [ ] Individual Badges Page (user achievement badges not tag badges)
- [x] Branding
- [x] Favicon
- [ ] Closet Page
- [x] TikTok Scroller padding algorithm so footer always bottom at same y-coordinate
- [ ] Salesforce Img2Txt implementation
- [x] Styles/movements directory
- [ ] Glossary of terms in blog (OneNote Fa)
- [x] "bio" to user record field
- [x] Photos on content cards -> carousels
- [x] Responsive photo grid doesn't go to configurations that wouldnt be possible with the size of the passed photo data argument
- [x] Overlaid caption title on scroller view should be flush with bottom in 3-row grid view
- [x] On mobile scroller view: keydown/keyup events need to be replaced with touch events
- [ ] User profile content title -> clickable "view more" badge -> scroller view but filtered to only include items from that user
- [x] New homepage corresponds to player pathway/loop analysis
  - [x] leaderboard preview
  - [x] Smaller model and photo cards
- [x] Close navbar by default on mobile
- [ ] Landing/demo page for new (visited <3 times) users
  - [ ] Demo
  - [ ] Signup form
- [x] Currency Page
- [x] Dress/Suggestions Page 
- [ ] scrollbars on mobile (leaderboard)
- [x] Pause github actions workflow while using Vercel
- [x] Model/Post Page more like civ post
  - [ ] Additional metadata
  - [ ] Socials link
  - [x] Blog
  - [ ] References
  - [ ] comments
- [ ] Daily Tasks Page
- [x] Blog routing
  - [x] Add silhouttes back to blog
  - [x] change location of other blog pages
<!-- - [ ] [Search feature on leaderboards](https://mdbootstrap.com/docs/react/data/datatables/#:~:text=SHOW%20CODE-,Search,-Use%20search%20proprty) -->


</details>

