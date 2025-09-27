const Pricing = ({ formData, handleChange }) => {
  return (
    <section>
      <h3 className="font-semibold mb-2 text-center">Pricing Information</h3>
      <div className="space-y-2">
        {/* Price Per Sqft */}
        <div className="flex items-center">
          <label className="w-1/3">Price Per Sqft</label>
          <input
            type="number"
            placeholder="Enter price per sqft"
            value={formData.pricing?.pricePerSqft || ""}
            onChange={(e) =>
              handleChange("pricing", {
                ...formData.pricing,
                pricePerSqft: e.target.value,
              })
            }
            className="w-full border p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-base-100"
          />
        </div>

        {/* Total Value */}
        <div className="flex items-center">
          <label className="w-1/3">Total Value</label>
          <input
            type="number"
            placeholder="Enter total value"
            value={formData.pricing?.value || ""}
            onChange={(e) =>
              handleChange("pricing", {
                ...formData.pricing,
                value: e.target.value,
              })
            }
            className="w-full border p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-base-100"
          />
        </div>

        {/* Negotiable */}
        <div className="flex items-center">
          <label className="w-1/3">Negotiable</label>
          <select
            value={formData.pricing?.negotiable || ""}
            onChange={(e) =>
              handleChange("pricing", {
                ...formData.pricing,
                negotiable: e.target.value,
              })
            }
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

export default Pricing;
