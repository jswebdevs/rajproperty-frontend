import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AdminHouseView = () => {
  const { id } = useParams();
  const [house, setHouse] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://backend.rajproperty.site/api/houses/${id}`)
      .then((res) => res.json())
      .then((data) => setHouse(data));
  }, [id]);

  if (!house) return <p className="text-center py-10">No house data found.</p>;

    const handleDelete = async () => {
      const confirm = await Swal.fire({
        title: "Are you sure?",
        text: "This House record will be permanently deleted!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });
  
      if (confirm.isConfirmed) {
        try {
          const res = await fetch(
            `https://backend.rajproperty.site/api/houses/${id}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json", // "Authorization": `Bearer ${yourToken}`, // Uncomment if needed
              },
            }
          );
          const result = await res.json();
          if (!res.ok)
            throw new Error(result?.message || "Failed to delete house");
            Swal.fire("Deleted!", "The house record has been deleted.", "success");
            navigate("/dashboard/houses");
        } catch (err) {
          console.error("Error deleting house:", err);
          Swal.fire("Error", "Failed to delete house. Please try again.", "error");
        }
      }
    };



  const {
    owner,
    ownerNID,
    mobile,
    location = {},
    legal = {},
    landDetails = {},
    buildingDetails = {},
    amenities = {},
    roadAccess = {},
    pricing = {},
    media = {},
    meta = {},
  } = house;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex justify-between">
        <h2 className="text-3xl font-bold text-center">House Details</h2>
        <div className="flex join">
          <Link
            to={`/houses/${house._id}`}
            className="btn btn-accent join-item"
            target="_blank"
          >
            View
          </Link>
          <Link
            to={`/dashboard/houses/update/${house._id}`}
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
          {(location.landMarkNearby || []).map((lm, idx) => (
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
            <span className="font-semibold">Holding No:</span>{" "}
            {legal.holdingNo || "N/A"}
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
          <p>
            <span className="font-semibold">Electricity:</span>{" "}
            {legal.utilityConnections?.electricity || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Gas:</span>{" "}
            {legal.utilityConnections?.gas || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Water:</span>{" "}
            {legal.utilityConnections?.water || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Sewerage:</span>{" "}
            {legal.utilityConnections?.sewerage || "N/A"}
          </p>
        </div>
      </div>

      {/* Land Details */}
      <div className="border rounded-lg shadow p-4">
        <h3 className="text-xl font-semibold mb-2">Land Details</h3>
        <div className="grid grid-cols-2">
          <p>
            <span className="font-semibold">Reg No:</span>{" "}
            {landDetails.regNo || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Size:</span>{" "}
            {landDetails.landSizeKatha || 0} Katha,{" "}
            {landDetails.landSizeChatak || 0} Chatak
          </p>
          <p>
            <span className="font-semibold">Total Area (Decimal):</span>{" "}
            {landDetails.totalAreaDecimal || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Length (ft):</span>{" "}
            {landDetails.length || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Width (ft):</span>{" "}
            {landDetails.width || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Shape:</span>{" "}
            {landDetails.landShape || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Facing:</span>{" "}
            {landDetails.facingDirection || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Open Space:</span>{" "}
            {landDetails.openSpace || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Details:</span>{" "}
            {landDetails.details || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Quantity:</span>{" "}
            {landDetails.quantity || "N/A"}
          </p>
        </div>
      </div>

      {/* Building Details */}
      <div className="border rounded-lg shadow p-4">
        <h3 className="text-xl font-semibold mb-2">Building Details</h3>
        <div className="grid grid-cols-2">
          <p>
            <span className="font-semibold">Building Name:</span>{" "}
            {buildingDetails.buildingName || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Floors:</span>{" "}
            {buildingDetails.totalFloors || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Units/Floor:</span>{" "}
            {buildingDetails.unitPerFloor || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Year Built:</span>{" "}
            {buildingDetails.yearBuilt || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Construction Status:</span>{" "}
            {buildingDetails.constructionStatus || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Size (sqft):</span>{" "}
            {buildingDetails.sizeSqft || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Bedrooms:</span>{" "}
            {buildingDetails.bedrooms || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Bathrooms:</span>{" "}
            {buildingDetails.bathrooms || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Balconies:</span>{" "}
            {buildingDetails.balconies || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Drawing Room:</span>{" "}
            {buildingDetails.drawingRoom || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Dining Room:</span>{" "}
            {buildingDetails.diningRoom || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Kitchen:</span>{" "}
            {buildingDetails.kitchen || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Flooring:</span>{" "}
            {buildingDetails.flooring || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Facing:</span>{" "}
            {buildingDetails.facingDirection || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Furnishing:</span>{" "}
            {buildingDetails.furnishing || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Parking:</span>{" "}
            {buildingDetails.parking || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Security System:</span>{" "}
            {buildingDetails.securitySystem || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Details:</span>{" "}
            {buildingDetails.details || "N/A"}
          </p>
        </div>
      </div>

      {/* Amenities */}
      <div className="border rounded-lg shadow p-4">
        <h3 className="text-xl font-semibold mb-2">Amenities</h3>
        <div className="grid grid-cols-2">
          <p>
            <span className="font-semibold">Lift:</span>{" "}
            {amenities.lift || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Generator:</span>{" "}
            {amenities.generator || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Community Hall:</span>{" "}
            {amenities.communityHall || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Roof Access:</span>{" "}
            {amenities.roofAccess || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Gym:</span> {amenities.gym || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Swimming Pool:</span>{" "}
            {amenities.swimmingPool || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Garden:</span>{" "}
            {amenities.garden || "N/A"}
          </p>
        </div>
      </div>

      {/* Road Access */}
      <div className="border rounded-lg shadow p-4">
        <h3 className="text-xl font-semibold mb-2">Road Access</h3>
        <div className="grid grid-cols-2">
          <p>
            <span className="font-semibold">Front Road:</span>{" "}
            {roadAccess.frontRoad || "N/A"} ft
          </p>
          <p>
            <span className="font-semibold">Side Road:</span>{" "}
            {roadAccess.sideRoad || "N/A"} ft
          </p>
          <p>
            <span className="font-semibold">Distance from Road:</span>{" "}
            {roadAccess.distanceFromRoad || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Road Type:</span>{" "}
            {roadAccess.roadType || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Road Frontage:</span>{" "}
            {roadAccess.roadFrontage || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Drain:</span>{" "}
            {roadAccess.isDrain == null
              ? "N/A"
              : roadAccess.isDrain
                ? "Yes"
                : "No"}
          </p>
          <p>
            <span className="font-semibold">Drain Width:</span>{" "}
            {roadAccess.drainWidth || "N/A"}
          </p>
        </div>
      </div>

      {/* Pricing Info */}
      <div className="border rounded-lg shadow p-4">
        <h3 className="text-xl font-semibold mb-2">Pricing</h3>
        <div className="grid grid-cols-2">
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
              src={`https://backend.rajproperty.site${media.featuredImage.thumbUrl}`}
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
                <source
                  src={`https://backend.rajproperty.site/uploads${vid.url}`}
                  type={vid.mimeType}
                />
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
          <span className="font-semibold">Entry By:</span>{" "}
          {meta.entryBy || "N/A"}
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

export default AdminHouseView;
