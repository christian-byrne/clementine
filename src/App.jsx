import React from 'react';
import './App.css';

import Navbar from './components/TopNavbar';
import UserProfilePage from './pages/UserProfile';
import Footer from './components/Footer';

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
