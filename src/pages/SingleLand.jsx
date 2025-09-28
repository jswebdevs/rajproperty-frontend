import { useLoaderData } from "react-router-dom";
import { Helmet } from "react-helmet";

const SingleLand = () => {
  const land = useLoaderData();

  return (
    <div className="px-[5%] py-8 max-w-4xl mx-auto">
      <Helmet>
        <title>
          {`Raj Property - ${land.landDetails?.landSizeKatha} Katha Land near ${
            land.location?.mouja || "Unknown Area"
          }`}
        </title>

        <meta
          name="description"
          content={
            land.meta?.tags?.length
              ? land.meta.tags.join(", ")
              : "Land property in Rajshahi available for sale"
          }
        />
        <meta
          name="keywords"
          content={
            land.meta?.tags?.length
              ? land.meta.tags.join(", ")
              : "land, plot, Rajshahi, property, sale"
          }
        />
        <meta
          property="og:title"
          content={`${land.landDetails?.landSizeKatha} Katha Land near ${
            land.location?.mouja || "Unknown Area"
          }`}
        />
        <meta
          property="og:description"
          content={
            land.meta?.tags?.length
              ? land.meta.tags.join(", ")
              : "Land property in Rajshahi available for sale"
          }
        />
        {land.media?.featuredImage && (
          <meta property="og:image" content={land.media.featuredImage.url} />
        )}
        <meta property="og:type" content="article" />
      </Helmet>

      {/* Title */}
      <h1 className="text-3xl font-bold mb-6">
        {land.landDetails?.landSizeKatha} Katha Land near{" "}
        {land.location?.mouja || "Unknown Area"}
      </h1>
      {/* Featured Image */}
      <div className="w-full h-64 bg-gray-200 rounded overflow-hidden mb-6">
        {land.media?.featuredImage ? (
          <img
            src={land.media.featuredImage.thumbUrl}
            alt="Land"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            No Image Available
          </div>
        )}
      </div>
      {/* Details */}
      <div className="space-y-4">
        <p>
          <span className="font-semibold">Location:</span>{" "}
          {land.location?.mouja || "N/A"},{" "}
          {land.location?.upazila || "Rajshahi"}
        </p>
        <p>
          <span className="font-semibold">Land Size:</span>{" "}
          {land.landDetails?.landSizeKatha} Katha
          {land.landDetails?.landSizeChatak
            ? `, ${land.landDetails?.landSizeChatak} Chatak`
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
        <p>
          <span className="font-semibold">Status:</span>{" "}
          {land.meta?.status || "N/A"}
        </p>
        {land.meta?.tags?.length > 0 && (
          <p>
            <span className="font-semibold">Tags:</span>{" "}
            {land.meta.tags.join(", ")}
          </p>
        )}
      </div>
      {/* Media Section */}
      <div className="mt-10 space-y-8">
        {/* Photos */}
        {land.media?.photos?.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Photos</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {land.media.photos.map((photo, idx) => (
                <img
                  key={idx}
                  src={photo.thumbUrl || photo.url}
                  alt={`Land Photo ${idx + 1}`}
                  className="w-full h-40 object-cover rounded"
                />
              ))}
            </div>
          </div>
        )}

        {/* Videos */}
        {land.media?.videos?.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Videos</h2>
            <div className="space-y-4">
              {land.media.videos.map((video, idx) => (
                <video key={idx} controls className="w-full rounded">
                  <source src={video.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Action Buttons */}
      <div className="mt-8 flex gap-4">
        {land.location?.googleMapLink && (
          <a
            href={land.location.googleMapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            View on Map
          </a>
        )}
        <a
          href="tel:01711-715575"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Contact Us
        </a>
      </div>
    </div>
  );
};

export default SingleLand;
