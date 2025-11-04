import React, { useContext, useEffect } from "react";
import AuthContext from "../../../context/AuthContext"; // adjust the path as needed

const PROPERTY_STATUS = [
  "Sold",
  "Published",
  "On-hold",
  "Pending",
  "Draft",
  "Rejected",
  "Expired",
  "Archived",
];

const MetaInfo = ({ formData, handleChange }) => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!formData.meta) {
      handleChange("meta", {
        status: "Published",
        entryBy: user?.displayName || "Unknown",
        entryDate: new Date().toISOString(),
        lastUpdatedBy: user?.displayName || "No Update Yet",
        lastUpdatedAt: new Date().toISOString(),
        remarks: "",
        tags: [],
        soldBy: "", // Make sure to initialize
      });
    }
  }, [user]);

  const updateMeta = (key, value) => {
    handleChange("meta", { ...formData.meta, [key]: value });
  };

  return (
    <section className="rounded-lg space-y-4">
      <h3 className="font-semibold mb-4 text-center text-lg">
        Meta Information
      </h3>

      {/* Remarks */}
      <div className="flex items-center">
        <label className="w-1/3">Remarks</label>
        <textarea
          className="w-full p-2 rounded-sm border focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.meta?.remarks || ""}
          onChange={(e) => updateMeta("remarks", e.target.value)}
          placeholder="Enter remarks for this land"
          rows={3}
        />
      </div>

      {/* Status */}
      <div className="flex items-center">
        <label className="w-1/3">Status</label>
        <select
          className="w-full p-2 rounded-sm border focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.meta?.status || "Published"}
          onChange={(e) => updateMeta("status", e.target.value)}
        >
          {PROPERTY_STATUS.map((status) => (
            <option key={status} value={status} className="bg-base-100">
              {status}
            </option>
          ))}
        </select>
      </div>

      {/* Sold by (shown only when Sold) */}
      {formData.meta?.status === "Sold" && (
        <div className="flex items-center">
          <label className="w-1/3">Sold by</label>
          <input
            type="text"
            className="w-full p-2 rounded-sm border focus:outline-none focus:ring-2 focus:ring-green-500"
            value={formData.meta?.soldBy || ""}
            onChange={(e) => updateMeta("soldBy", e.target.value)}
            placeholder="Enter name who sold this property"
          />
        </div>
      )}

      {/* Tags */}
      <div className="flex items-center">
        <label className="w-1/3">Tags</label>
        <input
          type="text"
          className="w-full p-2 rounded-sm border focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.meta?.tags?.join(", ") || ""}
          onChange={(e) =>
            updateMeta(
              "tags",
              e.target.value.split(",").map((t) => t.trim())
            )
          }
          placeholder="Comma separated tags"
        />
      </div>
    </section>
  );
};

export default MetaInfo;
