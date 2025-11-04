import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";

const FilteredPage = () => {
  const location = useLocation();
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const queryParams = new URLSearchParams(location.search);
  const propertyType = queryParams.get("propertyType");

  const [selectedMouja, setSelectedMouja] = useState(queryParams.get("mouja"));
  const [minPrice, setMinPrice] = useState("0");
  const [maxPrice, setMaxPrice] = useState(queryParams.get("price"));
  const [sortOption, setSortOption] = useState("newest");

  const [moujaOptions, setMoujaOptions] = useState([]);


  // Fetch properties
  useEffect(() => {
    const fetchData = async () => {
      if (!propertyType) return;
      setLoading(true);
      try {
        const url = `https://backend.rajproperty.site/api/${propertyType}s`;
        const res = await axios.get(url);
        const data = res.data || [];

        // Set unique mouja options
        const moujas = [
          ...new Set(data.map((item) => item.location?.mouja).filter(Boolean)),
        ];
        setMoujaOptions(moujas);

        setResults(data);
        setFilteredResults(data);
      } catch (err) {
        console.error("Error fetching data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [propertyType]);

  // Apply filters
  useEffect(() => {
    let filtered = [...results];

    if (selectedMouja) {
      filtered = filtered.filter((item) =>
        item.location?.mouja
          ?.toLowerCase()
          .includes(selectedMouja.toLowerCase())
      );
    }
    if (minPrice) {
      filtered = filtered.filter(
        (item) => item.pricing?.value && item.pricing.value >= Number(minPrice)
      );
    }
    if (maxPrice) {
      filtered = filtered.filter(
        (item) => item.pricing?.value && item.pricing.value <= Number(maxPrice)
      );
    }

    setFilteredResults(filtered);
  }, [results, selectedMouja, minPrice, maxPrice]);

  // Apply sorting
  useEffect(() => {
    let sorted = [...filteredResults];
    if (sortOption === "priceLow") {
      sorted.sort((a, b) => (a.pricing?.value || 0) - (b.pricing?.value || 0));
    } else if (sortOption === "priceHigh") {
      sorted.sort((a, b) => (b.pricing?.value || 0) - (a.pricing?.value || 0));
    } else if (sortOption === "newest") {
      sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    setFilteredResults(sorted);
  }, [sortOption]);

  const renderPropertyInfo = (item) => {
    if (item.landDetails) {
      return (
        <p className="text-gray-300">
          Land Size: {item.landDetails.landSizeKatha || "N/A"} Katha
        </p>
      );
    }
    if (item.flatDetails) {
      return (
        <p className="text-gray-300">
          Bed: {item.flatDetails.bed || "N/A"}, Bath:{" "}
          {item.flatDetails.bath || "N/A"}, Balcony:{" "}
          {item.flatDetails.balcony || "N/A"}
        </p>
      );
    }
    if (item.houseDetails) {
      return (
        <p className="text-gray-300">
          Floors: {item.landDetails?.totalFloors || "N/A"}, Units per Floor:{" "}
          {item.houseDetails.unitsPerFlat || "N/A"}
        </p>
      );
    }
    return null;
  };

  return (
    <>
      <Helmet>
        <title>Filtered Property Results | RajProperty</title>
        <meta
          name="description"
          content="Find filtered real estate listings by property type, area (Mouja), and price for lands, flats, and houses in Rajshahi City, Bangladesh. Sort and browse with RajProperty."
        />
        <meta
          name="keywords"
          content="filter, search, listings, properties, lands, flats, houses, RajProperty, Rajshahi, Bangladesh, price, area, Mouja"
        />
        <meta
          property="og:title"
          content="Filtered Results - RajProperty Rajshahi"
        />
        <meta
          property="og:description"
          content="See the filtered and sorted results for your property search on RajProperty by type, location, or budget."
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="px-[5%] py-10 min-h-screen bg-gray-900 text-gray-200">
        <div className="flex flex-col items-center mb-6 text-center">
          <h2 className="text-3xl font-bold mb-2">Search Results</h2>
          <p>
            Showing results for{" "}
            <span className="font-semibold">
              {propertyType || "All Types"} in {selectedMouja || "All Area"}{" "}
              under {maxPrice}{" "}
            </span>
          </p>
        </div>

        {/* Filters + Sorting */}
        <div className="flex flex-wrap gap-4 mb-6 items-end justify-between">
          <div className="flex flex-col lg:flex-row gap-4 justify-between w-full">
            {/* Mouja filter */}
            <div className="w-full flex flex-col">
              <label className="block text-sm font-medium">
                Filter by Mouja
              </label>
              <select
                value={selectedMouja}
                onChange={(e) => setSelectedMouja(e.target.value)}
                className="border rounded px-3 py-2 bg-gray-800 text-gray-200 max-w-[80vw]"
              >
                <option value="">All</option>
                {moujaOptions.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-between gap-4">
              {/* Min Price */}
              <div>
                <label className="block text-sm font-medium">Min Price</label>
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="border rounded px-3 py-2 w-40 bg-gray-800 text-gray-200"
                />
              </div>

              {/* Max Price */}
              <div >
                <label className="block text-sm font-medium">Max Price</label>
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="border rounded px-3 py-2 w-40 bg-gray-800 text-gray-200"
                />
              </div>
            </div>
            {/* Sorting */}
            <div className="w-full text-center lg:text-left">
              <label className="block text-sm font-medium">Sort By</label>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="border rounded px-3 py-2 bg-gray-800 text-gray-200"
              >
                <option value="newest">Newest</option>
                <option value="priceLow">Price: Low → High</option>
                <option value="priceHigh">Price: High → Low</option>
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <p className="text-center text-gray-400 text-xl mt-10">Loading...</p>
        ) : filteredResults.length > 0 ? (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredResults.map((item) => (
              <div
                key={item._id}
                className="bg-gray-800 rounded-lg p-4 flex flex-col items-center gap-3 shadow-lg hover:shadow-xl transition hover:ring-2 hover:ring-blue-400"
              >
                {item.media?.featuredImage?.url ? (
                  <img
                    src={`https://backend.rajproperty.site/uploads${item.media.featuredImage.url}`}
                    alt="Featured"
                    className="h-32 w-full object-cover rounded"
                  />
                ) : (
                  <div className="h-32 w-full bg-gray-700 flex items-center justify-center text-gray-400 rounded">
                    No Image
                  </div>
                )}

                <p className="text-gray-300 font-medium">
                  Mouja: {item.location?.mouja || "N/A"}
                </p>
                <p className="text-gray-300 font-medium">
                  Price: {item.pricing?.value?.toLocaleString() || "N/A"} BDT
                </p>
                {renderPropertyInfo(item)}

                <Link
                  to={`/${propertyType}s/${item._id}`}
                  className="mt-2 btn btn-accent w-full text-center"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-red-500 text-3xl uppercase text-center mt-10">
            No matching results found.
          </p>
        )}
      </div>
    </>
  );
};

export default FilteredPage;
