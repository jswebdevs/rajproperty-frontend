import { useState, useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import Swal from "sweetalert2";



const AddHouse = () => {
    const {user} = useContext(AuthContext);

    const [formData, setFormData] = useState({
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

      //Land Details
      landDetails: {
        regNo: "",
        landSizeKatha: "",
        landSizeChatak: "",
        totalAreaDecimal: "",
        length: "",
        width: "",
        landShape: "",
        facingDirection: "",
        landClass: "",
        needToFill: "",
        details: "",
      },
      //Building Details
      buildingDetails: {
        buildingName: "",
        totalFloors: "",
        unitPerFloor: "",
        yearBuilt: "",
        constructionStatus: "",
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

      roadAccess: {
        frontRoad: 16,
        sideRoad: 10,
        distanceFromRoad: "100m from main road",
        roadType: "Paved",
        roadFrontage: "30 ft",
        isDrain: "Yes",
        drainWidth: 4,
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
        "https://rajproperty-backend-1.onrender.com/api/houses",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(finalData),
        }
      );
  
      if (!res.ok) {
        throw new Error(`Failed to save house: ${res.statusText}`);
      }
  
      const data = await res.json();
      console.log("House saved successfully:", data);
  
      Swal.fire({
        icon: "success",
        title: "House Added",
        text: "The house information has been saved successfully!",
        confirmButtonColor: "#2563eb", // Tailwind blue-600
      });
  
      setFormData({});
    } catch (err) {
      console.error("Error saving house:", err);
  
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "There was an error while saving the house. Please try again.",
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
          <h2 className="text-2xl font-bold text-center">Add a House</h2>

          <OwnerInfo formData={formData} handleChange={handleChange} />
          <LocationInfo formData={formData} handleChange={handleChange} />
          <LegalInfo formData={formData} handleChange={handleChange} />
          <BuildingDetails formData={formData} handleChange={handleChange} />
          <Amenities formData={formData} handleChange={handleChange} />
          <HouseDetails formData={formData} handleChange={handleChange} />
          <Pricing formData={formData} handleChange={handleChange} />
          <HouseMediaUpload formData={formData} handleChange={handleChange} />
          <MetaInfo formData={formData} handleChange={handleChange} />

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors cursor-pointer"
          >
            Save House
          </button>
        </form>
      </div>
    );
};

export default AddHouse;