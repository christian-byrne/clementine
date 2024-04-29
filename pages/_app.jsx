import React from "react";
import Navbar from "@/components/navbars/top/TopNavbar";
import Footer from "@/components/footer/Footer";
import "@/styles/global.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App({ Component, pageProps, router }) {
  // Define an array of route paths where you don't want to render the Navbar
  const routesWithoutNavbar = [
    "/social-media-gamification",
    "/blog/dev/digital-advocacy-gamification",
  ]; // Add your specific page path here

  // Check if the current route is in the routesWithoutNavbar array
  const shouldRenderNavbar = !routesWithoutNavbar.includes(router.pathname);

  return (
    <>
      {shouldRenderNavbar && <Navbar />}
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default App;
