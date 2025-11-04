import React from "react";
import Header from "../components/global/Header";
import { Outlet } from "react-router";
import Footer from "../components/global/Footer";
import CallNowButton from "../components/global/CallNowButton";
import ChatButton from "../components/global/ChatButton";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Helmet } from "react-helmet";
import ScrollToTop from "./ScrollToTop";



const Root = () => {
  // Example: check if user is logged in (adjust based on your auth logic)
  const { user } = useContext(AuthContext);

  return (
    <div>
      <Helmet>
        <title>RajProperty - Where Trusts Meet Property</title>
        <meta
          name="description"
          content="Buy and sell lands, flats, and houses with RajProperty. Trusted agency for Rajshahi City, Bangladesh – Lands, Flats, Houses."
        />
        <meta
          name="keywords"
          content="RajProperty, Rajshahi, real estate, property agency, buy, sell, lands, flats, houses, Bangladesh"
        />
        <meta
          property="og:title"
          content="RajProperty - Where Trusts Meet Property"
        />
        <meta
          property="og:description"
          content="RajProperty is Rajshahi's trusted agency for buying and selling property. Secure deals on lands, flats, houses."
        />
        <meta property="og:image" content="https://rajproperty.site/logo.png" />
        <meta property="og:type" content="website" />
        <meta
          name="twitter:title"
          content="RajProperty - Where Trusts Meet Property"
        />
        <meta
          name="twitter:description"
          content="RajProperty: buy, sell, and manage property in Rajshahi City, Bangladesh. Trusted, secure deals."
        />
        <meta
          name="twitter:image"
          content="https://rajproperty.site/logo.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <ScrollToTop></ScrollToTop>
      <Header />
      <Outlet />
      {!user && <CallNowButton />}
      {!user && <ChatButton />}
      <Footer />
    </div>
  );
};

export default Root;
