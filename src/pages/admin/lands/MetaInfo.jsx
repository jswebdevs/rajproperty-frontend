import React, { useContext, useEffect } from "react";
import AuthContext from "../../../context/AuthContext"; // adjust path if needed

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
          <option value="Published" className="bg-base-100">Published</option>
          <option value="Draft" className="bg-base-100">Draft</option>
        </select>
      </div>

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
