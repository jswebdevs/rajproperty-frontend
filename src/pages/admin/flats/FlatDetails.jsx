const FlatDetails = ({ formData, handleChange }) => {
  const updateFlatDetail = (key, value) => {
    handleChange("flatDetails", {
      ...formData.flatDetails,
      [key]: value,
    });
  };

  return (
    <section>
      <h3 className="font-semibold mb-2 text-center">Flat Details</h3>
      <div className="space-y-2">
        {/* Size (Sqft) */}
        <div className="flex items-center">
          <label className="w-1/3">Size (Sqft)</label>
          <input
            type="number"
            placeholder="Size in Sqft"
            value={formData.flatDetails?.sizeSqft || ""}
            onChange={(e) => updateFlatDetail("sizeSqft", e.target.value)}
            className="w-full border p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-base-100"
          />
        </div>

        {/* Bedrooms */}
        <div className="flex items-center">
          <label className="w-1/3">Bedrooms</label>
          <input
            type="number"
            placeholder="No. of Bedrooms"
            value={formData.flatDetails?.bedrooms || ""}
            onChange={(e) => updateFlatDetail("bedrooms", e.target.value)}
            className="w-full border p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-base-100"
          />
        </div>

        {/* Bathrooms */}
        <div className="flex items-center">
          <label className="w-1/3">Bathrooms</label>
          <input
            type="number"
            placeholder="No. of Bathrooms"
            value={formData.flatDetails?.bathrooms || ""}
            onChange={(e) => updateFlatDetail("bathrooms", e.target.value)}
            className="w-full border p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-base-100"
          />
        </div>

        {/* Balconies */}
        <div className="flex items-center">
          <label className="w-1/3">Balconies</label>
          <input
            type="number"
            placeholder="No. of Balconies"
            value={formData.flatDetails?.balconies || ""}
            onChange={(e) => updateFlatDetail("balconies", e.target.value)}
            className="w-full border p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-base-100"
          />
        </div>

        {/* Drawing Room */}
        <div className="flex items-center">
          <label className="w-1/3">Drawing Room</label>
          <select
            value={formData.flatDetails?.drawingRoom || ""}
            onChange={(e) => updateFlatDetail("drawingRoom", e.target.value)}
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
            value={formData.flatDetails?.diningRoom || ""}
            onChange={(e) => updateFlatDetail("diningRoom", e.target.value)}
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
            value={formData.flatDetails?.kitchen || ""}
            onChange={(e) => updateFlatDetail("kitchen", e.target.value)}
            className="w-full border p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-base-100"
          />
        </div>

        {/* Flooring */}
        <div className="flex items-center">
          <label className="w-1/3">Flooring</label>
          <input
            type="text"
            placeholder="e.g. Tiles, Marble, Wooden"
            value={formData.flatDetails?.flooring || ""}
            onChange={(e) => updateFlatDetail("flooring", e.target.value)}
            className="w-full border p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-base-100"
          />
        </div>

        {/* Facing Direction */}
        <div className="flex items-center">
          <label className="w-1/3">Facing Direction</label>
          <select
            value={formData.flatDetails?.facingDirection || ""}
            onChange={(e) =>
              updateFlatDetail("facingDirection", e.target.value)
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
            value={formData.flatDetails?.furnishing || ""}
            onChange={(e) => updateFlatDetail("furnishing", e.target.value)}
            className="w-full border p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-base-100"
          >
            <option value="">Select</option>
            <option value="Unfurnished">Unfurnished</option>
            <option value="Semi-Furnished">Semi-Furnished</option>
            <option value="Fully-Furnished">Fully-Furnished</option>
          </select>
        </div>

        {/* Details */}
        <div className="flex items-start">
          <label className="w-1/3 mt-2">Details</label>
          <textarea
            placeholder="Additional details about the flat"
            value={formData.flatDetails?.details || ""}
            onChange={(e) => updateFlatDetail("details", e.target.value)}
            className="w-full border p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-base-100"
            rows={3}
          />
        </div>
      </div>
    </section>
  );
};

export default FlatDetails;
