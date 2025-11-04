import { Link, useLoaderData } from "react-router-dom";
import { useState, useMemo } from "react";
import { Helmet } from "react-helmet";

const Houses = () => {
  const houses = useLoaderData();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 40;

  // Filters
  const [selectedMouja, setSelectedMouja] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Unique moujas for dropdown
  const moujaOptions = useMemo(() => {
    const moujas = houses.map((l) => l.location?.mouja).filter(Boolean);
    return [...new Set(moujas)];
  }, [houses]);

  // Apply filtering
  const filteredHouses = useMemo(() => {
    return houses.filter((house) => {
      const price = Number(house.pricing?.pricePerKatha) || 0;
      const matchesMouja = selectedMouja
        ? house.location?.mouja === selectedMouja
        : true;
      const matchesPrice =
        (!minPrice || price >= Number(minPrice)) &&
        (!maxPrice || price <= Number(maxPrice));
      return matchesMouja && matchesPrice;
    });
  }, [houses, selectedMouja, minPrice, maxPrice]);

  const totalPages = Math.ceil(filteredHouses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredHouses.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="px-[5%] py-10 bg-gray-900 min-h-screen text-gray-200">
      <Helmet>
        <title>Available Houses | RajProperty Rajshahi</title>
        <meta
          name="description"
          content="View and filter houses for sale in Rajshahi City. Discover lands, house sizes, and pricing—all properties at RajProperty, Rajshahi's trusted agency."
        />
        <meta
          name="keywords"
          content="houses for sale, buy house, RajProperty, Rajshahi, Bangladesh, Mouja, filter, price, real estate, home listings"
        />
        <meta property="og:title" content="Available Houses - RajProperty" />
        <meta
          property="og:description"
          content="Find houses for sale in Rajshahi City. Filter by area and price and get detailed property info at RajProperty."
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <h2 className="text-3xl font-bold mb-6 text-center text-green-400">
        Available Houses
      </h2>
      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-8 items-end justify-between">
        <div className="flex gap-4 flex-wrap">
          {/* Mouja filter */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Filter by Mouja
            </label>
            <select
              value={selectedMouja}
              onChange={(e) => {
                setSelectedMouja(e.target.value);
                setCurrentPage(1);
              }}
              className="border border-gray-700 rounded px-3 py-2 bg-gray-800 text-gray-200 hover:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              <option value="">All</option>
              {moujaOptions.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
          {/* Min Price */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Min Price (per Katha)
            </label>
            <input
              type="number"
              value={minPrice}
              onChange={(e) => {
                setMinPrice(e.target.value);
                setCurrentPage(1);
              }}
              className="border border-gray-700 rounded px-3 py-2 w-40 bg-gray-800 text-gray-200 hover:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          {/* Max Price */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Max Price (per Katha)
            </label>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => {
                setMaxPrice(e.target.value);
                setCurrentPage(1);
              }}
              className="border border-gray-700 rounded px-3 py-2 w-40 bg-gray-800 text-gray-200 hover:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
        </div>
      </div>
      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {currentItems.map((house) => {
          const imgUrl = house.media?.featuredImage?.thumbUrl
            ? house.media.featuredImage.thumbUrl
            : "https://via.placeholder.com/400x300?text=No+Image";
          return (
            <div
              key={house._id}
              className="relative group border border-gray-700 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 hover:ring-2 hover:ring-green-400"
            >
              {/* Image */}
              <div className="relative w-full h-48 bg-gray-700">
                <img
                  src={imgUrl}
                  alt="House"
                  className="w-full h-full object-cover"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white text-center px-2">
                  <h3 className="text-lg font-semibold">
                    {house.landDetails?.landSizeKatha
                      ? `Land: ${house.landDetails.landSizeKatha} Katha, `
                      : ""}
                    {house.buildingDetails?.totalFloors
                      ? `Floors: ${house.buildingDetails.totalFloors}, `
                      : ""}
                    {house.buildingDetails?.unitPerFloor
                      ? `Units/Floor: ${house.buildingDetails.unitPerFloor}`
                      : ""}
                  </h3>
                </div>
              </div>
              {/* Content */}
              <div className="p-3 flex flex-col items-center">
                <p className="font-medium text-green-300">
                  {house.landDetails?.landSizeKatha
                    ? `${house.landDetails.landSizeKatha} Katha`
                    : "N/A"}
                </p>
                <p className="text-sm text-gray-400">
                  {house.location?.mouja || "Unknown Area"}
                </p>
                <p className="text-sm text-gray-400">
                  Price: {house.pricing?.value || "After discussion"}
                </p>
                <Link
                  to={`/houses/${house._id}`}
                  className="mt-3 px-4 py-2 w-full text-center bg-green-600 text-white rounded hover:bg-green-700 transition"
                >
                  View Now
                </Link>
              </div>
            </div>
          );
        })}
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-3 py-1 border rounded bg-gray-800 text-gray-200 disabled:opacity-50 hover:bg-green-700 transition"
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
                  : "bg-gray-800 text-gray-200 hover:bg-green-700"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-3 py-1 border rounded bg-gray-800 text-gray-200 disabled:opacity-50 hover:bg-green-700 transition"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Houses;
