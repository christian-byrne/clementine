Front end of social fashion-recommendations app. Applying lessons I learned in Gamification class to create a more engaging interface and user experience in a purposeful way 🤗.

# [👉 VIEW THE APP LIVE](https://clementine-christian-byrnes-projects.vercel.app/featured)


Populated with 200+ AI-generated users, each with their own set of cohesive data/photoes/models/etc.

<!-- &nbsp; -->

### PAGES

- 🏆 Leaderboards
  - Live View - [Leaderboards](https://clementine-christian-byrnes-projects.vercel.app/leaderboards)
  - Source - [leaderboards.jsx](https://github.com/christian-byrne/clementine/blob/main/pages/leaderboards.jsx)
- 🌟 Featured
  - Live View - [Featured Content](https://clementine-christian-byrnes-projects.vercel.app/featured)
  - Source - [featured.jsx](https://github.com/christian-byrne/clementine/blob/main/pages/featured.jsx)
- 👗 Stylists - Scroller Browsing 
  - Live View - [Stylists](https://clementine-christian-byrnes-projects.vercel.app/browse/stylists/0)
  - Source - [browse/[contentType]/[itemName].jsx](https://github.com/christian-byrne/clementine/blob/main/pages/browse/%5BcontentType%5D/%5BitemName%5D.jsx)
- 📷 Photos - Scroller Browsing
  - Live View - [Photos](https://clementine-christian-byrnes-projects.vercel.app/browse/photos/0)
  - Source - [browse/[contentType]/[itemName].jsx](https://github.com/christian-byrne/clementine/blob/main/pages/browse/%5BcontentType%5D/%5BitemName%5D.jsx) 
- 👤 User Profile
  - Live View - Example Users
    - Wednesday Addams - [user/wednesday-addams](https://clementine-christian-byrnes-projects.vercel.app/user/wednesday-addams)
    - astarisborn - [user/astarisborn](https://clementine-christian-byrnes-projects.vercel.app/user/astarisborn)
    - Kate Mercer - [user/kate-mercer](https://clementine-christian-byrnes-projects.vercel.app/user/kate-mercer)
    - Lena Double - [user/lena-double](https://clementine-christian-byrnes-projects.vercel.app/user/lena-double)
  - Source - [user/[name].jsx](https://github.com/christian-byrne/clementine/blob/main/pages/user/%5Bname%5D.jsx)
- 🌐 Landing Page (old)
  - Live View - [Landing Page](https://clementine-christian-byrnes-projects.vercel.app/)
  - Source - [index.jsx](https://github.com/christian-byrne/clementine/blob/main/pages/index.jsx)
- 📝 Blog Pages
  - Silhouettes
    - Live View - [blog/silhouettes](https://clementine-christian-byrnes-projects.vercel.app/blog/silhouettes)
  - Data
  <!-- - Algorithms
  - Segmentation -->
- 💎 Currency
  - In Progres...
- 🎉 New User Welcome/Signup Page
  - In Progress...

&nbsp; 




--------------

### TODO

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
- [ ] Currency Page
- [ ] Dress/Suggestions Page 
- [ ] Improve lazy loading and async loading on user, leaderboard pages
- [ ] scrollbars on mobile (leaderboard)
- [x] Pause github actions workflow while using Vercel
- [x] Model/Post Page more like civ post
  - [ ] Additional metadata
  - [ ] Socials link
  - [ ] Blog
  - [ ] comments
- [ ] Blog routing
  - [ ] Add silhouttes back to blog
  - [ ] change location of other blog pages
<!-- - [ ] [Search feature on leaderboards](https://mdbootstrap.com/docs/react/data/datatables/#:~:text=SHOW%20CODE-,Search,-Use%20search%20proprty) -->


