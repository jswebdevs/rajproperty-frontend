const OwnerInfo = ({ formData, handleChange }) => {
  return (
    <section>
      <h3 className="font-semibold mb-2 text-center">Owner's Information</h3>
      <div className="space-y-2">
        {/* Owner Name */}
        <div className="flex items-center">
          <label className="w-1/3">Owner's Name</label>
          <input
            type="text"
            value={formData.owner}
            onChange={(e) => handleChange("owner", e.target.value)}
            className="w-full border p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter owner name"
          />
        </div>

        {/* Owner NID */}
        <div className="flex items-center">
          <label className="w-1/3">Owner NID</label>
          <input
            type="text"
            value={formData.ownerNID}
            onChange={(e) => handleChange("ownerNID", e.target.value)}
            className="w-full border p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter NID number"
          />
        </div>

        {/* Mobile */}
        <div className="flex items-center">
          <label className="w-1/3">Mobile</label>
          <input
            type="text"
            value={formData.mobile}
            onChange={(e) => handleChange("mobile", e.target.value)}
            className="w-full border p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter mobile number"
          />
        </div>
      </div>
    </section>
  );
};

export default OwnerInfo;
