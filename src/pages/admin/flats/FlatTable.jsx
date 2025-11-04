import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const columns = [
  { key: "_id", label: "ID" },
  { key: "featuredImage", label: "Featured Image" },
  { key: "owner", label: "Owner" },
  { key: "mobile", label: "Mobile" },
  { key: "mouja", label: "Mouja" },
  { key: "quantity", label: "Quantity" },
  { key: "flatSize", label: "Flat Size" },
  { key: "pricePerKatha", label: "Price/Katha" },
  { key: "value", label: "Value" },
  { key: "status", label: "Status" },
];

const FlatTable = () => {
  const [flatsData, setFlatsData] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    fetch("https://backend.rajproperty.site/api/flats")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => setFlatsData(data))
      .catch((err) => console.error("Error fetching flats data:", err));
  }, []);

  // Filtering
  const filteredFlats = flatsData.filter((flat) => {
    if (!searchText) return true;
    return (
      (flat.owner?.toLowerCase() || "").includes(searchText.toLowerCase()) ||
      (flat.mobile?.toLowerCase() || "").includes(searchText.toLowerCase()) ||
      (flat.location?.mouja?.toLowerCase() || "").includes(
        searchText.toLowerCase()
      ) ||
      (flat._id?.toLowerCase() || "").includes(searchText.toLowerCase())
    );
  });

  // Sorting
  const sortFlats = (data) => {
    if (!sortBy) return data;
    return [...data].sort((a, b) => {
      let aValue, bValue;
      switch (sortBy) {
        case "_id":
          aValue = a._id;
          bValue = b._id;
          break;
        case "featuredImage":
          aValue = a.media?.featuredImage?.thumbUrl ?? "";
          bValue = b.media?.featuredImage?.thumbUrl ?? "";
          break;
        case "owner":
          aValue = a.owner ?? "";
          bValue = b.owner ?? "";
          break;
        case "mobile":
          aValue = a.mobile ?? "";
          bValue = b.mobile ?? "";
          break;
        case "mouja":
          aValue = a.location?.mouja ?? "";
          bValue = b.location?.mouja ?? "";
          break;
        case "quantity":
          aValue = a.flatDetails?.quantity ?? 0;
          bValue = b.flatDetails?.quantity ?? 0;
          break;
        case "flatSize":
          aValue = a.flatDetails?.flatSizeKatha ?? 0;
          bValue = b.flatDetails?.flatSizeKatha ?? 0;
          break;
        case "pricePerKatha":
          aValue = a.pricing?.pricePerKatha ?? 0;
          bValue = b.pricing?.pricePerKatha ?? 0;
          break;
        case "value":
          aValue = a.pricing?.value ?? 0;
          bValue = b.pricing?.value ?? 0;
          break;
        case "status":
          aValue = a.meta?.status ?? "";
          bValue = b.meta?.status ?? "";
          break;
        default:
          return 0;
      }
      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
      }
      return sortOrder === "asc"
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });
  };

  const sortedFlats = sortFlats(filteredFlats);

  const totalPages = Math.ceil(sortedFlats.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = sortedFlats.slice(startIndex, startIndex + itemsPerPage);

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
        const res = await fetch(
          `https://backend.rajproperty.site/api/flats/${id}`,
          { method: "DELETE" }
        );
        if (!res.ok) throw new Error("Failed to delete flat");
        setFlatsData((prev) => prev.filter((flat) => flat._id !== id));
        Swal.fire("Deleted!", "The flat record has been deleted.", "success");
      } catch (err) {
        console.error("Error deleting flat:", err);
        Swal.fire("Error", "Failed to delete flat. Please try again.", "error");
      }
    }
  };

  const handleSort = (key) => {
    if (sortBy === key) {
      setSortOrder((o) => (o === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(key);
      setSortOrder("asc");
    }
  };

  return (
    <div className="px-[5%] overflow-x-auto w-full">
      <div className="flex flex-col md:flex-row justify-between items-center w-full my-2 gap-2">
        <h2 className="h2">Total Flats: {filteredFlats.length}</h2>
        <div className="flex gap-2 items-center">
          <input
            type="text"
            className="input focus:outline-0 focus:ring-accent focus:ring-1"
            placeholder="Search owner, mobile, mouja, ID..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ minWidth: 200 }}
          />
          <button className="btn btn-accent" onClick={() => setCurrentPage(1)}>
            Search
          </button>
        </div>
        <Link className="btn btn-accent" to="/dashboard/addflat">
          Add a Flat
        </Link>
      </div>
      <div className="w-full rounded-lg border border-gray-300 overflow-x-auto">
        <table className="min-w-[900px] w-full">
          <thead className="bg-green-700 text-white">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="p-1 border cursor-pointer select-none"
                  onClick={() => handleSort(col.key)}
                >
                  {col.label}
                  {sortBy === col.key
                    ? sortOrder === "asc"
                      ? " ▲"
                      : " ▼"
                    : null}
                </th>
              ))}
              <th className="p-1 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((flat, index) => (
              <tr key={flat._id || index}>
                <td className="p-1 border">{flat._id}</td>
                <td className="p-1 border">
                  {flat.media?.featuredImage && (
                    <img
                      src={flat.media.featuredImage.thumbUrl}
                      alt="Featured"
                      className="h-12 w-16 object-cover rounded bg-gray-100 dark:bg-gray-700"
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
                      className="bg-blue-500 text-white px-3 py-1 join-item cursor-pointer transition"
                    >
                      View
                    </Link>
                    <Link
                      to={`/dashboard/flats/update/${flat._id}`}
                      className="bg-green-500 text-white px-3 py-1 join-item cursor-pointer transition"
                    >
                      Update
                    </Link>
                    <button
                      className="bg-red-500 text-white px-3 py-1 join-item cursor-pointer transition"
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
      <div className="flex justify-center items-center gap-2 my-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="px-3 py-1 border rounded bg-accent disabled:opacity-50 cursor-pointer"
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="px-3 py-1 border rounded bg-accent disabled:opacity-50 cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default FlatTable;
