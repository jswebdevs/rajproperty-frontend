import { Link, useLoaderData } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useState } from "react";

// Reusable gallery logic
const useGallery = (featured, photos, videos) => {
  const slides = [
    ...(featured
      ? [{ type: "image", url: featured.url, alt: featured.originalName }]
      : []),
    ...photos.map((img) => ({
      type: "image",
      url: img.url,
      alt: img.originalName,
    })),
    ...videos.map((vid) => ({ type: "video", url: vid.url, alt: vid.title })),
  ];
  return slides;
};

const SingleHouse = () => {
  const house = useLoaderData();
  const [slideIndex, setSlideIndex] = useState(0);

  const featured = house.media?.featuredImage || null;
  const photos = house.media?.photos || [];
  const videos = house.media?.videos || [];
  const slides = useGallery(featured, photos, videos);

  // Meta info for SEO/social
  const title = `House: ${house.landDetails?.landSizeKatha || "N/A"} Katha, ${house.buildingDetails?.totalFloors || "--"} Floors, ${house.location?.area || "Rajshahi"}`;
  const description =
    `House property at ${house.location?.area || "Rajshahi"}, ${house.location?.mouja || ""}, ${house.buildingDetails?.totalFloors || "--"} floors. Construction: ${house.buildingDetails?.constructionStatus || "N/A"}` +
    " | RajProperty Rajshahi";
  const keywords =
    "house, building, buy, real estate, RajProperty, Rajshahi, property, sale, Bangladesh";

  // Slider controls
  const goPrev = () =>
    setSlideIndex((i) => (i === 0 ? slides.length - 1 : i - 1));
  const goNext = () =>
    setSlideIndex((i) => (i === slides.length - 1 ? 0 : i + 1));

  return (
    <div className="px-[5%] py-8 max-w-4xl mx-auto">
      <Helmet>
        <title>{`Raj Property - ${title}`}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        {featured && <meta property="og:image" content={featured.url} />}
        <meta property="og:type" content="article" />
      </Helmet>

      {/* TITLE */}
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        House: {house.landDetails?.landSizeKatha || "N/A"} Katha,{" "}
        {house.buildingDetails?.totalFloors || "--"} Floors in{" "}
        {house.location?.mouja || "Unknown Area"}
      </h1>

      {/* GALLERY SLIDER */}
      <div className="relative w-full h-72 bg-gray-200 dark:bg-gray-800 rounded overflow-hidden mb-6 flex items-center justify-center">
        {slides.length > 0 ? (
          slides[slideIndex].type === "image" ? (
            <img
              src={slides[slideIndex].url}
              alt={slides[slideIndex].alt}
              className="w-full h-full object-cover transition"
            />
          ) : (
            <video
              controls
              src={
                slides[slideIndex].url.startsWith("http")
                  ? slides[slideIndex].url
                  : `https://backend.rajproperty.site/uploads${slides[slideIndex].url}`
              }
              className="w-full h-full object-cover"
            >
              Your browser does not support the video tag.
            </video>
          )
        ) : (
          <div className="text-gray-500 dark:text-gray-400">
            No Image Available
          </div>
        )}
        {slides.length > 1 && (
          <>
            <button
              onClick={goPrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 text-white p-2 rounded-full hover:bg-black/80 transition"
              aria-label="Previous Slide"
            >
              &#8249;
            </button>
            <button
              onClick={goNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 text-white p-2 rounded-full hover:bg-black/80 transition"
              aria-label="Next Slide"
            >
              &#8250;
            </button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {slides.map((_, i) => (
                <span
                  key={i}
                  className={`w-2 h-2 rounded-full inline-block ${i === slideIndex ? "bg-blue-500" : "bg-white/60"}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* PROPERTY CORE DETAILS */}
      <div className="space-y-4 bg-white dark:bg-gray-900 rounded-lg p-6 mb-8 shadow text-gray-900 dark:text-gray-100">
        <p>
          <span className="font-semibold">Area:</span>{" "}
          {house.location?.area || "N/A"}
        </p>
        <p>
          <span className="font-semibold">Location (Mouja):</span>{" "}
          {house.location?.mouja || "N/A"}
        </p>
        <p>
          <span className="font-semibold">Land Size:</span>{" "}
          {house.landDetails?.landSizeKatha || "--"} Katha
        </p>
        <p>
          <span className="font-semibold">Landmarks Nearby:</span>{" "}
          {Array.isArray(house.location?.landMarkNearby) &&
          house.location.landMarkNearby.length
            ? house.location.landMarkNearby.join(", ")
            : "N/A"}
        </p>
        <p>
          <span className="font-semibold">Construction Status:</span>{" "}
          {house.buildingDetails?.constructionStatus || "N/A"}
        </p>
        <p>
          <span className="font-semibold">Total Floors:</span>{" "}
          {house.buildingDetails?.totalFloors || "--"}
        </p>
        {/* Optionally add more building details as available */}
        <p>
          <span className="font-semibold">Year Built:</span>{" "}
          {house.buildingDetails?.yearBuilt || "N/A"}
        </p>
        <p>
          <span className="font-semibold">Parking:</span>{" "}
          {house.buildingDetails?.parking || "N/A"}
        </p>
        <p>
          <span className="font-semibold">Lift:</span>{" "}
          {house.amenities?.lift || "N/A"}
        </p>
        <p>
          <span className="font-semibold">Generator:</span>{" "}
          {house.amenities?.generator || "N/A"}
        </p>
        <p>
          <span className="font-semibold">Road Access:</span>{" "}
          {house.roadAccess?.frontRoad || "N/A"}, Road Type:{" "}
          {house.roadAccess?.roadType || "N/A"}
        </p>
        <p>
          <span className="font-semibold">Price:</span>{" "}
          {house.pricing?.value
            ? `${house.pricing.value} BDT`
            : "Contact for Price"}
        </p>
        <p>
          <span className="font-semibold">Negotiable:</span>{" "}
          {house.pricing?.negotiable || "N/A"}
        </p>
      </div>

      {/* CALL TO ACTIONS */}
      <div className="mt-8 flex flex-wrap gap-4">
        {house.location?.googleMapLink && (
          <a
            href={house.location.googleMapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded dark:bg-blue-400 dark:hover:bg-blue-500 dark:text-gray-900 transition"
          >
            View on Map
          </a>
        )}
        <a
          href={`tel:${house.mobile || "01711-715575"}`}
          className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded dark:bg-green-400 dark:hover:bg-green-500 dark:text-gray-900 transition"
        >
          Contact Owner
        </a>
      </div>

      {/* View Other Properties */}
      <div className="text-center mt-6">
        <Link
          to="/properties"
          className="inline-block px-6 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 dark:bg-gray-200 dark:text-gray-900 dark:hover:bg-gray-300 transition"
        >
          View Other Properties
        </Link>
      </div>
    </div>
  );
};

export default SingleHouse;
