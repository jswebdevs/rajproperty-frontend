import { Link, useLoaderData } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

// Accept isAdmin as a prop, or fetch from your context/state.
const SingleLand = () => {
  const land = useLoaderData();
  const { user } = useContext(AuthContext);

  const title = `${land.landDetails?.landSizeKatha || "N/A"} Katha Land near ${
    land.location?.mouja || "Unknown Area"
  }`;

  const description =
    land.meta?.tags?.length > 0
      ? land.meta.tags.join(", ")
      : "Land property in Rajshahi available for sale";

  const keywords =
    land.meta?.tags?.length > 0
      ? land.meta.tags.join(", ")
      : "land, plot, Rajshahi, property, sale";

  return (
    <div className="px-[5%] py-8 max-w-4xl mx-auto">
      <Helmet>
        <title>{`Raj Property - ${title}`}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        {land.media?.featuredImage && (
          <meta property="og:image" content={land.media.featuredImage.url} />
        )}
        <meta property="og:type" content="article" />
      </Helmet>

      {/* Title + Edit Button */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          {title}
        </h1>
        {user && (
          <Link
            to={`/dashboard/lands/update/${land._id}`}
            className="btn btn-accent bg-cyan-600 hover:bg-cyan-700 text-white dark:bg-cyan-400 dark:hover:bg-cyan-500 dark:text-gray-800 transition"
          >
            Edit Land
          </Link>
        )}
      </div>

      {/* Featured Image */}
      <div className="w-full bg-gray-200 dark:bg-gray-800 rounded overflow-hidden mb-6 flex items-center justify-center">
        {land.media?.featuredImage ? (
          <img
            src={`${land.media.featuredImage.url}`}
            alt="Land"
            className="w-full"
          />
        ) : (
          <div className="text-gray-500 dark:text-gray-400">
            No Image Available
          </div>
        )}
      </div>

      {/* Details */}
      <div className="space-y-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900 rounded-lg p-6 mb-8 shadow">
        <p>
          <span className="font-semibold">Location:</span>{" "}
          {land.location?.mouja || "N/A"},{" "}
          {land.location?.upazila || "Rajshahi"}
        </p>
        <p>
          <span className="font-semibold">Land Size:</span>{" "}
          {land.landDetails?.landSizeKatha || "N/A"} Katha
          {land.landDetails?.landSizeChatak
            ? `, ${land.landDetails.landSizeChatak} Chatak`
            : ""}
        </p>
        <p>
          <span className="font-semibold">Price per Katha:</span>{" "}
          {land.pricing?.pricePerKatha
            ? `${land.pricing.pricePerKatha} BDT`
            : "Contact for Price"}
        </p>
        <p>
          <span className="font-semibold">Total Value:</span>{" "}
          {land.pricing?.value
            ? `${land.pricing.value} BDT`
            : "Contact for Value"}
        </p>
        {land.roadAccess?.frontRoad && (
          <p>
            <span className="font-semibold">Front Road Width:</span>{" "}
            {land.roadAccess.frontRoad} ft
          </p>
        )}
      </div>

      {/* Media Section */}
      <div className="mt-10 space-y-8">
        {land.media?.photos?.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Photos
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {land.media.photos.map((photo, idx) => (
                <img
                  key={idx}
                  src={photo.url || photo.thumbUrl}
                  alt={`Land Photo ${idx + 1}`}
                  className="w-full h-40 object-cover rounded bg-gray-100 dark:bg-gray-800"
                />
              ))}
            </div>
          </div>
        )}
        {land.media?.videos?.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Videos
            </h2>
            <div className="space-y-4">
              {land.media.videos.map((video, idx) => (
                <video
                  key={idx}
                  controls
                  className="w-full rounded bg-gray-100 dark:bg-gray-800"
                >
                  <source src={`${video.url}`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-wrap gap-4">
        {land.location?.googleMapLink && (
          <a
            href={land.location.googleMapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded dark:bg-blue-400 dark:hover:bg-blue-500 dark:text-gray-900 transition"
          >
            View on Map
          </a>
        )}
        <a
          href="tel:01711-715575"
          className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded dark:bg-green-400 dark:hover:bg-green-500 dark:text-gray-900 transition"
        >
          Contact Us
        </a>
      </div>

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

export default SingleLand;
