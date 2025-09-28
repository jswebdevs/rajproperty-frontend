import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, useLoaderData, Link } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import Swal from "sweetalert2";
import axios from "axios";

// Reuse small components
import OwnerInfo from "./OwnerInfo";
import LocationInfo from "./LocationInfo";
import LegalInfo from "./LegalInfo";
import LandDetails from "./LandDetails";
import RoadAccess from "./RoadAccess";
import PricingInfo from "./PricingInfo";
import LandMediaUpload from "./LandMediaUpload";
import MetaInfo from "./MetaInfo";

const UpdateLand = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const loaderData = useLoaderData();

  const defaultFormData = {
    owner: "",
    ownerNID: "",
    mobile: "",
    location: {
      upazila: "",
      mouja: "",
      area: "",
      gpsCoordinates: "",
      googleMapLink: "",
      landMarkNearby: [],
    },
    legal: {
      csMark: "",
      csKhatian: "",
      bsMark: "",
      bsKhatian: "",
      rsMark: "",
      rsKhatian: "",
      mutationStatus: "",
      taxStatus: "",
      disputeStatus: "",
    },
    landDetails: {
      regNo: "",
      landSizeKatha: "",
      landSizeChatak: "",
      length: "",
      width: "",
      landShape: "",
      facingDirection: "",
      landClass: "",
      needToFill: "",
      details: "",
      quantity: null,
    },
    roadAccess: {
      frontRoad: "",
      sideRoad: "",
      distanceFromRoad: "",
      roadType: "",
      roadFrontage: "",
      isDrain: "",
      drainWidth: "",
    },
    pricing: {
      pricePerKatha: "",
      value: "",
      negotiable: "",
    },
    media: {
      featuredImage: null,
      photos: [],
      videos: [],
      documents: [],
    },
    meta: {
      status: "Published",
      entryBy: user?.displayName || "",
      entryDate: new Date().toISOString(),
      lastUpdatedBy: user?.displayName || "",
      lastUpdatedAt: new Date().toISOString(),
      remarks: "",
      tags: [],
    },
  };

  const [formData, setFormData] = useState(defaultFormData);


  // ✅ Fetch land by id on mount
  useEffect(() => {
    if (loaderData) {
      setFormData(loaderData);
    }
  }, [loaderData]);


  // ✅ Generic handler for nested objects
  const handleChange = (field, value) => {
    setFormData((prev) => {
      if (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value)
      ) {
        return {
          ...prev,
          [field]: { ...(prev[field] || {}), ...value },
        };
      } else {
        return { ...prev, [field]: value };
      }
    });
  };

  // ✅ Submit updated land

  const handleSubmit = async (e) => {
    e.preventDefault();
  

    const updatedMeta = {
      ...formData.meta,
      lastUpdatedBy: user?.displayName || "Unknown",
      lastUpdatedAt: new Date().toISOString(),
    };



    const { _id, ...safeData } = formData; // remove _id to avoid Mongo errors
    const finalData = { ...safeData, meta: updatedMeta };


    try {
      const { data } = await axios.put(
        `https://rajproperty-backend-1.onrender.com/api/lands/${id}/`,
        finalData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("Land updated:", data);

      Swal.fire({
        icon: "success",
        title: "Updated",
        text: "Land information updated successfully!",
        confirmButtonColor: "#2563eb",
      });

      navigate(`/dashboard/lands/${id}`);
    } catch (err) {
      console.error("Error updating land:", err.response || err);

      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text:
          err.response?.data?.error || "There was an error updating the land.",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  if (!formData) return <p className="text-center">Loading land data...</p>;

  return (
    <div className="py-6">
      <form
        className="max-w-5xl mx-auto p-6 bg-base-200 shadow rounded-lg space-y-6"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold text-center">Update Land</h2>
          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors cursor-pointer"
          >
            Update
          </button>
        </div>

        <OwnerInfo formData={formData} handleChange={handleChange} />
        <LocationInfo formData={formData} handleChange={handleChange} />
        <LegalInfo formData={formData} handleChange={handleChange} />
        <LandDetails formData={formData} handleChange={handleChange} />
        <RoadAccess formData={formData} handleChange={handleChange} />
        <PricingInfo formData={formData} handleChange={handleChange} />
        <LandMediaUpload formData={formData} handleChange={handleChange} />
        <MetaInfo formData={formData} handleChange={handleChange} />

        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors cursor-pointer"
        >
          Update Land
        </button>
      </form>
    </div>
  );
};

export default UpdateLand;
