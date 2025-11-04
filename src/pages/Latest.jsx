import React, { useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import { Helmet } from "react-helmet";

// Card UI for a property (shared)
function PropertyCard({ item }) {
  const isLand = item?.landDetails;
  const isFlat = item?.flatDetails;
  const isHouse = item?.houseDetails;
  const bgImage = item?.media?.featuredImage?.url
    ? `${item.media.featuredImage?.url}`
    : "https://via.placeholder.com/400x300?text=No+Image";

  return (
    <div className="bg-gray-800 dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:ring-2 hover:ring-blue-400 transition p-2 flex flex-col justify-between">
      <div
        className="h-40 w-full bg-cover bg-center rounded-xl mb-2"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="flex-1 flex flex-col justify-between items-center px-1 pb-2">
        <p className="text-base font-semibold text-white dark:text-gray-100 mb-1">
          {item.location?.mouja || "N/A"}
        </p>
        {isLand && (
          <p className="text-sm text-gray-300 dark:text-gray-400">
            {item.landDetails?.landSizeKatha || "N/A"} Katha &ndash;
            {item.pricing?.value
              ? ` ${item.pricing.value.toLocaleString()} BDT`
              : ""}
          </p>
        )}
        {isFlat && (
          <p className="text-sm text-gray-300 dark:text-gray-400">
            Beds: {item.flatDetails?.bed || "N/A"}, Baths:{" "}
            {item.flatDetails?.bath || "N/A"}, Balcony:{" "}
            {item.flatDetails?.balcony || "N/A"}
          </p>
        )}
        {isHouse && (
          <p className="text-sm text-gray-300 dark:text-gray-400">
            Total Land: {item.landDetails?.landSizeKatha || "N/A"} Katha,
            Floors: {item.landDetails?.totalFloors || "N/A"}, Units:{" "}
            {item.houseDetails?.unitsPerFlat || "N/A"}
          </p>
        )}
        <Link
          to={`/${
            item?.meta?.tags?.includes("Land")
              ? "lands"
              : item?.meta?.tags?.includes("Flat")
                ? "flats"
                : "houses"
          }/${item._id}`}
          className="mt-2 inline-block bg-blue-700/90 rounded px-4 py-1 text-white font-semibold transition hover:bg-blue-600/90"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

// Simple pagination UI (shared)
function Pagination({ page, totalPages, onChange }) {
  return (
    <div className="flex gap-3 justify-center items-center py-6">
      <button
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        className="px-3 py-1 rounded bg-gray-700 dark:bg-gray-800 text-gray-300 dark:text-gray-400 hover:bg-gray-500 dark:hover:bg-gray-700 disabled:opacity-50"
      >
        Prev
      </button>
      <span className="text-gray-400 dark:text-gray-500">
        Page {page} of {totalPages}
      </span>
      <button
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        className="px-3 py-1 rounded bg-gray-700 dark:bg-gray-800 text-gray-300 dark:text-gray-400 hover:bg-gray-500 dark:hover:bg-gray-700 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}

const PAGE_SIZE = 20;

const Latest = () => {
  const properties = useLoaderData(); // Use loader for "/api/recent"
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(properties.length / PAGE_SIZE));
  const currentProperties = properties.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  return (
    <div>
      <Helmet>
        <meta
          name="description"
          content="Browse the latest properties listed for sale in Rajshahi City. Find recently added lands, flats, and houses with full details and prices."
        />
        <meta
          name="keywords"
          content="latest properties, lands, flats, houses, RajProperty, Rajshahi, Bangladesh, new listings, real estate"
        />
        <meta
          property="og:title"
          content="Latest Properties - RajProperty Rajshahi"
        />
        <meta
          property="og:description"
          content="Explore the latest properties listed by RajProperty in Rajshahi City, Bangladesh. View new listings with price, photos, and locations."
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="px-[5%] py-10 bg-gray-900 dark:bg-black text-white dark:text-gray-100 w-full overflow-hidden">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold">Latest Properties</h2>
          <p className="text-gray-400 dark:text-gray-500 mt-2">
            See the most recently added properties in our catalog
          </p>
        </div>
        {properties.length === 0 ? (
          <p className="text-center text-gray-400 dark:text-gray-500">
            No new properties at the moment.
          </p>
        ) : (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {currentProperties.map((item) => (
                <PropertyCard key={item._id} item={item} />
              ))}
            </div>
            <Pagination
              page={page}
              totalPages={totalPages}
              onChange={(newPage) => setPage(newPage)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Latest;
