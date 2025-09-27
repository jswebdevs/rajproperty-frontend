const LandDetails = ({ formData, handleChange }) => {
  return (
    <section>
      <h3 className="font-semibold mb-2 text-center">Land Details</h3>
      <div className="space-y-2">
        {/* Registration No */}
        <div className="flex items-center">
          <label className="w-1/3">Registration No</label>
          <input
            type="text"
            value={formData.landDetails?.regNo || ""}
            onChange={(e) =>
              handleChange("landDetails", {
                ...formData.landDetails,
                regNo: e.target.value,
              })
            }
            className="w-full border p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Land Size (Katha & Chatak) */}
        <div className="flex items-center gap-2">
          <label className="w-1/3">Land Size</label>

          {/* Katha */}
          <input
            type="number"
            placeholder="Katha"
            value={formData.landDetails?.landSizeKatha || 0}
            onChange={(e) => {
              const landSizeKatha = e.target.value;
              const landSizeChatak = formData.landDetails?.landSizeChatak || 0;

              const quantity = (
                (Number(landSizeKatha || 0) + Number(landSizeChatak) / 16) *
                165
              ).toFixed(2);

              handleChange("landDetails", {
                ...formData.landDetails,
                landSizeKatha,
                quantity,
              });
            }}
            className="w-1/2 border p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Chatak */}
          <input
            type="number"
            placeholder="Chatak"
            value={formData.landDetails?.landSizeChatak || ""}
            onChange={(e) => {
              const landSizeChatak = e.target.value;
              const landSizeKatha = formData.landDetails?.landSizeKatha || 0;

              const quantity = (
                (Number(landSizeKatha) + Number(landSizeChatak || 0) / 16) *
                165
              ).toFixed(2);

              handleChange("landDetails", {
                ...formData.landDetails,
                landSizeChatak,
                quantity,
              });
            }}
            className="w-1/2 border p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Total Area (Decimal) */}
        <div className="flex items-center">
          <label className="w-1/3">Total Area (Decimal)</label>
          <input
            type="text"
            value={formData.landDetails?.quantity || ""}
            disabled
            className="w-full border p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Dimensions */}
        <div className="flex items-center gap-2">
          <label className="w-1/3">Length & Width</label>
          <input
            type="text"
            placeholder="Length"
            value={formData.landDetails?.length || ""}
            onChange={(e) =>
              handleChange("landDetails", {
                ...formData.landDetails,
                length: e.target.value,
              })
            }
            className="w-1/2 border p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Width"
            value={formData.landDetails?.width || ""}
            onChange={(e) =>
              handleChange("landDetails", {
                ...formData.landDetails,
                width: e.target.value,
              })
            }
            className="w-1/2 border p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Land Shape */}
        <div className="flex items-center">
          <label className="w-1/3">Land Shape</label>
          <input
            type="text"
            value={formData.landDetails?.landShape || ""}
            placeholder="e.g. Square, Trapezoid, Rectangle, Rohmbus"
            onChange={(e) =>
              handleChange("landDetails", {
                ...formData.landDetails,
                landShape: e.target.value,
              })
            }
            className="w-full border p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Facing Direction */}
        <div className="flex items-center">
          <label className="w-1/3">Facing Direction</label>
          <select
            value={formData.landDetails?.facingDirection || ""}
            onChange={(e) =>
              handleChange("landDetails", {
                ...formData.landDetails,
                facingDirection: e.target.value,
              })
            }
            className="w-full border p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-base-100"
          >
            <option value="">--Select Direction--</option>
            <option value="North">North</option>
            <option value="South">South</option>
            <option value="East">East</option>
            <option value="West">West</option>
            <option value="Corner Plot">Corner Plot</option>
          </select>
        </div>

        {/* Land Class */}
        <div className="flex items-center">
          <label className="w-1/3">Land Class</label>
          <select
            value={formData.landDetails?.landClass || ""}
            onChange={(e) =>
              handleChange("landDetails", {
                ...formData.landDetails,
                landClass: e.target.value,
              })
            }
            className="w-full border p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-base-100"
          >
            <option value="">--Select Class--</option>
            <option value="Residential">Residential</option>
            <option value="Agricultural">Agricultural</option>
            <option value="Commercial">Commercial</option>
            <option value="Industrial">Industrial</option>
          </select>
        </div>

        {/* Need to Fill */}
        <div className="flex items-center">
          <label className="w-1/3">Need to Fill?</label>
          <select
            value={formData.landDetails?.needToFill || ""}
            onChange={(e) =>
              handleChange("landDetails", {
                ...formData.landDetails,
                needToFill: e.target.value,
              })
            }
            className="w-full border p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-base-100"
          >
            <option value="">--Select--</option>
            <option value="No">No</option>
            <option value="Yes">Yes</option>
            <option value="Partially">Partially</option>
          </select>
        </div>

        {/* Extra Details */}
        <div className="flex items-start">
          <label className="w-1/3">Details</label>
          <textarea
            rows={3}
            value={formData.landDetails?.details || ""}
            onChange={(e) =>
              handleChange("landDetails", {
                ...formData.landDetails,
                details: e.target.value,
              })
            }
            className="w-full border p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
      </div>
    </section>
  );
};

export default LandDetails;
