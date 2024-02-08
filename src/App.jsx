import React from "react";
import "./App.css";
import Navbar from "./components/TopNavbar";
import Footer from "./components/Footer";
import UserProfilePage from "./pages/UserProfile";
import LeaderBoardPage from "./pages/LeaderBoards";
// For full deployment on own site, use BrowserRouter
// For GitHub Pages deployment, use HashRouter (and change pathnames so that they work with HashRouter's #/pathnames):
import { HashRouter, BrowserRouter, Routes, Route } from "react-router-dom";
import { USING_GITHUB_PAGES } from "./constants/routerConfig";
var Router;
USING_GITHUB_PAGES ? (Router = HashRouter) : (Router = BrowserRouter);

function App() {
  return (
    <Router
    // Enable basename when using BrowserRouter
    // basename={
    //   USING_GITHUB_PAGES ? process.env.PUBLIC_URL : process.env.PUBLIC_URL
    // }
    >
      <div>
        <Navbar />
        
        {/* Route components */}
        <Routes>
          <Route path="" element={<LeaderBoardPage />} />
          <Route path="/user/:name" element={<UserProfilePage />} />
          <Route path="/leaderboards" element={<LeaderBoardPage />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
