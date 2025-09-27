const RoadAccess = ({ formData, handleChange }) => {
  return (
    <section>
      <h3 className="font-semibold mb-2 text-center">Road Access</h3>
      <div className="space-y-2">
        {/* Front Road */}
        <div className="flex items-center">
          <label className="w-1/3">Front Road (ft)</label>
          <input
            type="number"
            placeholder="e.g. 12"
            value={formData.roadAccess?.frontRoad || ""}
            onChange={(e) =>
              handleChange("roadAccess", {
                ...formData.roadAccess,
                frontRoad: e.target.value,
              })
            }
            className="w-full border p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-base-100"
          />
        </div>

        {/* Side Road */}
        <div className="flex items-center">
          <label className="w-1/3">Side Road (ft)</label>
          <input
            type="number"
            placeholder="e.g. 8"
            value={formData.roadAccess?.sideRoad || ""}
            onChange={(e) =>
              handleChange("roadAccess", {
                ...formData.roadAccess,
                sideRoad: e.target.value,
              })
            }
            className="w-full border p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-base-100"
          />
        </div>

        {/* Distance From Road */}
        <div className="flex items-center">
          <label className="w-1/3">Distance From Road</label>
          <input
            type="text"
            placeholder="e.g. 50m from main highway"
            value={formData.roadAccess?.distanceFromRoad || ""}
            onChange={(e) =>
              handleChange("roadAccess", {
                ...formData.roadAccess,
                distanceFromRoad: e.target.value,
              })
            }
            className="w-full border p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-base-100"
          />
        </div>

        {/* Road Type */}
        <div className="flex items-center">
          <label className="w-1/3">Road Type</label>
          <select
            value={formData.roadAccess?.roadType || ""}
            onChange={(e) =>
              handleChange("roadAccess", {
                ...formData.roadAccess,
                roadType: e.target.value,
              })
            }
            className="w-full border p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-base-100"
          >
            <option value="">--Select Road Type--</option>
            <option value="Paved">Paved</option>
            <option value="Unpaved">Unpaved</option>
            <option value="Gravel">Gravel</option>
            <option value="Concrete">Concrete</option>
          </select>
        </div>

        {/* Road Frontage */}
        <div className="flex items-center">
          <label className="w-1/3">Road Frontage</label>
          <input
            type="text"
            placeholder="e.g. 25 ft"
            value={formData.roadAccess?.roadFrontage || ""}
            onChange={(e) =>
              handleChange("roadAccess", {
                ...formData.roadAccess,
                roadFrontage: e.target.value,
              })
            }
            className="w-full border p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-base-100"
          />
        </div>

        {/* Is Drain */}
        <div className="flex items-center">
          <label className="w-1/3">Drain Available?</label>
          <select
            value={formData.roadAccess?.isDrain || ""}
            onChange={(e) =>
              handleChange("roadAccess", {
                ...formData.roadAccess,
                isDrain: e.target.value,
                drainWidth:
                  e.target.value === "Yes"
                    ? formData.roadAccess?.drainWidth || ""
                    : "",
              })
            }
            className="w-full border p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-base-100"
          >
            <option value="">--Select--</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        {/* Drain Width (only if drain = Yes) */}
        {formData.roadAccess?.isDrain === "Yes" && (
          <div className="flex items-center">
            <label className="w-1/3">Drain Width (ft)</label>
            <input
              type="number"
              placeholder="e.g. 5"
              value={formData.roadAccess?.drainWidth || ""}
              onChange={(e) =>
                handleChange("roadAccess", {
                  ...formData.roadAccess,
                  drainWidth: e.target.value,
                })
              }
              className="w-full border p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-base-100"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default RoadAccess;
