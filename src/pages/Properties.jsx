import { Link, useLoaderData } from "react-router-dom";
import { useState, useMemo } from "react";
import { Helmet } from "react-helmet";
import placeholderImage from "../assets/img/place.png";

const Properties = () => {
  const allProperties = useLoaderData(); // combined API: lands + flats + houses
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 40;

  // Filters
  const [selectedType, setSelectedType] = useState("");
  const [selectedMouja, setSelectedMouja] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Determine type dynamically
  const propertiesWithType = useMemo(() => {
    return allProperties.map((p) => {
      let type = "unknown";
      if (p.landDetails && !p.flatDetails && !p.buildingDetails) type = "land";
      else if (p.flatDetails) type = "flat";
      else if (p.landDetails && p.buildingDetails) type = "house";
      return { ...p, type };
    });
  }, [allProperties]);

  // Unique moujas for dropdown
  const moujaOptions = useMemo(() => {
    const moujas = propertiesWithType
      .map((p) => p.location?.mouja)
      .filter(Boolean);
    return [...new Set(moujas)];
  }, [propertiesWithType]);

  // Apply filtering
  const filteredProperties = useMemo(() => {
    return propertiesWithType.filter((prop) => {
      const price =
        Number(prop.pricing?.value || prop.pricing?.pricePerKatha) || 0;
      const matchesType = selectedType ? prop.type === selectedType : true;
      const matchesMouja = selectedMouja
        ? prop.location?.mouja === selectedMouja
        : true;
      const matchesPrice =
        (!minPrice || price >= Number(minPrice)) &&
        (!maxPrice || price <= Number(maxPrice));
      return matchesType && matchesMouja && matchesPrice;
    });
  }, [propertiesWithType, selectedType, selectedMouja, minPrice, maxPrice]);

  // Pagination
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredProperties.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="px-3 sm:px-[5%] py-8 bg-gray-900 min-h-screen">
      <Helmet>
        <title>Available Properties | RajProperty Rajshahi</title>
        <meta
          name="description"
          content="All available properties for sale in Rajshahi City, Bangladesh. Filter and browse lands, flats, houses by area (Mouja), type, and price at RajProperty."
        />
        <meta
          name="keywords"
          content="properties for sale, land, flat, house, RajProperty, Rajshahi, Bangladesh, Mouja, filter, price, real estate"
        />
        <meta
          property="og:title"
          content="Available Properties - RajProperty"
        />
        <meta
          property="og:description"
          content="Find and filter the latest lands, flats, and houses for sale in Rajshahi City. Search by location, type, or price at RajProperty."
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <h2 className="text-3xl font-bold mb-6 text-center text-green-400">
        Available Properties
      </h2>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-8 items-stretch justify-between">
        {/* Type filter */}
        <div className="flex-1 min-w-[160px]">
          <label className="block text-sm font-medium mb-1 text-gray-200">
            Property Type
          </label>
          <select
            value={selectedType}
            onChange={(e) => {
              setSelectedType(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full border rounded px-3 py-2 bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="">All</option>
            <option value="land">Land</option>
            <option value="flat">Flat</option>
            <option value="house">House</option>
          </select>
        </div>
        {/* Mouja filter */}
        <div className="flex-1 min-w-[160px]">
          <label className="block text-sm font-medium mb-1 text-gray-200">
            Mouja / Area
          </label>
          <select
            value={selectedMouja}
            onChange={(e) => {
              setSelectedMouja(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full border rounded px-3 py-2 bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="">All</option>
            {moujaOptions.map((m) => (
              <option key={m} value={m} className="truncate max-w-[12rem]">
                {m}
              </option>
            ))}
          </select>
        </div>
        {/* Min price */}
        <div className="flex-1 min-w-[120px]">
          <label className="block text-sm font-medium mb-1 text-gray-200">
            Min Price
          </label>
          <input
            type="number"
            value={minPrice}
            onChange={(e) => {
              setMinPrice(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full border rounded px-3 py-2 bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>
        {/* Max price */}
        <div className="flex-1 min-w-[120px]">
          <label className="block text-sm font-medium mb-1 text-gray-200">
            Max Price
          </label>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => {
              setMaxPrice(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full border rounded px-3 py-2 bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>
      </div>
      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {currentItems.map((prop) => {
          const imgUrl = prop.media?.featuredImage?.thumbUrl
            ? prop.media.featuredImage.thumbUrl
            : placeholderImage;
          return (
            <div
              key={prop._id}
              className="relative group border rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 bg-gray-800"
            >
              {/* Image */}
              <div className="relative w-full h-48">
                <img
                  src={imgUrl}
                  alt="Property"
                  className="w-full h-full object-cover"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <Link
                    to={`/${prop.type}s/${prop._id}`}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                  >
                    View Now
                  </Link>
                </div>
              </div>
              {/* Content */}
              <div className="p-3 text-center">
                <p className="text-sm text-gray-400 truncate w-full max-w-full">
                  {prop.location?.mouja || "Unknown Area"}
                </p>
                <p className="text-sm text-gray-400">
                  Price: {prop.pricing?.value?.toLocaleString() || "N/A"} BDT
                </p>
                <h3 className="text-md font-semibold mt-1">
                  {prop.type === "land" &&
                    `${prop.landDetails?.landSizeKatha || "N/A"} Katha`}
                  {prop.type === "flat" &&
                    `Beds: ${prop.flatDetails?.bed || "N/A"}, Baths: ${
                      prop.flatDetails?.bath || "N/A"
                    }, Balcony: ${prop.flatDetails?.balcony || "N/A"}`}
                  {prop.type === "house" &&
                    `Land: ${
                      prop.landDetails?.landSizeKatha || "N/A"
                    } Katha, Floors: ${
                      prop.buildingDetails?.totalFloors || "N/A"
                    }, Units/Flat: ${
                      prop.buildingDetails?.unitsPerFlat || "N/A"
                    }`}
                </h3>
              </div>
            </div>
          );
        })}
      </div>
      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="px-3 py-1 border rounded bg-gray-700 text-gray-300 disabled:opacity-50 cursor-pointer"
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 border rounded cursor-pointer ${
              currentPage === page
                ? "bg-green-600 text-white"
                : "hover:bg-green-700 text-gray-300"
            }`}
          >
            {page}
          </button>
        ))}
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="px-3 py-1 border rounded bg-gray-700 text-gray-300 disabled:opacity-50 cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Properties;
