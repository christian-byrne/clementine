(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[983],{8131:function(e,s,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/leaderboards",function(){return a(7785)}])},7785:function(e,s,a){"use strict";a.r(s),a.d(s,{default:function(){return h}});var l=a(5893),t=a(7294),r=a(314),o=a(3276),n=a(387),i=a(9226),d=a(4548),c=function(e){let{leaderBoardData:s,visibleColumns:a,maxRows:c,leaderBoardName:m,description:u,socialBadges:h}=e,[x,g]=(0,t.useState)(1),f=()=>{let e=window.innerWidth;e>2150?g(3):e>1950?g(2):g(1)};return(0,t.useEffect)(()=>{f();let e=()=>{f()};return window.addEventListener("resize",e),()=>{window.removeEventListener("resize",e)}},[]),(null==s?void 0:s.length)>0&&(0,l.jsx)(r.L5,{className:"col-md-12 col-lg-6 col-sm-12 my-3",children:(0,l.jsxs)(r.Yl,{className:"h-100 d-flex d-column",style:{overflowX:"scroll"},children:[(0,l.jsxs)(r.QM,{className:"mt-4 ms-3 mb-1 h2",children:["\xa0",m||"Leaderboard"]}),u&&(0,l.jsx)(r.Pp,{className:"ms-4 mb-4 text-muted",children:u}),(0,l.jsx)(r.H7,{children:(0,l.jsxs)(r.re,{align:"middle",children:[(0,l.jsx)(r.u8,{children:(0,l.jsxs)("tr",{children:[(0,l.jsx)("th",{scope:"col",children:"Name"}),(0,l.jsx)("th",{scope:"col",children:"Social Stats"}),a&&a.length>0&&a.map((e,s)=>(0,l.jsx)("th",{scope:"col",children:(0,o.g)(e)},s))]})}),(0,l.jsx)(r.HG,{children:(null==s?void 0:s.length)>0&&s.slice(1,c).map((e,s)=>{let t={};return 0===s?t={backgroundColor:"rgba(255, 248, 208, .52"}:1===s?t={backgroundColor:"rgba(244, 233, 230, .5)"}:2===s&&(t={backgroundColor:"rgba(255, 218, 208, .2)"}),(0,l.jsxs)("tr",{style:t,children:[e.name&&(0,l.jsx)("td",{className:"clickable",children:(0,l.jsxs)("div",{className:"d-flex align-items-center",children:[(0,l.jsx)("a",{href:(0,d.Z)("user/"+e.name.replaceAll(" ","-").toLowerCase()),style:{color:"inherit",textDecoration:"inherit"},children:(0,l.jsx)("img",{src:(0,d.Z)("pictures/pfps/"+e.name.replaceAll(" ","-").toLowerCase()+"-3.png"),alt:"",style:{width:"80px",height:"80px"},className:"rounded-circle"})}),(0,l.jsx)("a",{href:(0,d.Z)("user/"+e.name.replaceAll(" ","-").toLowerCase()),style:{color:"inherit",textDecoration:"inherit"},children:(0,l.jsxs)("div",{className:"ms-3",children:[(0,l.jsx)("p",{className:"fw-bold mb-1",children:e.username||e.name||""}),(0,l.jsx)("p",{className:"text-muted mb-0",children:e.name||""})]})})]})},s),(0,l.jsx)("td",{className:"px-0 pt-4 pb-2",children:(0,l.jsx)(n.Z,{likes:h.includes("likes")?e.likes:null,downloads:h.includes("downloads")?e.downloads:null,favorites:h.includes("favorites")?e.favorites:null,totalRatings:h.includes("totalRatings")?e.totalRatings:null,averageRating:h.includes("averageRating")?e.averageRating:null,style:{flexWrap:"nowrap"},numVisibleBadges:x})}),(null==a?void 0:a.length)>0&&a.map((s,a)=>{let t=e[s],r="number"==typeof t?(0,i.v)(t,6):t||"";return(0,l.jsx)("td",{children:r},a)})]},s)})})]})})]})})},m=a(3575);function u(e,s){let a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"desc";return e?[...e.sort((e,l)=>"asc"===a?e[s]<l[s]?-1:1:e[s]>l[s]?-1:1)]:(console.error("Leaderboards Page: Users Data is empty or not in the correct format"),e)}var h=function(){return(0,t.useEffect)(()=>{document.title="LeaderBoards"},[]),(0,l.jsx)(r.L5,{fluid:!0,children:(0,l.jsx)(r.uZ,{children:(0,l.jsx)("main",{role:"main",className:"col-md-12 ms-sm-auto col-lg-12 px-md-4",children:(0,l.jsxs)(r.L5,{fluid:!0,className:"mt-5",children:[(0,l.jsxs)(r.uZ,{children:[(0,l.jsx)(c,{leaderBoardName:"Style Stars",description:"Users who have the most motion",leaderBoardData:u(m,"views"),visibleColumns:["views"],maxRows:13,socialBadges:["likes","downloads","favorites"]}),(0,l.jsx)(c,{leaderBoardName:"Most Influential",description:"Creators whose stylists get downloaded and used the most",leaderBoardData:u(m,"downloads"),visibleColumns:["location"],maxRows:13,socialBadges:["likes","favorites","downloads"]}),(0,l.jsx)(c,{leaderBoardName:"Front-Runners",description:"Creators with the highest average rating",leaderBoardData:u(m,"averageRating"),visibleColumns:["averageRating","favorites"],maxRows:10,socialBadges:["likes","favorites"]}),(0,l.jsx)(c,{leaderBoardName:"Chart-Toppers",description:"Most prolific - Creators with the most models",leaderBoardData:u(m,"modelCount"),visibleColumns:["modelCount","joinDate"],maxRows:10,socialBadges:["totalRatings","averageRating","downloads"]}),(0,l.jsx)(c,{leaderBoardName:"Most Decorated",description:"Users with the most badges, titles, and achievements",leaderBoardData:u(m,"badgeCount"),visibleColumns:["badgeCount","titleCount","achievementCount"],maxRows:10,socialBadges:["downloads"]}),(0,l.jsx)(c,{leaderBoardName:"Hall of Fame",description:"Veterans who never fell off",leaderBoardData:u(m,"joinDate"),visibleColumns:["joinDate","lastActive"],maxRows:10,socialBadges:["favorites"]})]}),(0,l.jsx)(r.uZ,{})]})})})})}},3276:function(e,s,a){"use strict";function l(e){let s="";for(let a=0;a<e.length;a++)e[a]===e[a].toUpperCase()?s+=" "+e[a]:s+=e[a];return s[0].toUpperCase()+s.slice(1)}a.d(s,{g:function(){return l}})}},function(e){e.O(0,[859,888,774,179],function(){return e(e.s=8131)}),_N_E=e.O()}]);