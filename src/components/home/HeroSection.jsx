import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { Helmet } from "react-helmet";
import heroBG from "../../assets/vid/heroBg.mp4";

const HeroSection = () => {
  const [propertyType, setPropertyType] = useState("");
  const [mouja, setMouja] = useState("");
  const [price, setPrice] = useState("");
  const [moujas, setMoujas] = useState([]);
  const [filteredMoujas, setFilteredMoujas] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const moujaRef = useRef(null);

  useEffect(() => {
    fetch("/areas.json")
      .then((res) => res.json())
      .then((data) => {
        const allMoujas = data.flatMap((item) => item.mouja || []);
        setMoujas(allMoujas);
      });
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (moujaRef.current && !moujaRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMoujaChange = (e) => {
    const value = e.target.value;
    setMouja(value);

    if (!value.trim()) {
      setFilteredMoujas([]);
      setShowDropdown(false);
      return;
    }

    const filtered = moujas.filter((m) =>
      m.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredMoujas(filtered);
    setShowDropdown(true);
  };

  const handleApplyFilter = () => {
    const newErrors = {};
    if (!propertyType) newErrors.propertyType = "Please select a property type";
    if (!mouja) newErrors.mouja = "Please enter a mouja";
    // price is NOT mandatory anymore
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const queryParams = new URLSearchParams({
      propertyType,
      mouja,
      price,
    });
    navigate(`/search?${queryParams.toString()}`);
  };

  return (
    <>
      <Helmet>

        <meta
          name="description"
          content="Start your property search, filter results, and discover trusted lands, flats, and houses in Rajshahi City, Bangladesh with RajProperty."
        />
        <meta
          name="keywords"
          content="RajProperty, buy, sell, search, lands, flats, houses, Rajshahi, Bangladesh, filter, property type, area, price"
        />
        <meta
          property="og:title"
          content="RajProperty - Property Search in Rajshahi City"
        />
        <meta
          property="og:description"
          content="Search and filter properties by type, location, and price at RajProperty. Trusted agency in Rajshahi City, Bangladesh."
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="relative min-h-screen h-screen w-full overflow-hidden flex flex-col">
        {/* Full-bleed video background */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute w-full h-full top-0 left-0  pointer-events-none object-cover"
          >
            <source src={heroBG} type="video/mp4" />
            {/* Optional static fallback for slow/mobile */}
          </video>
        </div>

        <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>

        {/* Main content box - add px-4 here ONLY if you want inner content padded */}
        <div className="pt-5 md:pt-10 relative z-10 flex flex-col items-center justify-center h-full text-white text-center">
          <h1 className="text-3xl md:text-6xl font-bold drop-shadow-lg">
            Where Trust Meets
          </h1>
          <h1 className="text-3xl md:text-6xl font-bold drop-shadow-lg">
            Property
          </h1>
          <p className="mt-4 text-lg md:text-xl drop-shadow">
            Seamless solutions for buying and selling properties.
          </p>

          <p className="mt-1 lg:mt-4 text-yellow-400 text-2xl">★★★★★</p>
          <p className="uppercase mt-1 text-sm md:text-base">
            Trusted by countless satisfied clients
          </p>

          {/* Filter Box */}
          <div className="mt-6 w-full max-w-4xl flex-grow flex-shrink overflow-y-auto">
            <div className="backdrop-blur-md rounded-3xl p-4 md:p-8 shadow-2xl bg-white/10 border border-white/20 max-h-[70vh] mx-auto flex flex-col justify-center">
              <h2 className="text-xl md:text-2xl font-bold mb-2 md:mb-6 text-center drop-shadow capitalize">
                Find What You Need
              </h2>
              <div className="flex flex-col md:flex-row gap-4">
                {/* Property Type */}
                <div className="flex-1">
                  <label className="block text-gray-200  mb-1">
                    Property Type*
                  </label>
                  <select
                    className="w-full p-1 md:p-3 rounded-lg
        bg-base-200 dark:bg-base-200
        text-gray-800 dark:text-white
        placeholder-gray-600 dark:placeholder-gray-300
        border border-gray-400 focus:ring-2 focus:ring-green-600 focus:outline-none"
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    aria-label="Select property type"
                  >
                    <option value="">Select type</option>
                    <option value="land">Land</option>
                    <option value="flat">Flat</option>
                    <option value="house">House</option>
                  </select>
                  {errors.propertyType && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.propertyType}
                    </p>
                  )}
                </div>
                {/* Mouja */}
                <div className="flex-1 relative" ref={moujaRef}>
                  <label className="block text-gray-200 mb-1">
                    Area*
                  </label>
                  <input
                    type="text"
                    value={mouja}
                    onChange={handleMoujaChange}
                    placeholder="Type mouja..."
                    className="w-full p-1 md:p-3 rounded-lg
        bg-base-200 dark:bg-base-200
        text-gray-800 dark:text-white
        placeholder-gray-600 dark:placeholder-gray-300
        border border-gray-400 focus:ring-2 focus:ring-green-600 focus:outline-none"
                    aria-label="Enter mouja or area"
                  />
                  {showDropdown && (
                    <ul
                      className="absolute z-20 w-full max-h-40 overflow-y-auto
        bg-black/60 dark:bg-black/60 backdrop-blur-md rounded shadow-lg mt-1"
                    >
                      {filteredMoujas.length > 0 ? (
                        filteredMoujas.map((m, idx) => (
                          <li
                            key={idx}
                            className="px-3 py-2 cursor-pointer hover:bg-green-600/40 transition"
                            onClick={() => {
                              setMouja(m);
                              setShowDropdown(false);
                            }}
                          >
                            {m}
                          </li>
                        ))
                      ) : (
                        <li className="px-3 py-2 text-gray-600 dark:text-gray-300">
                          No results
                        </li>
                      )}
                    </ul>
                  )}
                  {errors.mouja && (
                    <p className="text-red-500 text-sm mt-1">{errors.mouja}</p>
                  )}
                </div>
                {/* Price (optional) */}
                <div className="flex-1">
                  <label className="block text-gray-200 mb-1">
                    Max Price
                  </label>
                  <input
                    type="number"
                    placeholder="Enter max price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full p-1 md:p-3 rounded-lg
        bg-base-200 dark:bg-base-200
        text-gray-800 dark:text-white
        placeholder-gray-600 dark:placeholder-gray-300
        border border-gray-400 focus:ring-2 focus:ring-green-600 focus:outline-none"
                    aria-label="Enter maximum price"
                  />
                </div>
              </div>

              <button
                onClick={handleApplyFilter}
                className="mt-4 md:mt-6 w-full bg-gradient-to-r from-green-600 to-green-700 py-3 rounded-xl text-white font-semibold hover:from-green-500 hover:to-green-600 transition cursor-pointer"
              >
                Apply Filter
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
