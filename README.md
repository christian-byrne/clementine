Front end of social fashion-recommendations app. Applying lessons learned in Gamification class to create a more engaging interface and user experience in a purposeful way.

# [👉 VIEW THE APP LIVE](https://clementine-christian-byrnes-projects.vercel.app/featured)


Populated with 200+ AI-generated users, each with their own set of cohesive data/photoes/models/etc.

<!-- &nbsp; -->

### PAGES

- 🏆 Leaderboards
  - Live View - [Leaderboards](https://clementine-christian-byrnes-projects.vercel.app/leaderboards)
  - Source - [leaderboards.jsx](https://github.com/christian-byrne/clementine/blob/main/pages/leaderboards.jsx)
- 🌟 Featured
  - Live View - [Featured Models](https://clementine-christian-byrnes-projects.vercel.app/featured)
  - Source - [featured.jsx](https://github.com/christian-byrne/clementine/blob/main/pages/featured.jsx)
- 👗 Models - Scroller Browsing 
  - Live View - [Models](https://clementine-christian-byrnes-projects.vercel.app/browse/models/0)
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
    - Live View - [blog/silhouettes]
  - Data
  <!-- - Algorithms
  - Segmentation -->
- 💎 Currency
  - In Progres...

&nbsp; 


previous commit log:

- new homepage layout
- sort db models util with shallow copies
- TitleText component


--------------

### TODO

- [ ] Overlaid caption title on scroller view should be flush with bottom in 3-row grid view
- [ ] On mobile scroller view 
  - [ ] keydown/keyup events need to be replaced with touch events
- [ ] User profile content title -> clickable "view more" -> scroller view but filtered to only include items from that user
- [ ] Photos on content cards -> carousels
- [ ] New homepage corresponds to player pathway/loop analysis
  - [ ] leaderboard preview
  - [ ] Smaller model and photo cards
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
- [ ] automatically go to top of page when changing views on mobile
- [ ] [Search feature on leaderboards](https://mdbootstrap.com/docs/react/data/datatables/#:~:text=SHOW%20CODE-,Search,-Use%20search%20proprty)
- [ ] [Async loader animation on leaderboards](https://mdbootstrap.com/docs/react/data/datatables/#:~:text=SHOW%20CODE-,Action%20buttons,-With%20the%20Datatable)


