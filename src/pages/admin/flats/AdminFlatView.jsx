import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import Swal from "sweetalert2";


const AdminFlatView = () => {
  const { id } = useParams();
  const [flat, setFlat] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://backend.rajproperty.site/api/flats/${id}`)
      .then((res) => res.json())
      .then((data) => setFlat(data));
  }, [id]);

  if (!flat) return <p className="text-center py-10">No flat data found.</p>;

    const handleDelete = async () => {
      const confirm = await Swal.fire({
        title: "Are you sure?",
        text: "This flat record will be permanently deleted!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });
  
      if (confirm.isConfirmed) {
        try {
          const res = await fetch(
            `https://backend.rajproperty.site/api/flats/${id}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json", // "Authorization": `Bearer ${yourToken}`, // Uncomment if needed
              },
            }
          );
          const result = await res.json();
          if (!res.ok)
            throw new Error(result?.message || "Failed to delete flat");
            Swal.fire("Deleted!", "The flat record has been deleted.", "success");
            navigate("/dashboard/flats");
        } catch (err) {
          console.error("Error deleting flat:", err);
          Swal.fire("Error", "Failed to delete flat. Please try again.", "error");
        }
      }
    };
  

  const {
    owner,
    ownerNID,
    mobile,
    location = {},
    legal = {},
    flatDetails = {},
    roadAccess = {},
    pricing = {},
    media = {},
    meta = {},
  } = flat;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex justify-between">
        <h2 className="text-3xl font-bold text-center">Flat Details</h2>
        <div className="flex join">
          <Link
            to={`/flats/${flat._id}`}
            className="btn btn-accent join-item"
            target="_blank"
          >
            View
          </Link>
          <Link
            to={`/dashboard/flats/update/${flat._id}`}
            className="btn btn-primary join-item"
          >
            Edit
          </Link>
          <button className="btn btn-error join-item" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>

      {/* Owner Info */}
      <div className="border rounded-lg shadow p-4">
        <h3 className="text-xl font-semibold mb-2 text-center">
          Owner Information
        </h3>
        <p>
          <span className="font-semibold">Owner:</span> {owner || "N/A"}
        </p>
        <p>
          <span className="font-semibold">Mobile:</span> {mobile || "N/A"}
        </p>
        <p>
          <span className="font-semibold">NID:</span> {ownerNID || "N/A"}
        </p>
      </div>

      {/* Location Info */}
      <div className="border rounded-lg shadow p-4">
        <h3 className="text-xl font-semibold mb-2 text-center">Location</h3>
        <p>
          <span className="font-semibold">Upazila:</span>{" "}
          {location.upazila || "N/A"}
        </p>
        <p>
          <span className="font-semibold">Mouja:</span>{" "}
          {location.mouja || "N/A"}
        </p>
        <p>
          <span className="font-semibold">Area:</span> {location.area || "N/A"}
        </p>
        <p>
          <span className="font-semibold">GPS:</span>{" "}
          {location.gpsCoordinates || "N/A"}
        </p>
        {location.googleMapLink && (
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
        )}
        <div className="flex flex-wrap gap-2 mt-1">
          {(location.flatMarkNearby || []).map((lm, idx) => (
            <span key={idx} className="px-2 py-1 bg-accent text-sm rounded-md">
              {lm}
            </span>
          ))}
        </div>
      </div>

      {/* Legal Info */}
      <div className="border rounded-lg shadow p-4">
        <h3 className="text-xl font-semibold mb-2 text-center">
          Legal Information
        </h3>
        <div className="grid grid-cols-3 gap-2">
          <p>
            <span className="font-semibold">CS Mark:</span>{" "}
            {legal.csMark || "N/A"}
          </p>
          <p>
            <span className="font-semibold">CS Khatian:</span>{" "}
            {legal.csKhatian || "N/A"}
          </p>
          <p>
            <span className="font-semibold">BS Mark:</span>{" "}
            {legal.bsMark || "N/A"}
          </p>
          <p>
            <span className="font-semibold">BS Khatian:</span>{" "}
            {legal.bsKhatian || "N/A"}
          </p>
          <p>
            <span className="font-semibold">RS Mark:</span>{" "}
            {legal.rsMark || "N/A"}
          </p>
          <p>
            <span className="font-semibold">RS Khatian:</span>{" "}
            {legal.rsKhatian || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Mutation:</span>{" "}
            {legal.mutationStatus || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Tax:</span>{" "}
            {legal.taxStatus || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Dispute:</span>{" "}
            {legal.disputeStatus || "N/A"}
          </p>
        </div>
      </div>

      {/* Flat Details */}
      <div className="border rounded-lg shadow p-4">
        <h3 className="text-xl font-semibold mb-2">Flat Details</h3>
        <div className="grid grid-cols-2">
          <p>
            <span className="font-semibold">Reg No:</span>{" "}
            {flatDetails.regNo || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Size:</span>{" "}
            {flatDetails.flatSizeKatha || 0} Katha,{" "}
            {flatDetails.flatSizeChatak || 0} Chatak
          </p>
          <p>
            <span className="font-semibold">Total Area (Decimal):</span>{" "}
            {flatDetails.quantity || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Shape:</span>{" "}
            {flatDetails.flatShape || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Facing:</span>{" "}
            {flatDetails.facingDirection || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Class:</span>{" "}
            {flatDetails.flatClass || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Need to Fill:</span>{" "}
            {flatDetails.needToFill || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Details:</span>{" "}
            {flatDetails.details || "N/A"}
          </p>
        </div>
      </div>

      {/* Road Access */}
      <div className="border rounded-lg shadow p-4">
        <h3 className="text-xl font-semibold mb-2">Road Access</h3>
        <div className="grid grid-cols-2">
          <p>
            <span className="font-semibold">Front Road:</span>{" "}
            {roadAccess.frontRoad || 0} ft
          </p>
          <p>
            <span className="font-semibold">Side Road:</span>{" "}
            {roadAccess.sideRoad || 0} ft
          </p>
          <p>
            <span className="font-semibold">Road Type:</span>{" "}
            {roadAccess.roadType || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Drain:</span>{" "}
            {roadAccess.isDrain ? "Yes" : "No"}
          </p>
        </div>
      </div>

      {/* Pricing Info */}
      <div className="border rounded-lg shadow p-4">
        <h3 className="text-xl font-semibold mb-2">Pricing</h3>
        <div className="grid grid-cols-3">
          <p>
            <span className="font-semibold">Price per Katha:</span> ৳{" "}
            {pricing.pricePerKatha || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Total Value:</span> ৳{" "}
            {pricing.value || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Negotiable:</span>{" "}
            {pricing.negotiable || "N/A"}
          </p>
        </div>
      </div>

      {/* Media */}
      <div className="border rounded-lg shadow p-4">
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
        {(media.photos || []).length > 0 && (
          <div className="mb-4">
            <h4 className="font-semibold">Photos</h4>
            <div className="flex gap-2 mt-2">
              {(media.photos || []).map((photo) => (
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
        {(media.videos || []).length > 0 && (
          <div className="mb-4">
            <h4 className="font-semibold">Videos</h4>
            {(media.videos || []).map((vid) => (
              <video
                key={vid._id}
                controls
                muted
                className="w-full max-w-lg rounded shadow"
              >
                <source src={vid.url} type={vid.mimeType} />
                Your browser does not support the video tag.
              </video>
            ))}
          </div>
        )}

        {/* Documents */}
        {(media.documents || []).length > 0 && (
          <div>
            <h4 className="font-semibold">Documents</h4>
            <ol className="list-decimal list-inside">
              {(media.documents || []).map((doc) => (
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
      <div className="border rounded-lg shadow p-4">
        <h3 className="text-xl font-semibold mb-2">Meta Information</h3>
        <p>
          <span className="font-semibold">Status:</span> {meta.status || "N/A"}
        </p>
        <p>
          <span className="font-semibold">Remarks:</span>{" "}
          {meta.remarks || "N/A"}
        </p>
        <p>
          <span className="font-semibold">Entry Date:</span>{" "}
          {meta.entryDate ? new Date(meta.entryDate).toLocaleString() : "N/A"}
        </p>
        <p>
          <span className="font-semibold">Last Updated:</span>{" "}
          {meta.lastUpdatedAt
            ? new Date(meta.lastUpdatedAt).toLocaleString()
            : "N/A"}{" "}
          by {meta.lastUpdatedBy || "N/A"}
        </p>
        <div className="flex flex-wrap gap-2 mt-2">
          {(meta.tags || []).map((tag, idx) => (
            <span key={idx} className="px-2 py-1 bg-accent text-sm rounded-md">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminFlatView;
