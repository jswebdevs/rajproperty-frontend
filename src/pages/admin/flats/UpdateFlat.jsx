import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, useLoaderData, Link } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import Swal from "sweetalert2";
import axios from "axios";

// Reuse small components
import OwnerInfo from "./OwnerInfo";
import LocationInfo from "./LocationInfo";
import MetaInfo from "./MetaInfo";
import LegalInfo from "./LegalInfo";
import BuildingDetails from "./BuildingDetails";
import Amenities from "./Amenities";
import FlatDetails from "./FlatDetails";
import Pricing from "./Pricing";
import FlatMediaUpload from "./FlatMediaUpload";


const UpdateFlat = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const loaderData = useLoaderData();

  const defaultFormData = {
    //owner info
    owner: "",
    ownerNID: "",
    mobile: "",

    //Location Information
    location: {
      upazila: "",
      mouja: "",
      area: "",
      gpsCoordinates: "",
      googleMapLink: "",
      landMarkNearby: [],
    },

    legal: {
      holdingNo: "",
      utilityConnections: {
        electricity: "",
        gas: "",
        water: "",
        sewerage: "",
      },
      mutationStatus: "",
      taxStatus: "",
      disputeStatus: "",
    },
    //Building Details
    buildingDetails: {
      buildingName: "",
      flatNo: "",
      floorNo: "",
      totalFloors: "",
      unitPerFloor: "",
      yearBuilt: "",
      constructionStatus: "",
      parking: "",
      securitySystem: "",
    },
    amenities: {
      lift: "",
      generator: "",
      communityHall: "",
      roofAccess: "",
      gym: "",
      swimmingPool: "",
      garden: "",
    },

    //Flat Details
    flatDetails: {
      sizeSqft: "",
      bedrooms: "",
      bathrooms: "",
      balconies: "",
      drawingRoom: "",
      diningRoom: "",
      kitchen: "",
      flooring: "",
      facingDirection: "",
      furnishing: "",
      details: "",
    },

    pricing: {
      pricePerSqft: "",
      value: "",
      negotiable: "",
    },

    media: {
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
  };

  const [formData, setFormData] = useState(defaultFormData);


  // ✅ Fetch flat by id on mount
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

  // ✅ Submit updated flat

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
        `https://backend.rajproperty.site/api/flats/${id}/`,
        finalData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("Flat updated:", data);

      Swal.fire({
        icon: "success",
        title: "Updated",
        text: "Flat information updated successfully!",
        confirmButtonColor: "#2563eb",
      });

      navigate(`/dashboard/flats/${id}`);
    } catch (err) {
      console.error("Error updating flat:", err.response || err);

      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text:
          err.response?.data?.error || "There was an error updating the flat.",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  if (!formData) return <p className="text-center">Loading flat data...</p>;

  return (
    <div className="py-6">
      <form
        className="max-w-5xl mx-auto p-6 bg-base-200 shadow rounded-lg space-y-6"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold text-center">Update Flat</h2>
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
        <BuildingDetails formData={formData} handleChange={handleChange} />
        <Amenities formData={formData} handleChange={handleChange} />
        <FlatDetails formData={formData} handleChange={handleChange} />
        <Pricing formData={formData} handleChange={handleChange} />
        <FlatMediaUpload formData={formData} handleChange={handleChange} />
        <MetaInfo formData={formData} handleChange={handleChange} />

        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors cursor-pointer"
        >
          Update Flat
        </button>
      </form>
    </div>
  );
};

export default UpdateFlat;
