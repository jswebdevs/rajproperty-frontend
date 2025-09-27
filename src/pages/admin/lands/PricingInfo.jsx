const PricingInfo = ({ formData, handleChange }) => {
  return (
    <section>
      <h3 className="font-semibold mb-2 text-center">Pricing</h3>
      <div className="space-y-2">
        {/* Price per Katha */}
        <div className="flex items-center">
          <label className="w-1/3">Price per Katha</label>
          <input
            type="number"
            placeholder="e.g. 2000000"
            value={formData.pricing?.pricePerKatha || ""}
            onChange={(e) =>
              handleChange("pricing", {
                ...formData.pricing,
                pricePerKatha: e.target.value,
              })
            }
            className="w-full border p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Total Value */}
        <div className="flex items-center">
          <label className="w-1/3">Total Value</label>
          <input
            type="number"
            placeholder="e.g. 1260000000"
            value={formData.pricing?.value || ""}
            onChange={(e) =>
              handleChange("pricing", {
                ...formData.pricing,
                value: e.target.value,
              })
            }
            className="w-full border p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            <option value="">--Select--</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
      </div>
    </section>
  );
};

export default PricingInfo;
