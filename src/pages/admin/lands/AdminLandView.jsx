import { useEffect, useState } from "react";
import { useParams } from "react-router";

const AdminLandView = () => {
  const { id } = useParams(); // ✅ get the id from URL
  const [land, setLand] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/lands/${id}`)
      .then((res) => res.json())
      .then((data) => setLand(data));
  }, [id]);

  if (!land) return <p className="text-center py-10">No land data found.</p>;

  const {
    owner,
    ownerNID,
    mobile,
    location,
    legal,
    landDetails,
    roadAccess,
    pricing,
    media,
    meta,
  } = land;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h2 className="text-3xl font-bold text-center">Land Details</h2>

      {/* Owner Info */}
      <div className="border rounded-lg shadow p-4">
        <h3 className="text-xl font-semibold mb-2 text-center">
          Owner Information
        </h3>
        <p>
          <span className="font-semibold">Owner:</span> {owner}
        </p>
        <p>
          <span className="font-semibold">Mobile:</span> {mobile}
        </p>
        <p>
          <span className="font-semibol">NID:</span> {ownerNID}{" "}
        </p>
      </div>

      {/* Location Info */}
      <div className="border rounded-lg shadow p-4 ">
        <h3 className="text-xl font-semibold mb-2 text-center">Location</h3>
        <p>
          <span className="font-semibold">Upazila:</span> {location.upazila}
        </p>
        <p>
          <span className="font-semibold">Mouja:</span> {location.mouja}
        </p>
        <p>
          <span className="font-semibold">Area:</span> {location.area}
        </p>
        <p>
          <span className="font-semibold">GPS:</span> {location.gpsCoordinates}
        </p>
        <p>
          <span className="font-semibold">Google Map:</span>{" "}
          <a
            href={location.googleMapLink}
            target="_blank"
            rel="noreferrer"
            className="btn btn-accent"
          >
            View Map
          </a>
        </p>
        <p className="mt-2 font-semibold">Nearby Landmarks:</p>
        <div className="flex flex-wrap gap-2 mt-1">
          {location.landMarkNearby.map((lm, idx) => (
            <span key={idx} className="px-2 py-1 bg-accent text-sm rounded-md">
              {lm}
            </span>
          ))}
        </div>
      </div>

      {/* Legal Info */}
      <div className="border rounded-lg shadow p-4 ">
        <h3 className="text-xl font-semibold mb-2 text-center">
          Legal Information
        </h3>
        <div className="grid grid-cols-3 gap-2">
          <p>
            <span className="font-semibold">CS Mark:</span> {legal.csMark}
          </p>
          <p>
            <span className="font-semibold">CS Khatian:</span> {legal.csKhatian}
          </p>
          <p>
            <span className="font-semibold">BS Mark:</span> {legal.bsMark}
          </p>
          <p>
            <span className="font-semibold">BS Khatian:</span> {legal.bsKhatian}
          </p>
          <p>
            <span className="font-semibold">RS Mark:</span> {legal.rsMark}
          </p>
          <p>
            <span className="font-semibold">RS Khatian:</span> {legal.rsKhatian}
          </p>
          <p>
            <span className="font-semibold">Mutation:</span>{" "}
            {legal.mutationStatus}
          </p>
          <p>
            <span className="font-semibold">Tax:</span> {legal.taxStatus}
          </p>
          <p>
            <span className="font-semibold">Dispute:</span>{" "}
            {legal.disputeStatus}
          </p>
        </div>
      </div>

      {/* Land Details */}
      <div className="border rounded-lg shadow p-4 ">
        <h3 className="text-xl font-semibold mb-2">Land Details</h3>
        <div className="grid grid-cols-2">
          <p>
            <span className="font-semibold">Reg No:</span> {landDetails.regNo}
          </p>
          <p>
            <span className="font-semibold">Size:</span>{" "}
            {landDetails.landSizeKatha} Katha, {landDetails.landSizeChatak || 0} Chatak
          </p>
          <p>
            <span className="font-semibold">Total Area (Decimal):</span>{" "}
            {landDetails.quantity}
          </p>
          <p>
            <span className="font-semibold">Shape:</span>{" "}
            {landDetails.landShape}
          </p>
          <p>
            <span className="font-semibold">Facing:</span>{" "}
            {landDetails.facingDirection}
          </p>
          <p>
            <span className="font-semibold">Class:</span>{" "}
            {landDetails.landClass}
          </p>
          <p>
            <span className="font-semibold">Need to Fill:</span>{" "}
            {landDetails.needToFill}
          </p>
          <p>
            <span className="font-semibold">Details:</span>{" "}
            {landDetails.details}
          </p>
        </div>
      </div>

      {/* Road Access */}
      <div className="border rounded-lg shadow p-4 ">
        <h3 className="text-xl font-semibold mb-2">Road Access</h3>
        <div className="grid grid-cols-2">
          <p>
            <span className="font-semibold">Front Road:</span>{" "}
            {roadAccess.frontRoad} ft
          </p>
          <p>
            <span className="font-semibold">Side Road:</span>{" "}
            {roadAccess.sideRoad} ft
          </p>
          <p>
            <span className="font-semibold">Road Type:</span>{" "}
            {roadAccess.roadType}
          </p>
          <p>
            <span className="font-semibold">Drain:</span> {roadAccess.isDrain}
          </p>
        </div>
      </div>

      {/* Pricing Info */}
      <div className="border rounded-lg shadow p-4 ">
        <h3 className="text-xl font-semibold mb-2">Pricing</h3>
        <div className="grid grid-cols-3">
          <p>
            <span className="font-semibold">Price per Katha:</span> ৳{" "}
            {pricing.pricePerKatha}
          </p>
          <p>
            <span className="font-semibold">Total Value:</span> ৳{" "}
            {pricing.value}
          </p>
          <p>
            <span className="font-semibold">Negotiable:</span>{" "}
            {pricing.negotiable}
          </p>
        </div>
      </div>

      {/* Media */}
      <div className="border rounded-lg shadow p-4 ">
        <h3 className="text-xl font-semibold mb-2">Media</h3>

        {/* Featured Image */}
        {media.featuredImage && (
          <div className="mb-4">
            <h4 className="font-semibold">Featured Image</h4>
            <img
              src={media.featuredImage.thumbUrl}
              alt={media.featuredImage.altText || "Featured"}
              className="h-32 rounded shadow"
            />
          </div>
        )}

        {/* Photos */}
        {media.photos?.length > 0 && (
          <div className="mb-4">
            <h4 className="font-semibold">Photos</h4>
            <div className="flex gap-2 mt-2">
              {media.photos.map((photo) => (
                <img
                  key={photo._id}
                  src={photo.thumbUrl}
                  alt={photo.altText || photo.originalName}
                  className="rounded shadow h-24"
                />
              ))}
            </div>
          </div>
        )}

        {/* Videos */}
        {media.videos?.length > 0 && (
          <div className="mb-4">
            <h4 className="font-semibold">Videos</h4>
            {media.videos.map((vid) => (
              <video
                key={vid._id}
                controls
                muted
                className="w-full max-w-lg rounded shadow"
              >
                <source src={`/uploads/${vid.url}`} type={vid.mimeType} />
                Your browser does not support the video tag.
              </video>
            ))}
          </div>
        )}

        {/* Documents */}
        {media.documents?.length > 0 && (
          <div>
            <h4 className="font-semibold">Documents</h4>
            <ol className="list-decimal list-inside">
              {media.documents.map((doc) => (
                <li key={doc._id}>
                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noreferrer"
                    className="uppercase ms-4"
                  >
                    {doc.originalName}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>

      {/* Meta Info */}
      <div className="border rounded-lg shadow p-4 ">
        <h3 className="text-xl font-semibold mb-2">Meta Information</h3>
        <p>
          <span className="font-semibold">Status:</span> {meta.status}
        </p>
        <p>
          <span className="font-semibold">Remarks:</span> {meta.remarks}
        </p>
        <p>
          <span className="font-semibold">Entry Date:</span>{" "}
          {new Date(meta.entryDate).toLocaleString()}
        </p>
        <p>
          <span className="font-semibold">Last Updated:</span>{" "}
          {new Date(meta.lastUpdatedAt).toLocaleString()} by{" "}
          {meta.lastUpdatedBy}
        </p>
        <div className="flex flex-wrap gap-2 mt-2">
          {meta.tags.map((tag, idx) => (
            <span key={idx} className="px-2 py-1 bg-accent text-sm rounded-md">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminLandView;
