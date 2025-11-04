import { Link, useLoaderData } from "react-router-dom";
import { useState, useMemo } from "react";
import { Helmet } from "react-helmet";

const Flats = () => {
  const flats = useLoaderData();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 40;

  // Filters
  const [selectedMouja, setSelectedMouja] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Unique moujas for dropdown
  const moujaOptions = useMemo(() => {
    const moujas = flats.map((l) => l.location?.mouja).filter(Boolean);
    return [...new Set(moujas)];
  }, [flats]);

  // Apply filtering
  const filteredFlats = useMemo(() => {
    return flats.filter((flat) => {
      const price = Number(flat.pricing?.pricePerKatha) || 0;
      const matchesMouja = selectedMouja
        ? flat.location?.mouja === selectedMouja
        : true;
      const matchesPrice =
        (!minPrice || price >= Number(minPrice)) &&
        (!maxPrice || price <= Number(maxPrice));
      return matchesMouja && matchesPrice;
    });
  }, [flats, selectedMouja, minPrice, maxPrice]);

  // Reset to page 1 when filters change
  const totalPages = Math.ceil(filteredFlats.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredFlats.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="px-[5%] py-10 bg-gray-900 min-h-screen text-gray-200">
      <Helmet>
        <title>Available Flats | RajProperty Rajshahi</title>
        <meta
          name="description"
          content="Browse all flats for sale in Rajshahi City, Bangladesh. Filter by location (Mouja), price, and more to find your perfect home at RajProperty."
        />
        <meta
          name="keywords"
          content="flats for sale, apartments, buy flat, RajProperty, Rajshahi, Bangladesh, Mouja, filter, price, real estate"
        />
        <meta property="og:title" content="Available Flats - RajProperty" />
        <meta
          property="og:description"
          content="Find flats and apartments for sale in Rajshahi City. Filter by area and price for the best listings at RajProperty."
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <h2 className="text-3xl font-bold mb-6 text-center text-green-400">
        Available Flats
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
        {currentItems.map((flat) => {
          const imgUrl = flat.media?.featuredImage?.thumbUrl
            ? flat.media.featuredImage.thumbUrl
            : "https://via.placeholder.com/400x300?text=No+Image";
          return (
            <div
              key={flat._id}
              className="relative group border border-gray-700 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 hover:ring-2 hover:ring-green-400"
            >
              {/* Image */}
              <div className="relative w-full h-48 bg-gray-700">
                <img
                  src={imgUrl}
                  alt="Flat"
                  className="w-full h-full object-cover"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white text-center px-2">
                  <h3 className="text-lg font-semibold">
                    {flat.flatDetails?.bedrooms
                      ? `Beds: ${flat.flatDetails.bedrooms}, `
                      : ""}
                    {flat.flatDetails?.bathrooms
                      ? `Baths: ${flat.flatDetails.bathrooms}, `
                      : ""}
                    {flat.flatDetails?.balconies
                      ? `Balconies: ${flat.flatDetails.balconies}`
                      : ""}
                  </h3>
                </div>
              </div>
              {/* Content */}
              <div className="p-3 flex flex-col items-center">
                <p className="font-medium text-green-300">
                  {flat.flatDetails?.sizeSqft
                    ? `${flat.flatDetails.sizeSqft} sqft`
                    : "N/A"}
                </p>
                <p className="text-sm text-gray-400">
                  {flat.location?.mouja || "Unknown Area"}
                </p>
                <p className="text-sm text-gray-400">
                  Price: {flat.pricing?.value || "After discussion"}
                </p>
                <Link
                  to={`/flats/${flat._id}`}
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

export default Flats;
