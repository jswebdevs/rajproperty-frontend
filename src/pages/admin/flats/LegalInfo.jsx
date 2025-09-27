const LegalInfo = ({ formData, handleChange }) => {
  return (
    <section>
      <h3 className="font-semibold mb-2 text-center">Legal Information</h3>
      <div className="space-y-2">
        {/* Holding Number */}
        <div className="flex items-center">
          <label className="w-1/3">Holding Number</label>
          <input
            type="text"
            placeholder="Holding Number"
            value={formData.legal?.holdingNo || ""}
            onChange={(e) =>
              handleChange("legal", {
                ...formData.legal,
                holdingNo: e.target.value,
              })
            }
            className="w-full border p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-base-100"
          />
        </div>

        {/* Utility Connections */}
        <h4 className="font-medium mt-4">Utility Connections</h4>

        <div className="flex items-center">
          <label className="w-1/3">Electricity</label>
          <input
            type="text"
            placeholder="Electricity Provider"
            value={formData.legal?.utilityConnections?.electricity || ""}
            onChange={(e) =>
              handleChange("legal", {
                ...formData.legal,
                utilityConnections: {
                  ...formData.legal?.utilityConnections,
                  electricity: e.target.value,
                },
              })
            }
            className="w-full border p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-base-100"
          />
        </div>

        <div className="flex items-center">
          <label className="w-1/3">Gas</label>
          <input
            type="text"
            placeholder="Gas Provider"
            value={formData.legal?.utilityConnections?.gas || ""}
            onChange={(e) =>
              handleChange("legal", {
                ...formData.legal,
                utilityConnections: {
                  ...formData.legal?.utilityConnections,
                  gas: e.target.value,
                },
              })
            }
            className="w-full border p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-base-100"
          />
        </div>

        <div className="flex items-center">
          <label className="w-1/3">Water</label>
          <input
            type="text"
            placeholder="Water Provider"
            value={formData.legal?.utilityConnections?.water || ""}
            onChange={(e) =>
              handleChange("legal", {
                ...formData.legal,
                utilityConnections: {
                  ...formData.legal?.utilityConnections,
                  water: e.target.value,
                },
              })
            }
            className="w-full border p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-base-100"
          />
        </div>

        <div className="flex items-center">
          <label className="w-1/3">Sewerage</label>
          <input
            type="text"
            placeholder="Sewerage Status"
            value={formData.legal?.utilityConnections?.sewerage || ""}
            onChange={(e) =>
              handleChange("legal", {
                ...formData.legal,
                utilityConnections: {
                  ...formData.legal?.utilityConnections,
                  sewerage: e.target.value,
                },
              })
            }
            className="w-full border p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-base-100"
          />
        </div>

        {/* Mutation Status */}
        <div className="flex items-center">
          <label className="w-1/3">Mutation Status</label>
          <input
            type="text"
            placeholder="Mutation Status"
            value={formData.legal?.mutationStatus || ""}
            onChange={(e) =>
              handleChange("legal", {
                ...formData.legal,
                mutationStatus: e.target.value,
              })
            }
            className="w-full border p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-base-100"
          />
        </div>

        {/* Tax Status */}
        <div className="flex items-center">
          <label className="w-1/3">Tax Status</label>
          <input
            type="text"
            placeholder="Tax Status"
            value={formData.legal?.taxStatus || ""}
            onChange={(e) =>
              handleChange("legal", {
                ...formData.legal,
                taxStatus: e.target.value,
              })
            }
            className="w-full border p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-base-100"
          />
        </div>

        {/* Dispute Status */}
        <div className="flex items-center">
          <label className="w-1/3">Dispute Status</label>
          <input
            type="text"
            placeholder="Dispute Status"
            value={formData.legal?.disputeStatus || ""}
            onChange={(e) =>
              handleChange("legal", {
                ...formData.legal,
                disputeStatus: e.target.value,
              })
            }
            className="w-full border p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-base-100"
          />
        </div>
      </div>
    </section>
  );
};

export default LegalInfo;
