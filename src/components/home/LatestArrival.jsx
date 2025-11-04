import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Helmet } from "react-helmet";

// Custom hook to detect if window width is below breakpoint (default 640px)
function useIsMobile(breakpoint = 640) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false
  );
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);
  return isMobile;
}

// Custom Arrow Components for Desktop
const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <button
      type="button"
      aria-label="Next"
      className={`flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 z-20 text-accent! text-2xl  rounded-full h-8 w-8 bg-white border-none  transition`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      ❯
    </button>
  );
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <button
      type="button"
      aria-label="Previous"
      className={`flex items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 z-20 text-accent! text-2xl  rounded-full h-8 w-8 bg-white border-none  transition`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      ❮
    </button>
  );
};

// Slide Item Component (used by both sliders)
function SlideItem({ item }) {
  const isLand = item?.landDetails;
  const isFlat = item?.flatDetails;
  const isHouse = item?.houseDetails;
  const bgImage = item?.media?.featuredImage?.url
    ? `${item.media.featuredImage.url}`
    : "https://via.placeholder.com/400x300?text=No+Image";
  return (
    <div className="px-3 sm:px-4 relative z-10 flex justify-center">
      <div className="relative group h-72 w-[90%] transition-all duration-300 hover:ring-2 hover:ring-blue-400 hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] ring-1 ring-transparent rounded-2xl flex items-stretch z-10 m-1">
        <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gray-800">
          <div
            className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110"
            style={{
              backgroundImage: `url(${bgImage})`,
              backgroundSize: "cover",
              backgroundPosition: "top center",
            }}
          ></div>
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 rounded-2xl">
            <Link
              to={`/${
                item.propertyType === "land"
                  ? "lands"
                  : item?.propertyType === "flat"
                  ? "flats"
                  : "houses"
              }/${item._id}`}
              className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-lg text-white text-lg font-semibold hover:bg-white/30 transition hover:ring-1 hover:ring-blue-200"
            >
              View Details
            </Link>
          </div>
          <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4 rounded-b-2xl">
            <p className="text-sm mt-1 text-center">
              {item.location?.mouja || "N/A"}{" "}
              {isLand && item.landDetails?.landSizeKatha
                ? `- ${item.landDetails.landSizeKatha} Katha`
                : ""}
              {isLand && item.pricing?.value
                ? ` - ${item.pricing.value.toLocaleString()} BDT`
                : ""}
            </p>
            {isFlat && (
              <p className="text-sm mt-1 text-center">
                Beds: {item.flatDetails?.bed || "N/A"}, Baths:{" "}
                {item.flatDetails?.bath || "N/A"}, Balcony:{" "}
                {item.flatDetails?.balcony || "N/A"}
              </p>
            )}
            {isHouse && (
              <p className="text-sm mt-1 text-center">
                Total Land: {item.landDetails?.landSizeKatha || "N/A"} Katha,
                Floors: {item.landDetails?.totalFloors || "N/A"}, Units:{" "}
                {item.houseDetails?.unitsPerFlat || "N/A"}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Desktop Slider: shows 3 or 2 slides; arrows visible
function DesktopSlider({ properties }) {
  const settings = {
    infinite: properties.length > 1,
    speed: 500,
    slidesToShow:
      properties.length < 3 && properties.length > 0 ? properties.length : 3,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow:
            properties.length < 2 && properties.length > 0
              ? properties.length
              : 2,
        },
      },
    ],
  };
  return (
    <Slider {...settings} className="!overflow-visible">
      {properties.map((item) => (
        <SlideItem key={item._id} item={item} />
      ))}
    </Slider>
  );
}

// Mobile Slider: always shows 1 slide; dots only
function MobileSlider({ properties }) {
  const settings = {
    infinite: properties.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
  };
  return (
    <Slider {...settings} className="overflow-visible!">
      {properties.map((item) => (
        <SlideItem key={item._id} item={item} />
      ))}
    </Slider>
  );
}

// Main Component
const LatestArrival = () => {
  const [properties, setProperties] = useState([]);
  const isMobile = useIsMobile(640);

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const res = await axios.get(
          "https://backend.rajproperty.site/api/recent"
        );
        setProperties(res.data);
      } catch (err) {
        console.error("Error fetching recent properties:", err);
      }
    };
    fetchRecent();
  }, []);

  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="Discover the newest lands, flats, and houses listed for sale in Rajshahi City, Bangladesh by RajProperty. Browse fresh property arrivals and find your next home."
        />
        <meta
          name="keywords"
          content="latest arrivals, new properties, RajProperty, Rajshahi, Bangladesh, real estate, new listings, buy, sell"
        />
        <meta
          property="og:title"
          content="Latest Property Arrivals - RajProperty"
        />
        <meta
          property="og:description"
          content="View the most recent land, flat, and house listings on RajProperty in Rajshahi City. Start your property search today!"
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <div
        className=" px-2 py-10 bg-gradient-to-br from-gray-900 via-blue-900 to-emerald-900 text-white w-full overflow-hidden"
      >
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold">Latest Arrivals</h2>
          <p className="text-gray-400 mt-2">
            Check out the newest properties added recently
          </p>
        </div>
        <div className="relative px-5">
          {properties.length === 0 ? (
            <p className="text-center text-gray-400">
              No recent properties yet.
            </p>
          ) : isMobile ? (
            <MobileSlider properties={properties} />
          ) : (
            <DesktopSlider properties={properties} />
          )}
        </div>
        <div className="flex justify-center mt-4">
          <Link to="/latest" className="btn btn-accent">
            View All
          </Link>
        </div>
      </div>
    </>
  );
};

export default LatestArrival;
