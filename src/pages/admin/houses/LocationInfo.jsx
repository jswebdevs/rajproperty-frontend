import { useState, useEffect } from "react";

const LocationInfo = ({ formData, handleChange }) => {
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/areas.json")
      .then((res) => res.json())
      .then((data) => {
        setAreas(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load areas.json:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading areas...</p>;

  return (
    <section>
      <h3 className="font-semibold mb-2 text-center">Land's Location</h3>
      <div className="space-y-2">
        {/* District (fixed) */}
        <div className="flex items-center">
          <label className="w-1/3">District</label>
          <input
            type="text"
            value="Rajshahi"
            disabled
            className="w-full border p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Upazilla */}
        <div className="flex items-center">
          <label className="w-1/3">Upazilla</label>
          <select
            value={formData.location?.upazila || ""}
            onChange={(e) =>
              handleChange("location", {
                ...formData.location,
                upazila: e.target.value,
                mouja: "", // reset mouja when upazilla changes
              })
            }
            className="w-full border p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" className="bg-base-100">
              --Select Upazilla--
            </option>
            {areas.map((a) => (
              <option key={a.id} value={a.upazilla} className="bg-base-100">
                {a.upazilla}
              </option>
            ))}
          </select>
        </div>

        {/* Mouja */}
        {formData.location?.upazila && (
          <div className="flex items-center w-full">
            <label className="w-1/3">Mouja</label>
            <select
              value={formData.location.mouja || ""}
              onChange={(e) =>
                handleChange("location", {
                  ...formData.location,
                  mouja: e.target.value,
                })
              }
              className="border p-2 rounded-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" className="bg-base-100 w-1/2">
                --Select Mouja--
              </option>
              {[
                ...new Set(
                  areas.find((a) => a.upazilla === formData.location.upazila)
                    ?.mouja || []
                ),
              ].map((m) => (
                <option key={m} value={m} className="bg-base-100 w-1/2">
                  {m}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Area */}
        <div className="flex items-center">
          <label className="w-1/3">Area</label>
          <input
            type="text"
            value={formData.location?.area || ""}
            onChange={(e) =>
              handleChange("location", {
                ...formData.location,
                area: e.target.value,
              })
            }
            className="w-full border p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* GPS */}
        <div className="flex items-center">
          <label className="w-1/3">GPS Coordinates</label>
          <input
            type="text"
            value={formData.location?.gpsCoordinates || ""}
            onChange={(e) =>
              handleChange("location", {
                ...formData.location,
                gpsCoordinates: e.target.value,
              })
            }
            className="w-full border p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Google Map Link */}
        <div className="flex items-center">
          <label className="w-1/3">Google Map Link</label>
          <input
            type="text"
            value={formData.location?.googleMapLink || ""}
            onChange={(e) =>
              handleChange("location", {
                ...formData.location,
                googleMapLink: e.target.value,
              })
            }
            className="w-full border p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Landmark */}
        <div className="flex items-center mt-5">
          <label className="mb-1 font-medium w-1/3">Landmarks Nearby</label>
          <div className="flex flex-wrap overflow-y-auto gap-2 text-gray-200 w-full">
            {[
              "School",
              "Hospital",
              "Market",
              "Mosque",
              "River",
              "Park",
              "Bus Stop",
              "Temple",
              "Mall",
              "Police Station",
            ].map((landmark) => (
              <label key={landmark} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  value={landmark}
                  checked={formData.location?.landMarkNearby?.includes(
                    landmark
                  )}
                  onChange={(e) => {
                    let selected = formData.location.landMarkNearby || [];
                    if (e.target.checked) {
                      selected = [...selected, landmark];
                    } else {
                      selected = selected.filter((l) => l !== landmark);
                    }
                    handleChange("location", {
                      ...formData.location,
                      landMarkNearby: selected,
                    });
                  }}
                  className="accent-blue-500"
                />
                {landmark}
              </label>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationInfo;
