import { useState, useEffect } from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";

const LandTable = () => {
  const [landsData, setLandsData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/lands")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => setLandsData(data))
      .catch((err) => console.error("Error fetching lands data:", err));
  }, []);

  // Delete handler with SweetAlert2
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This land record will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:5000/api/lands/${id}`, {
          method: "DELETE",
        });

        if (!res.ok) throw new Error("Failed to delete land");

        // Update local state
        setLandsData((prev) => prev.filter((land) => land._id !== id));

        Swal.fire("Deleted!", "The land record has been deleted.", "success");
      } catch (err) {
        console.error("Error deleting land:", err);
        Swal.fire("Error", "Failed to delete land. Please try again.", "error");
      }
    }
  };

  return (
    <div className="px-[5%] overflow-x-auto">
      <div className="flex justify-between items-center w-full my-2">
        <h2 className="h2">Total Lands: {landsData.length}</h2>
        <Link className="btn btn-accent" to="/dashboard/addland">
          Add a Land
        </Link>
      </div>
      <table className="min-w-full border border-gray-300 rounded-lg">
        <thead className="bg-green-700 text-white">
          <tr>
            <th className="p-1 border">ID</th>
            <th className="p-1 border">Featured Image</th>
            <th className="p-1 border">Owner</th>
            <th className="p-1 border">Mobile</th>
            <th className="p-1 border">Mouja</th>
            <th className="p-1 border">Quantity</th>
            <th className="p-1 border">Land Size</th>
            <th className="p-1 border">Price/Katha</th>
            <th className="p-1 border">Value</th>
            <th className="p-1 border">Status</th>
            <th className="p-1 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {landsData.map((land, index) => (
            <tr key={land._id || index}>
              <td className="p-1 border">{land._id}</td>
              <td className="p-1 border">
                {land.media?.featuredImage && (
                  <img
                    src={land.media.featuredImage.thumbUrl}
                    alt="Featured"
                    className="h-12 w-16 object-cover"
                  />
                )}
              </td>
              <td className="p-1 border">{land.owner}</td>
              <td className="p-1 border">{land.mobile}</td>
              <td className="p-1 border">{land.location?.mouja}</td>
              <td className="p-1 border">{land.landDetails?.quantity}</td>
              <td className="p-1 border">
                {land.landDetails?.landSizeKatha} Katha{" "}
                {land.landDetails?.landSizeChatak} Chatak
              </td>
              <td className="p-1 border">{land.pricing?.pricePerKatha}</td>
              <td className="p-1 border">{land.pricing?.value}</td>
              <td className="p-1 border">{land.meta?.status}</td>
              <td className="p-1 border">
                <div className="inline-flex join">
                  <Link
                    to={`/dashboard/lands/${land._id}`}
                    className="bg-blue-500 text-white px-3 py-1 join-item cursor-pointer"
                  >
                    View
                  </Link>
                  <Link
                    to={`/dashboard/lands/${land._id}/update`}
                    className="bg-green-500 text-white px-3 py-1 join-item cursor-pointer"
                  >
                    Update
                  </Link>
                  <button
                    className="bg-red-500 text-white px-3 py-1 join-item cursor-pointer"
                    onClick={() => handleDelete(land._id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LandTable;
