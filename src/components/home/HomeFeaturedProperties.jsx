import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Helmet } from "react-helmet";

// Responsive hook: detects if user is below a given width (default 640)
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

// Custom Arrow components (same as Latest Arrival)
const NextArrow = ({ onClick }) => (
  <div
    className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20 cursor-pointer text-white text-3xl hover:text-green-400 transition"
    onClick={onClick}
  >
    ❯
  </div>
);
const PrevArrow = ({ onClick }) => (
  <div
    className="absolute left-2 top-1/2 transform -translate-y-1/2 z-20 cursor-pointer text-white text-3xl hover:text-green-400 transition"
    onClick={onClick}
  >
    ❮
  </div>
);

// Unified card style (matches Latest Arrival)
function SlideItem({ item }) {
  const isLand = item?.landDetails;
  const isFlat = item?.flatDetails;
  const isHouse = item?.houseDetails;
  const bgImage = item?.media?.featuredImage?.url
    ? `${item.media.featuredImage.url}`
    : "https://via.placeholder.com/400x300?text=No+Image";
  return (
    <div className="px-3 sm:px-4 relative z-10 flex justify-center">
      <div className="relative group h-72 w-[90%] transition-all duration-300 hover:ring-2 hover:ring-green-400 hover:shadow-[0_0_25px_rgba(34,197,94,0.5)] ring-1 ring-transparent rounded-2xl flex items-stretch z-10 m-1">
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
                item?.meta?.tags?.includes("Land")
                  ? "lands"
                  : item?.meta?.tags?.includes("Flat")
                  ? "flats"
                  : "houses"
              }/${item._id}`}
              className="bg-green-700/90 shadow-lg backdrop-blur rounded-xl px-5 py-2 text-white text-lg font-semibold transition hover:bg-green-600/90 hover:ring-1 hover:ring-green-200"
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

// Desktop slider (3/2 slides, arrows)
function DesktopSlider({ properties }) {
  const slidesToShow =
    properties.length < 3 && properties.length > 0 ? properties.length : 3;
  const settings = {
    infinite: properties.length > 1,
    speed: 500,
    slidesToShow,
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
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
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

// Mobile slider (1 slide, arrows, dots)
function MobileSlider({ properties }) {
  const settings = {
    infinite: properties.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  return (
    <Slider {...settings} className="!overflow-visible">
      {properties.map((item) => (
        <SlideItem key={item._id} item={item} />
      ))}
    </Slider>
  );
}

// Main Component
const HomeFeaturedProperties = () => {
  const [properties, setProperties] = useState([]);
  const isMobile = useIsMobile(640);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await axios.get(
          "https://backend.rajproperty.site/api/featured"
        );
        setProperties(res.data);
      } catch (err) {
        console.error("Error fetching featured properties:", err);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="Browse recently added featured properties for sale in Rajshahi City, Bangladesh. Discover lands, flats, and houses selected for you by RajProperty."
        />
        <meta
          name="keywords"
          content="featured properties, RajProperty, lands, flats, houses, Rajshahi, Bangladesh, real estate, new listings"
        />
        <meta
          property="og:title"
          content="Featured Properties - RajProperty Rajshahi"
        />
        <meta
          property="og:description"
          content="Explore the newest and most attractive properties featured by RajProperty in Rajshahi City, Bangladesh. View details, prices, and locations."
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="px-[5%] py-10 bg-gray-900 text-white w-full overflow-hidden">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold">Featured Properties</h2>
          <p className="text-gray-400 mt-2">
            Check out the newest properties added recently
          </p>
        </div>
        <div className="relative px-6">
          {properties.length === 0 ? (
            <p className="text-center text-gray-400">
              No featured properties yet.
            </p>
          ) : isMobile ? (
            <MobileSlider properties={properties} />
          ) : (
            <DesktopSlider properties={properties} />
          )}
        </div>
        <div className="flex justify-center mt-4">
          <Link to="/featured" className="btn btn-accent">
            View All
          </Link>
        </div>
      </div>
    </>
  );
};

export default HomeFeaturedProperties;
