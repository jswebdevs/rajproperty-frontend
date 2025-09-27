const BuildingDetails = ({ formData, handleChange }) => {
  return (
    <section>
      <h3 className="font-semibold mb-2 text-center">Building Details</h3>
      <div className="space-y-2">
        {/* Building Name */}
        <div className="flex items-center">
          <label className="w-1/3">Building Name</label>
          <input
            type="text"
            placeholder="Building Name"
            value={formData.buildingDetails?.buildingName || ""}
            onChange={(e) =>
              handleChange("buildingDetails", {
                ...formData.buildingDetails,
                buildingName: e.target.value,
              })
            }
            className="w-full border p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-base-100"
          />
        </div>

        {/* Flat No */}
        <div className="flex items-center">
          <label className="w-1/3">Flat No</label>
          <input
            type="text"
            placeholder="Flat Number"
            value={formData.buildingDetails?.houseNo || ""}
            onChange={(e) =>
              handleChange("buildingDetails", {
                ...formData.buildingDetails,
                houseNo: e.target.value,
              })
            }
            className="w-full border p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-base-100"
          />
        </div>

        {/* Floor No */}
        <div className="flex items-center">
          <label className="w-1/3">Floor No</label>
          <input
            type="number"
            placeholder="Floor Number"
            value={formData.buildingDetails?.floorNo || ""}
            onChange={(e) =>
              handleChange("buildingDetails", {
                ...formData.buildingDetails,
                floorNo: e.target.value,
              })
            }
            className="w-full border p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-base-100"
          />
        </div>

        {/* Total Floors */}
        <div className="flex items-center">
          <label className="w-1/3">Total Floors</label>
          <input
            type="number"
            placeholder="Total Floors"
            value={formData.buildingDetails?.totalFloors || ""}
            onChange={(e) =>
              handleChange("buildingDetails", {
                ...formData.buildingDetails,
                totalFloors: e.target.value,
              })
            }
            className="w-full border p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-base-100"
          />
        </div>

        {/* Unit Per Floor */}
        <div className="flex items-center">
          <label className="w-1/3">Units per Floor</label>
          <input
            type="number"
            placeholder="Units per Floor"
            value={formData.buildingDetails?.unitPerFloor || ""}
            onChange={(e) =>
              handleChange("buildingDetails", {
                ...formData.buildingDetails,
                unitPerFloor: e.target.value,
              })
            }
            className="w-full border p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-base-100"
          />
        </div>

        {/* Year Built */}
        <div className="flex items-center">
          <label className="w-1/3">Year Built</label>
          <input
            type="number"
            placeholder="Year Built"
            value={formData.buildingDetails?.yearBuilt || ""}
            onChange={(e) =>
              handleChange("buildingDetails", {
                ...formData.buildingDetails,
                yearBuilt: e.target.value,
              })
            }
            className="w-full border p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-base-100"
          />
        </div>

        {/* Construction Status */}
        <div className="flex items-center">
          <label className="w-1/3">Construction Status</label>
          <input
            type="text"
            placeholder="e.g. Ready, Under Construction"
            value={formData.buildingDetails?.constructionStatus || ""}
            onChange={(e) =>
              handleChange("buildingDetails", {
                ...formData.buildingDetails,
                constructionStatus: e.target.value,
              })
            }
            className="w-full border p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-base-100"
          />
        </div>

        {/* Parking */}
        <div className="flex items-center">
          <label className="w-1/3">Parking</label>
          <input
            type="text"
            placeholder="e.g. 1 Reserved, None"
            value={formData.buildingDetails?.parking || ""}
            onChange={(e) =>
              handleChange("buildingDetails", {
                ...formData.buildingDetails,
                parking: e.target.value,
              })
            }
            className="w-full border p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-base-100"
          />
        </div>

        {/* Security System */}
        <div className="flex items-center">
          <label className="w-1/3">Security System</label>
          <input
            type="text"
            placeholder="e.g. 24/7 Security, CCTV"
            value={formData.buildingDetails?.securitySystem || ""}
            onChange={(e) =>
              handleChange("buildingDetails", {
                ...formData.buildingDetails,
                securitySystem: e.target.value,
              })
            }
            className="w-full border p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-base-100"
          />
        </div>
      </div>
    </section>
  );
};

export default BuildingDetails;
