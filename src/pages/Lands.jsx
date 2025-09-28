import { Link, useLoaderData } from "react-router-dom";
import { useState, useMemo } from "react";

const Lands = () => {
  const lands = useLoaderData();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 40;

  // Filters
  const [selectedMouja, setSelectedMouja] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Unique moujas for dropdown
  const moujaOptions = useMemo(() => {
    const moujas = lands.map((l) => l.location?.mouja).filter(Boolean);
    return [...new Set(moujas)];
  }, [lands]);

  // Apply filtering
  const filteredLands = useMemo(() => {
    return lands.filter((land) => {
      const price = Number(land.pricing?.pricePerKatha) || 0;

      const matchesMouja = selectedMouja
        ? land.location?.mouja === selectedMouja
        : true;

      const matchesPrice =
        (!minPrice || price >= Number(minPrice)) &&
        (!maxPrice || price <= Number(maxPrice));

      return matchesMouja && matchesPrice;
    });
  }, [lands, selectedMouja, minPrice, maxPrice]);

  // Reset to page 1 when filters change
  const totalPages = Math.ceil(filteredLands.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredLands.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="px-[5%] py-6">
      <h2 className="text-2xl font-bold mb-4">Available Lands</h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6 items-end">
        {/* Mouja filter */}
        <div>
          <label className="block text-sm font-medium">Filter by Mouja</label>
          <select
            value={selectedMouja}
            onChange={(e) => {
              setSelectedMouja(e.target.value);
              setCurrentPage(1);
            }}
            className="border rounded px-3 py-2 bg-base-200"
          >
            <option value="">All</option>
            {moujaOptions.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        {/* Price range filter */}
        <div>
          <label className="block text-sm font-medium">
            Min Price (per Katha)
          </label>
          <input
            type="number"
            value={minPrice}
            onChange={(e) => {
              setMinPrice(e.target.value);
              setCurrentPage(1);
            }}
            className="border rounded px-3 py-2 w-40"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">
            Max Price (per Katha)
          </label>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => {
              setMaxPrice(e.target.value);
              setCurrentPage(1);
            }}
            className="border rounded px-3 py-2 w-40"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {currentItems.map((land) => (
          <div
            key={land._id}
            className="relative group border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
          >
            {/* Image */}
            <div className="relative w-full h-48 bg-gray-200">
              {land.media?.featuredImage ? (
                <img
                  src={land.media.featuredImage.thumbUrl}
                  alt="Land"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white text-center px-2">
                <h3 className="text-lg font-semibold">
                  {land.landDetails?.landSizeKatha} Katha near{" "}
                  {land.location?.mouja || "Unknown Area"}
                </h3>
              </div>
            </div>

            {/* Content */}
            <div className="p-3 flex flex-col items-center">
              <p className="font-medium">
                {land.landDetails?.landSizeKatha} Katha
              </p>
              <p className="text-sm text-gray-500">
                {land.location?.mouja || "Unknown Area"}
              </p>
              <Link
                to={`/lands/${land._id}`}
                className="mt-3 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                View Now
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="px-3 py-1 border rounded bg-accent disabled:opacity-50 cursor-pointer"
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
                : "hover:bg-green-700"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="px-3 py-1 border rounded bg-accent disabled:opacity-50 cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Lands;
