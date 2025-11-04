import { Suspense, lazy } from "react";
const HeroSection = lazy(() => import("../components/home/HeroSection"));
const InitialAbout = lazy(() => import("../components/home/InitalAbout"));
const LatestArrival = lazy(() => import("../components/home/LatestArrival"));
const HomePageServices = lazy(
  () => import("../components/home/HomePageServices")
);
const HomeFeaturedProperties = lazy(
  () => import("../components/home/HomeFeaturedProperties")
);
import { Helmet } from "react-helmet";

const HomePage = () => {
  return (
    <div>
      <Helmet>
        <title>RajProperty - Where Trust Meets Property</title>
        <meta
          name="description"
          content="RajProperty helps you buy and sell lands, flats, and houses in Rajshahi City, Bangladesh. Trusted local agency for secure property deals."
        />
        <meta
          name="keywords"
          content="RajProperty, Rajshahi, real estate, buy, sell, lands, flats, houses, Bangladesh, property agency"
        />
        <meta
          property="og:title"
          content="RajProperty - Buy & Sell Property in Rajshahi City"
        />
        <meta
          property="og:description"
          content="Find trusted deals for lands, flats, and houses in Rajshahi. RajProperty is your Rajshahi City real estate expert."
        />
        <meta property="og:image" content="https://rajproperty.site/logo.png" />
        <meta property="og:type" content="website" />
        <meta
          name="twitter:title"
          content="RajProperty - Buy & Sell Property in Rajshahi"
        />
        <meta
          name="twitter:description"
          content="Buy or sell lands, flats, homes in Rajshahi City, Bangladesh. Trusted agency."
        />
        <meta
          name="twitter:image"
          content="https://rajproperty.site/logo.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <Suspense fallback={<div className="text-center py-8">Loading...</div>}>
        <HeroSection />
        <InitialAbout />
        <LatestArrival />
        <HomePageServices />
        <HomeFeaturedProperties />
      </Suspense>
    </div>
  );
};

export default HomePage;


