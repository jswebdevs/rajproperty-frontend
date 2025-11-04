const BuildingDetails = ({ formData, handleChange }) => {
  const updateBuildingDetail = (key, value) => {
    handleChange("buildingDetails", {
      ...formData.buildingDetails,
      [key]: value,
    });
  };

  return (
    <section>
      <h3 className="font-semibold mb-2 text-center">Building Details</h3>
      <div className="space-y-2">
        {/* Building Name */}
        <div className="flex items-center">
          <label className="w-1/3">Building Name</label>
          <input
            type="text"
            placeholder="Name of the Building"
            value={formData.buildingDetails?.buildingName || ""}
            onChange={(e) =>
              updateBuildingDetail("buildingName", e.target.value)
            }
            className="w-full border p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-base-100"
          />
        </div>

        {/* Total Floors */}
        <div className="flex items-center">
          <label className="w-1/3">Total Floors</label>
          <input
            type="number"
            placeholder="e.g. 10"
            value={formData.buildingDetails?.totalFloors || ""}
            onChange={(e) =>
              updateBuildingDetail("totalFloors", e.target.value)
            }
            className="w-full border p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-base-100"
          />
        </div>

        {/* Units per Floor */}
        <div className="flex items-center">
          <label className="w-1/3">Units per Floor</label>
          <input
            type="number"
            placeholder="e.g. 4"
            value={formData.buildingDetails?.unitPerFloor || ""}
            onChange={(e) =>
              updateBuildingDetail("unitPerFloor", e.target.value)
            }
            className="w-full border p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-base-100"
          />
        </div>

        {/* Year Built */}
        <div className="flex items-center">
          <label className="w-1/3">Year Built</label>
          <input
            type="number"
            placeholder="e.g. 2020"
            value={formData.buildingDetails?.yearBuilt || ""}
            onChange={(e) => updateBuildingDetail("yearBuilt", e.target.value)}
            className="w-full border p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-base-100"
          />
        </div>

        {/* Construction Status */}
        <div className="flex items-center">
          <label className="w-1/3">Construction Status</label>
          <select
            value={formData.buildingDetails?.constructionStatus || ""}
            onChange={(e) =>
              updateBuildingDetail("constructionStatus", e.target.value)
            }
            className="w-full border p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-base-100"
          >
            <option value="">Select</option>
            <option value="Ready">Ready</option>
            <option value="Under Construction">Under Construction</option>
            <option value="Planned">Planned</option>
          </select>
        </div>

        {/* Size (Sqft) */}
        <div className="flex items-center">
          <label className="w-1/3">Size (Sqft)</label>
          <input
            type="number"
            placeholder="Size in Sqft"
            value={formData.buildingDetails?.sizeSqft || ""}
            onChange={(e) => updateBuildingDetail("sizeSqft", e.target.value)}
            className="w-full border p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-base-100"
          />
        </div>

        {/* Bedrooms */}
        <div className="flex items-center">
          <label className="w-1/3">Bedrooms</label>
          <input
            type="number"
            placeholder="No. of Bedrooms"
            value={formData.buildingDetails?.bedrooms || ""}
            onChange={(e) => updateBuildingDetail("bedrooms", e.target.value)}
            className="w-full border p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-base-100"
          />
        </div>

        {/* Bathrooms */}
        <div className="flex items-center">
          <label className="w-1/3">Bathrooms</label>
          <input
            type="number"
            placeholder="No. of Bathrooms"
            value={formData.buildingDetails?.bathrooms || ""}
            onChange={(e) => updateBuildingDetail("bathrooms", e.target.value)}
            className="w-full border p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-base-100"
          />
        </div>

        {/* Balconies */}
        <div className="flex items-center">
          <label className="w-1/3">Balconies</label>
          <input
            type="number"
            placeholder="No. of Balconies"
            value={formData.buildingDetails?.balconies || ""}
            onChange={(e) => updateBuildingDetail("balconies", e.target.value)}
            className="w-full border p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-base-100"
          />
        </div>

        {/* Drawing Room */}
        <div className="flex items-center">
          <label className="w-1/3">Drawing Room</label>
          <select
            value={formData.buildingDetails?.drawingRoom || ""}
            onChange={(e) =>
              updateBuildingDetail("drawingRoom", e.target.value)
            }
            className="w-full border p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-base-100"
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        {/* Dining Room */}
        <div className="flex items-center">
          <label className="w-1/3">Dining Room</label>
          <select
            value={formData.buildingDetails?.diningRoom || ""}
            onChange={(e) => updateBuildingDetail("diningRoom", e.target.value)}
            className="w-full border p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-base-100"
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        {/* Kitchen */}
        <div className="flex items-center">
          <label className="w-1/3">Kitchen</label>
          <input
            type="text"
            placeholder="e.g. 1 Modern Kitchen"
            value={formData.buildingDetails?.kitchen || ""}
            onChange={(e) => updateBuildingDetail("kitchen", e.target.value)}
            className="w-full border p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-base-100"
          />
        </div>

        {/* Flooring */}
        <div className="flex items-center">
          <label className="w-1/3">Flooring</label>
          <input
            type="text"
            placeholder="e.g. Tiles, Marble, Wooden"
            value={formData.buildingDetails?.flooring || ""}
            onChange={(e) => updateBuildingDetail("flooring", e.target.value)}
            className="w-full border p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-base-100"
          />
        </div>

        {/* Facing Direction */}
        <div className="flex items-center">
          <label className="w-1/3">Facing Direction</label>
          <select
            value={formData.buildingDetails?.facingDirection || ""}
            onChange={(e) =>
              updateBuildingDetail("facingDirection", e.target.value)
            }
            className="w-full border p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-base-100"
          >
            <option value="">Select</option>
            <option value="North">North</option>
            <option value="South">South</option>
            <option value="East">East</option>
            <option value="West">West</option>
          </select>
        </div>

        {/* Furnishing */}
        <div className="flex items-center">
          <label className="w-1/3">Furnishing</label>
          <select
            value={formData.buildingDetails?.furnishing || ""}
            onChange={(e) => updateBuildingDetail("furnishing", e.target.value)}
            className="w-full border p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-base-100"
          >
            <option value="">Select</option>
            <option value="Unfurnished">Unfurnished</option>
            <option value="Semi-Furnished">Semi-Furnished</option>
            <option value="Fully-Furnished">Fully-Furnished</option>
          </select>
        </div>

        {/* Parking */}
        <div className="flex items-center">
          <label className="w-1/3">Parking</label>
          <input
            type="text"
            placeholder="e.g. 2 Car Parking"
            value={formData.buildingDetails?.parking || ""}
            onChange={(e) => updateBuildingDetail("parking", e.target.value)}
            className="w-full border p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-base-100"
          />
        </div>

        {/* Security System */}
        <div className="flex items-center">
          <label className="w-1/3">Security System</label>
          <input
            type="text"
            placeholder="e.g. CCTV, Intercom, Guard"
            value={formData.buildingDetails?.securitySystem || ""}
            onChange={(e) =>
              updateBuildingDetail("securitySystem", e.target.value)
            }
            className="w-full border p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-base-100"
          />
        </div>

        {/* Details */}
        <div className="flex items-start">
          <label className="w-1/3 mt-2">Details</label>
          <textarea
            placeholder="Additional details about the building"
            value={formData.buildingDetails?.details || ""}
            onChange={(e) => updateBuildingDetail("details", e.target.value)}
            className="w-full border p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-base-100"
            rows={3}
          />
        </div>
      </div>
    </section>
  );
};

export default BuildingDetails;
