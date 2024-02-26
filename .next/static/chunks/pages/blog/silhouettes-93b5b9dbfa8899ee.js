(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[996],{9433:function(t,e,i){(window.__NEXT_P=window.__NEXT_P||[]).push(["/blog/silhouettes",function(){return i(898)}])},898:function(t,e,i){"use strict";i.r(e),i.d(e,{default:function(){return T}});var o=i(5893),h=i(7294),d=i(314),l=i(2237);function a(t){let{stageWidth:e,topWidth:i,bottomWidth:h,startY:d,endY:a,strokeColor:s,strokeWidth:n}=t,r=(e-i)/2,g=r+i,T=(e-h)/2,H=T+h,W=[[r,d,g,d],[T,a,H,a],[r,d,T,a],[g,d,H,a]];return(0,o.jsx)(o.Fragment,{children:(null==W?void 0:W.length)>=3&&W.map((t,e)=>(0,o.jsx)(l.x1,{points:t,stroke:s,strokeWidth:n},e))})}var s=function(t){let{containerSize:e,sketchProportions:i,strokeWidth:d=3.236}=t,[s,n]=(0,h.useState)(!1),r={head:{},neck:{},torso:{},middle:{},"upper-legs":{},"lower-legs":{},feet:{}},g=e.height*i.headHeightToTotalHeight,T=g*i.headWidthToHeadHeight;r.head.height=g,r.head.startY=0,r.head.endY=g,r.head.topWidth=T,r.head.bottomwidth=T;let H=e.height*i.neckHeightToTotalHeight,W=g*i.neckWidthtoHeadHeight;r.neck.height=H,r.neck.startY=g,r.neck.endY=g+H,r.neck.topWidth=W,r.neck.bottomwidth=W;let c=e.height*i.torsoHeightToTotalHeight,p=T*i.shoulderWidthToBizygomaticWidth*i.biyzgomaticWidthToHeadWidth,u=1/i.shoulderWidthToWaistWidth*p;r.torso.height=c,r.torso.startY=g+H,r.torso.endY=g+H+c,r.torso.topWidth=p,r.torso.bottomwidth=u;let m=e.height*i.middleHeightToTotalHeight,k=1/i.waistWidthToHipWidth*u;r.middle.height=m,r.middle.startY=g+H+c,r.middle.endY=g+H+c+m,r.middle.topWidth=u,r.middle.bottomwidth=k;let w=e.height*i.upperLegHeightToTotalLowerBodyHeight*i.lowerBodyHeightToTotalHeight,f=i.topUpperWidthToMiddleBottomWidth*k,x=i.kneeWidthToHeadHeight*g;r["upper-legs"].height=w,r["upper-legs"].startY=g+H+c+m,r["upper-legs"].endY=g+H+c+m+w,r["upper-legs"].topWidth=f,r["upper-legs"].bottomwidth=x;let b=e.height*(1-i.upperLegHeightToTotalLowerBodyHeight)*i.lowerBodyHeightToTotalHeight,j=i.ankleWidthToKneeWidth*x;r["lower-legs"].height=b,r["lower-legs"].startY=g+H+c+m+w,r["lower-legs"].endY=g+H+c+m+w+b,r["lower-legs"].topWidth=x,r["lower-legs"].bottomwidth=j;let y=e.height*i.footHeightToTotalHeight,B=i.topFootWidthToAnkleWidth*j,Y=i.soleWidthToAnkleWidth*B;return r.feet.height=y,r.feet.startY=g+H+c+m+w+b,r.feet.endY=g+H+c+m+w+b+y,r.feet.topWidth=B,r.feet.bottomwidth=Y,(0,o.jsx)(l.Hf,{width:e.width,height:e.height,className:"mb-4 silhouette-sketch-bg-pic d-flex justify-content-center align-items-center",style:{backgroundImage:"url('/pictures/silhouette-examples/".concat(i.name,"-1.jpg')"),backgroundSize:"contain",backgroundRepeat:"no-repeat",backgroundPosition:"center center"},onMouseEnter:()=>{n(!0)},onMouseLeave:()=>{n(!1)},children:(0,o.jsx)(l.mh,{children:Object.keys(r).map(t=>(0,o.jsx)(a,{stageWidth:e.width,strokeColor:s?"rgba(9, 188, 138, .832)":"rgba(255, 16, 240, .9618)",strokeWidth:s?1.1618*d:d,topWidth:r[t].topWidth,bottomWidth:r[t].bottomwidth,startY:r[t].startY,endY:r[t].endY},t))})})},n=i(3276),r=function(t){let{sketchData:e}=t,[i,l]=(0,h.useState)(window.innerWidth/5),[a,r]=(0,h.useState)(e);(0,h.useEffect)(()=>{{let t=()=>{l(window.innerWidth/5)};return window.addEventListener("resize",t),()=>{window.removeEventListener("resize",t)}}},[]);let g=(t,e)=>{r({...a,[t]:e})};return(0,o.jsx)(d.TK,{style:{width:i},children:(0,o.jsxs)(d.Yl,{className:"h-100",children:[(0,o.jsxs)(d.H7,{className:"d-flex flex-column justify-content-end",children:[(0,o.jsx)(d.QM,{className:"text-center mb-3 h-100",children:e.name?(0,n.g)(e.name):"Silhouette"}),(0,o.jsx)(s,{containerSize:{width:i,height:i},sketchProportions:a.name?a:e})]}),(0,o.jsxs)(d.re,{align:"middle",children:[(0,o.jsx)(d.u8,{light:!0,children:(0,o.jsxs)("tr",{children:[(0,o.jsx)("th",{scope:"col",children:"Ratio"}),(0,o.jsx)("th",{scope:"col",children:"Value"})]})}),(0,o.jsx)(d.HG,{children:Object.keys(e).map((t,i)=>{if("name"!==t&&"examples"!==t)return(0,o.jsxs)("tr",{children:[(0,o.jsx)("th",{scope:"col",children:(0,n.g)(t)}),(0,o.jsx)("td",{children:(0,o.jsx)(d.u2,{type:"number",label:e[t],onChange:e=>g(t,e.target.value),step:"0.05"})})]},i)})})]})]})})},g=JSON.parse('[{"name":"standardGoldenRatioIdeals","examples":["img_0820.webp"],"headHeightToTotalHeight":0.125,"headWidthToHeadHeight":0.75,"neckHeightToTotalHeight":0.0625,"neckWidthtoHeadHeight":0.35,"shoulderWidthToBizygomaticWidth":3.7,"biyzgomaticWidthToHeadWidth":0.875,"shoulderWidthToWaistWidth":1.72,"torsoHeightToTotalHeight":0.1902,"waistWidthToHipWidth":0.735,"middleHeightToTotalHeight":0.125,"topUpperWidthToMiddleBottomWidth":1,"kneeWidthToHeadHeight":0.97,"upperLegHeightToTotalLowerBodyHeight":0.5,"lowerBodyHeightToTotalHeight":0.4,"ankleWidthToKneeWidth":0.87,"topFootWidthToAnkleWidth":1,"soleWidthToAnkleWidth":1.2618,"footHeightToTotalHeight":0.08618},{"name":"oversizedTopFittedBottom","examples":["oversized-top2.jpg"],"headHeightToTotalHeight":0.125,"headWidthToHeadHeight":0.75,"neckHeightToTotalHeight":0.0625,"neckWidthtoHeadHeight":0.35,"shoulderWidthToBizygomaticWidth":3.7,"biyzgomaticWidthToHeadWidth":0.875,"shoulderWidthToWaistWidth":0.92,"torsoHeightToTotalHeight":0.22,"waistWidthToHipWidth":0.97,"middleHeightToTotalHeight":0.22,"topUpperWidthToMiddleBottomWidth":0.587,"kneeWidthToHeadHeight":0.93,"upperLegHeightToTotalLowerBodyHeight":0.38,"lowerBodyHeightToTotalHeight":0.28332,"ankleWidthToKneeWidth":0.68,"topFootWidthToAnkleWidth":1,"soleWidthToAnkleWidth":1.2618,"footHeightToTotalHeight":0.08618},{"name":"fittedTopCroppedOversizedBottom","examples":["fitted-top.jpg"],"headHeightToTotalHeight":0.125,"headWidthToHeadHeight":0.75,"neckHeightToTotalHeight":0.0625,"neckWidthtoHeadHeight":0.35,"shoulderWidthToBizygomaticWidth":3.236,"biyzgomaticWidthToHeadWidth":0.875,"shoulderWidthToWaistWidth":1.618,"torsoHeightToTotalHeight":0.18,"waistWidthToHipWidth":0.809,"middleHeightToTotalHeight":0.0809,"topUpperWidthToMiddleBottomWidth":0.98382,"kneeWidthToHeadHeight":1.618,"upperLegHeightToTotalLowerBodyHeight":0.618,"lowerBodyHeightToTotalHeight":0.48160000000000003,"ankleWidthToKneeWidth":1.2,"topFootWidthToAnkleWidth":0.618,"soleWidthToAnkleWidth":0.9,"footHeightToTotalHeight":0.0618},{"name":"doubleOversizedCinchedDepth","examples":["double-cinch.jpg"],"headHeightToTotalHeight":0.125,"headWidthToHeadHeight":0.75,"neckHeightToTotalHeight":0.0625,"neckWidthtoHeadHeight":0.35,"shoulderWidthToBizygomaticWidth":4.1618,"biyzgomaticWidthToHeadWidth":0.875,"shoulderWidthToWaistWidth":1.85,"torsoHeightToTotalHeight":0.1902,"waistWidthToHipWidth":0.618,"middleHeightToTotalHeight":0.21618,"topUpperWidthToMiddleBottomWidth":0.618,"kneeWidthToHeadHeight":1.1618,"upperLegHeightToTotalLowerBodyHeight":0.618,"lowerBodyHeightToTotalHeight":0.33729999999999993,"ankleWidthToKneeWidth":1.31618,"topFootWidthToAnkleWidth":0.618,"soleWidthToAnkleWidth":0.618,"footHeightToTotalHeight":0.0618}]');function T(){return(0,o.jsxs)(d.L5,{fluid:!0,className:"mt-5",children:[(0,o.jsx)(d.s4,{tag:"div",className:"display-1 pb-3 mb-4 text-center noto-display-h1",children:"Fashionable Silhouettes"}),(0,o.jsx)(d.L5,{fluid:!0,className:"d-flex justify-content-center",children:(0,o.jsxs)(d.s4,{className:"text-muted",children:[(0,o.jsx)("strong",{children:"Hover"})," over silhouettes to see examples"]})}),(0,o.jsx)(d.uZ,{className:"mt-4 row-eq-height",children:g.map((t,e)=>(0,o.jsx)(r,{sketchData:t},e))})]})}},3276:function(t,e,i){"use strict";function o(t){let e="";for(let i=0;i<t.length;i++)t[i]===t[i].toUpperCase()?e+=" "+t[i]:e+=t[i];return e[0].toUpperCase()+e.slice(1)}i.d(e,{g:function(){return o}})}},function(t){t.O(0,[237,888,774,179],function(){return t(t.s=9433)}),_N_E=t.O()}]);