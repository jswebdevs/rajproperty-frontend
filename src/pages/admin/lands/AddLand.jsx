import { useState, useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import Swal from "sweetalert2";
import OwnerInfo from "./OwnerInfo";
import LocationInfo from "./LocationInfo";
import LegalInfo from "./LegalInfo";
import LandDetails from "./LandDetails";
import RoadAccess from "./RoadAccess";
import PricingInfo from "./PricingInfo";
import LandMediaUpload from "./LandMediaUpload";
import MetaInfo from "./MetaInfo";

const AddLand = () => {
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    // Owner Info
    owner: "",
    ownerNID: "",
    mobile: "",

    // Location Info
    location: {
      upazila: "",
      mouja: "",
      area: "",
      gpsCoordinates: "",
      googleMapLink: "",
      landMarkNearby: [],
    },

    // Legal Info
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

    // Land Details
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

    // Road Access
    roadAccess: {
      frontRoad: "",
      sideRoad: "",
      distanceFromRoad: "",
      roadType: "",
      roadFrontage: "",
      isDrain: "",
      drainWidth: "",
    },

    // Pricing Info
    pricing: {
      pricePerKatha: "",
      value: "",
      negotiable: "",
    },

    // Media Upload
   media:{
    featuredImage: null,
    photos: [],
    videos: [],
    documents: [],
   },

    // Meta Info (auto-filled)
    meta: {
      status: "Published",
      entryBy: user?.name || "",
      entryDate: new Date().toISOString(),
      lastUpdatedBy: user?.name || "",
      lastUpdatedAt: new Date().toISOString(),
      remarks: "",
      tags: [],
    },
  });

  // Generic handleChange that supports nested objects
const handleChange = (field, value) => {
  setFormData((prev) => {
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      return {
        ...prev,
        [field]: { ...(prev[field] || {}), ...value },
      };
    } else {
      return { ...prev, [field]: value };
    }
  });
};


const handleSubmit = async (e) => {
  e.preventDefault();

  // Update meta timestamps and user before submitting
  const updatedMeta = {
    ...formData.meta,
    lastUpdatedBy: user?.name || "Unknown",
    lastUpdatedAt: new Date().toISOString(),
  };

  const finalData = { ...formData, meta: updatedMeta };

  console.log("Final form data to submit:", finalData);

  try {
    const res = await fetch(
      "https://rajproperty-backend-1.onrender.com/api/lands",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalData),
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to save land: ${res.statusText}`);
    }

    const data = await res.json();
    console.log("Land saved successfully:", data);

    Swal.fire({
      icon: "success",
      title: "Land Added",
      text: "The land information has been saved successfully!",
      confirmButtonColor: "#2563eb", // Tailwind blue-600
    });

    setFormData({});
  } catch (err) {
    console.error("Error saving land:", err);

    Swal.fire({
      icon: "error",
      title: "Failed",
      text: "There was an error while saving the land. Please try again.",
      confirmButtonColor: "#ef4444", // Tailwind red-500
    });
  }
};


  return (
    <div className="py-6">
      <form
        className="max-w-5xl mx-auto p-6 bg-base-200 shadow rounded-lg space-y-6"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-center">Add a Land</h2>

        <OwnerInfo formData={formData} handleChange={handleChange} />
        <LocationInfo formData={formData} handleChange={handleChange} />
        <LegalInfo formData={formData} handleChange={handleChange} />
        <LandDetails formData={formData} handleChange={handleChange} />
        <RoadAccess formData={formData} handleChange={handleChange} />
        <PricingInfo formData={formData} handleChange={handleChange} />
        <LandMediaUpload formData={formData} handleChange={handleChange} />
        <MetaInfo formData={formData} handleChange={handleChange} />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors cursor-pointer"
        >
          Save Land
        </button>
      </form>
    </div>
  );
};

export default AddLand;
