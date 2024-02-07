import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './TopNavbar';
import UserProfilePage from './page-user-profile/UserProfilePage';
import Footer from './Footer';

function App() {
  return (
    <div>
      <Navbar />
      <UserProfilePage />
      <Footer />
    </div>
  );
}

export default App;
