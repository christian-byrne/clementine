import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/TopNavbar";
import Footer from "./components/Footer";
import UserProfilePage from "./pages/UserProfile";
import LeaderBoardPage from "./pages/LeaderBoards";

const root = document.getElementById("root");

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
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
