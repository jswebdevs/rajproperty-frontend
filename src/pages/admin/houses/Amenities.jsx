const Amenities = ({ formData, handleChange }) => {
  const updateAmenity = (key, value) => {
    handleChange("amenities", {
      ...formData.amenities,
      [key]: value,
    });
  };

  return (
    <section>
      <h3 className="font-semibold mb-2 text-center">Amenities</h3>
      <div className="space-y-2">
        {/* Lift */}
        <div className="flex items-center">
          <label className="w-1/3">Lift</label>
          <select
            value={formData.amenities?.lift || ""}
            onChange={(e) => updateAmenity("lift", e.target.value)}
            className="w-full border p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-base-100"
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        {/* Generator */}
        <div className="flex items-center">
          <label className="w-1/3">Generator</label>
          <select
            value={formData.amenities?.generator || ""}
            onChange={(e) => updateAmenity("generator", e.target.value)}
            className="w-full border p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-base-100"
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        {/* Community Hall */}
        <div className="flex items-center">
          <label className="w-1/3">Community Hall</label>
          <select
            value={formData.amenities?.communityHall || ""}
            onChange={(e) => updateAmenity("communityHall", e.target.value)}
            className="w-full border p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-base-100"
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        {/* Roof Access */}
        <div className="flex items-center">
          <label className="w-1/3">Roof Access</label>
          <select
            value={formData.amenities?.roofAccess || ""}
            onChange={(e) => updateAmenity("roofAccess", e.target.value)}
            className="w-full border p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-base-100"
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        {/* Gym */}
        <div className="flex items-center">
          <label className="w-1/3">Gym</label>
          <select
            value={formData.amenities?.gym || ""}
            onChange={(e) => updateAmenity("gym", e.target.value)}
            className="w-full border p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-base-100"
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        {/* Swimming Pool */}
        <div className="flex items-center">
          <label className="w-1/3">Swimming Pool</label>
          <select
            value={formData.amenities?.swimmingPool || ""}
            onChange={(e) => updateAmenity("swimmingPool", e.target.value)}
            className="w-full border p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-base-100"
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        {/* Garden */}
        <div className="flex items-center">
          <label className="w-1/3">Garden</label>
          <select
            value={formData.amenities?.garden || ""}
            onChange={(e) => updateAmenity("garden", e.target.value)}
            className="w-full border p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-base-100"
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
      </div>
    </section>
  );
};

export default Amenities;
