import { Link, useLoaderData } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useState } from "react";

// Gallery slider logic
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

const SingleFlat = () => {
  const flat = useLoaderData();
  const [slideIndex, setSlideIndex] = useState(0);

  const featured = flat.media?.featuredImage || null;
  const photos = flat.media?.photos || [];
  const videos = flat.media?.videos || [];
  const slides = useGallery(featured, photos, videos);

  const title = `Flat: ${flat.flatDetails?.bedrooms}B/${flat.flatDetails?.bathrooms}B in ${flat.location?.mouja || "Rajshahi"}`;
  const description =
    `Flat for sale in ${flat.location?.mouja || "Rajshahi"}, ${flat.flatDetails?.bedrooms} bed, ${flat.flatDetails?.bathrooms} bath` +
    `${flat.flatDetails?.sizeSqft ? `, ${flat.flatDetails.sizeSqft} sqft` : ""}.` +
    " Contact for price. | RajProperty Rajshahi";
  const keywords =
    "flat, apartment, buy, RajProperty, Rajshahi, property, sale, Bangladesh";

  // Slide controls
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

      {/* Title */}
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        Flat: {flat.flatDetails?.bedrooms} Bed / {flat.flatDetails?.bathrooms}{" "}
        Bath in {flat.location?.mouja || "Unknown Area"}
      </h1>

      {/* Gallery Slider */}
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

      {/* Details Section */}
      <div className="space-y-4 bg-white dark:bg-gray-900 rounded-lg p-6 mb-8 shadow text-gray-900 dark:text-gray-100">
        <p>
          <span className="font-semibold">Area:</span>{" "}
          {flat.location?.area || "N/A"}, {flat.location?.mouja || "N/A"},{" "}
          {flat.location?.upazilla || "N/A"}
        </p>
        <p>
          <span className="font-semibold">Location (Mouja):</span>{" "}
        </p>

        <p>
          <span className="font-semibold">Flat Size:</span>{" "}
          {flat.flatDetails?.sizeSqft} sq.ft
        </p>
        <p>
          <span className="font-semibold">Facing Direction:</span>{" "}
          {flat.flatDetails?.facingDirection || "N/A"}
        </p>
        <p>
          <span className="font-semibold">Bedrooms:</span>{" "}
          {flat.flatDetails?.bedrooms}
        </p>
        <p>
          <span className="font-semibold">Bathrooms:</span>{" "}
          {flat.flatDetails?.bathrooms}
        </p>
        <p>
          <span className="font-semibold">Balconies:</span>{" "}
          {flat.flatDetails?.balconies}
        </p>
        <p>
          <span className="font-semibold">Kitchen:</span>{" "}
          {flat.flatDetails?.kitchen}
        </p>
        <p>
          <span className="font-semibold">Dining Room:</span>{" "}
          {flat.flatDetails?.diningRoom}
        </p>
        <p>
          <span className="font-semibold">Drawing Room:</span>{" "}
          {flat.flatDetails?.drawingRoom}
        </p>
        <p>
          <span className="font-semibold">Furnishing:</span>{" "}
          {flat.flatDetails?.furnishing}
        </p>
        <p>
          <span className="font-semibold">Floor No:</span>{" "}
          {flat.buildingDetails?.floorNo}
        </p>
        <p>
          <span className="font-semibold">Total Floors:</span>{" "}
          {flat.buildingDetails?.totalFloors}
        </p>
        <p>
          <span className="font-semibold">Parking:</span>{" "}
          {flat.buildingDetails?.parking}
        </p>
        <p>
          <span className="font-semibold">Lift:</span> {flat.amenities?.lift}
        </p>
        <p>
          <span className="font-semibold">Generator:</span>{" "}
          {flat.amenities?.generator}
        </p>

        <p>
          <span className="font-semibold">Price:</span>{" "}
          {flat.pricing?.value
            ? `${flat.pricing.value} BDT`
            : "Contact for Price"}
        </p>
        <p>
          <span className="font-semibold">Price per sqft:</span>{" "}
          {flat.pricing?.pricePerSqft || "N/A"}
        </p>
        <p>
          <span className="font-semibold">Negotiable:</span>{" "}
          {flat.pricing?.negotiable || "N/A"}
        </p>
        <p>
          <span className="font-semibold">Additional Details:</span>{" "}
          {flat.flatDetails?.details}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-wrap gap-4">
        {flat.location?.googleMapLink && (
          <a
            href={flat.location.googleMapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded dark:bg-blue-400 dark:hover:bg-blue-500 dark:text-gray-900 transition"
          >
            View on Map
          </a>
        )}
        <a
          href={`tel:${flat.mobile || "01711-715575"}`}
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

export default SingleFlat;
