import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import Routes from "./routers/Routes";
import Authprovider from "./context/AuthProvider";
import { Helmet } from "react-helmet";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Helmet>

      <meta
        name="description"
        content="Buy and sell lands, flats, and houses in Rajshahi City, Bangladesh. RajProperty is your trusted property agency for secure deals."
      />
      <meta
        name="keywords"
        content="Rajshahi, real estate, property, buy, sell, agency, lands, flats, houses, Bangladesh"
      />
      <meta
        property="og:title"
        content="RajProperty - Where Trusts Meet Property"
      />
      <meta
        property="og:description"
        content="Buy and sell property in Rajshahi City, Bangladesh with RajProperty, your trusted local agency. Discover and transact securely."
      />
      <meta property="og:image" content="https://rajproperty.site/logo.png" />
      <meta property="og:type" content="website" />
      <meta
        name="twitter:title"
        content="RajProperty - Where Trusts Meet Property"
      />
      <meta
        name="twitter:description"
        content="RajProperty - Buy, sell, and manage properties. Only in Rajshahi City."
      />
      <meta name="twitter:image" content="https://rajproperty.site/logo.png" />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
    <Authprovider>
      <RouterProvider router={Routes} fallbackElement={<div>Loading...</div>} />
    </Authprovider>
  </StrictMode>
);
