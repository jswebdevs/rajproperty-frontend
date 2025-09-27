import { useState, useEffect } from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";

const FlatTable = () => {
  const [flatsData, setFlatsData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/flats")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => setFlatsData(data))
      .catch((err) => console.error("Error fetching flats data:", err));
  }, []);

  // Delete handler with SweetAlert2
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This flat record will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:5000/api/flats/${id}`, {
          method: "DELETE",
        });

        if (!res.ok) throw new Error("Failed to delete flat");

        // Update local state
        setFlatsData((prev) => prev.filter((flat) => flat._id !== id));

        Swal.fire("Deleted!", "The flat record has been deleted.", "success");
      } catch (err) {
        console.error("Error deleting flat:", err);
        Swal.fire("Error", "Failed to delete flat. Please try again.", "error");
      }
    }
  };

  return (
    <div className="px-[5%] overflow-x-auto">
      <div className="flex justify-between items-center w-full my-2">
        <h2 className="h2">Total Flats: {flatsData.length}</h2>
        <Link className="btn btn-accent" to="/dashboard/addflat">
          Add a Flat
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
            <th className="p-1 border">Flat Size</th>
            <th className="p-1 border">Price/Katha</th>
            <th className="p-1 border">Value</th>
            <th className="p-1 border">Status</th>
            <th className="p-1 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {flatsData.map((flat, index) => (
            <tr key={flat._id || index}>
              <td className="p-1 border">{flat._id}</td>
              <td className="p-1 border">
                {flat.media?.featuredImage && (
                  <img
                    src={flat.media.featuredImage.thumbUrl}
                    alt="Featured"
                    className="h-12 w-16 object-cover"
                  />
                )}
              </td>
              <td className="p-1 border">{flat.owner}</td>
              <td className="p-1 border">{flat.mobile}</td>
              <td className="p-1 border">{flat.location?.mouja}</td>
              <td className="p-1 border">{flat.flatDetails?.quantity}</td>
              <td className="p-1 border">
                {flat.flatDetails?.flatSizeKatha} Katha{" "}
                {flat.flatDetails?.flatSizeChatak} Chatak
              </td>
              <td className="p-1 border">{flat.pricing?.pricePerKatha}</td>
              <td className="p-1 border">{flat.pricing?.value}</td>
              <td className="p-1 border">{flat.meta?.status}</td>
              <td className="p-1 border">
                <div className="inline-flex join">
                  <Link
                    to={`/dashboard/flats/${flat._id}`}
                    className="bg-blue-500 text-white px-3 py-1 join-item cursor-pointer"
                  >
                    View
                  </Link>
                  <Link
                    to={`/dashboard/flats/${flat._id}/update`}
                    className="bg-green-500 text-white px-3 py-1 join-item cursor-pointer"
                  >
                    Update
                  </Link>
                  <button
                    className="bg-red-500 text-white px-3 py-1 join-item cursor-pointer"
                    onClick={() => handleDelete(flat._id)}
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

export default FlatTable;
