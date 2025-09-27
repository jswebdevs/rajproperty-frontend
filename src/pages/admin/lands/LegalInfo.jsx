
const LegalInfo = ({ formData, handleChange }) => {
  const legalFields = [
    { label: "CS Mark", key: "csMark" },
    { label: "CS Khatian", key: "csKhatian" },
    { label: "BS Mark", key: "bsMark" },
    { label: "BS Khatian", key: "bsKhatian" },
    { label: "RS Mark", key: "rsMark" },
    { label: "RS Khatian", key: "rsKhatian" },
    { label: "Mutation Status", key: "mutationStatus" },
    { label: "Tax Status", key: "taxStatus" },
    { label: "Dispute Status", key: "disputeStatus" },
  ];

  return (
    <section className="rounded-lg">
      <h3 className="font-semibold mb-4 text-center text-lg">
        Legal Information
      </h3>
      <div className="space-y-3">
        {legalFields.map((field) => (
          <div key={field.key} className="flex items-center">
            <label className="w-1/3">{field.label}</label>
            <input
              type="text"
              value={formData.legal?.[field.key] || ""}
              onChange={(e) =>
                handleChange("legal", {
                  ...formData.legal,
                  [field.key]: e.target.value,
                })
              }
              className="w-full p-2 rounded-sm border focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default LegalInfo;
