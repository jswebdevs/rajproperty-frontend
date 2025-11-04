import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const columns = [
  { key: "sl", label: "SL" },
  { key: "_id", label: "ID" },
  { key: "featuredImage", label: "Featured Image" },
  { key: "owner", label: "Owner" },
  { key: "mobile", label: "Mobile" },
  { key: "mouja", label: "Mouja" },
  { key: "quantity", label: "Quantity" },
  { key: "landSize", label: "Land Size" },
  { key: "pricePerKatha", label: "Price/Katha" },
  { key: "value", label: "Value" },
  { key: "status", label: "Status" },
];

const LandTable = () => {
  const [landsData, setLandsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchText, setSearchText] = useState("");
  const itemsPerPage = 20;

  useEffect(() => {
    fetch("https://backend.rajproperty.site/api/lands")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => setLandsData(data))
      .catch((err) => console.error("Error fetching lands data:", err));
  }, []);

  // Search filtering
  const filteredLands = landsData.filter((land) => {
    if (!searchText) return true;

    return (
      (land.owner?.toLowerCase() || "").includes(searchText.toLowerCase()) ||
      (land.mobile?.toLowerCase() || "").includes(searchText.toLowerCase()) ||
      (land.location?.mouja?.toLowerCase() || "").includes(
        searchText.toLowerCase()
      ) ||
      (land._id?.toLowerCase() || "").includes(searchText.toLowerCase())
    );
  });

  // Sorting logic
  const sortLands = (data) => {
    if (!sortBy) return data;
    return [...data].sort((a, b) => {
      let aValue, bValue;
      switch (sortBy) {
        case "sl":
          return 0;
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
          aValue = a.landDetails?.quantity ?? 0;
          bValue = b.landDetails?.quantity ?? 0;
          break;
        case "landSize":
          aValue = a.landDetails?.landSizeKatha ?? 0;
          bValue = b.landDetails?.landSizeKatha ?? 0;
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

  const sortedLands = sortLands(filteredLands);

  const totalPages = Math.ceil(sortedLands.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = sortedLands.slice(startIndex, startIndex + itemsPerPage);

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
        const res = await fetch(
          `https://backend.rajproperty.site/api/lands/${id}`,
          { method: "DELETE" }
        );
        if (!res.ok) throw new Error("Failed to delete land");
        setLandsData((prev) => prev.filter((land) => land._id !== id));
        Swal.fire("Deleted!", "The land record has been deleted.", "success");
      } catch (err) {
        console.error("Error deleting land:", err);
        Swal.fire("Error", "Failed to delete land. Please try again.", "error");
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
    <div className="px-2 md:px-[5%] overflow-x-auto w-full">
      <div className="flex flex-col md:flex-row justify-between items-center w-full my-2 gap-2">
        <h2 className="h2 dark:text-white ">
          <span className="font-semibold">Total Lands:</span> {filteredLands.length}
        </h2>
        {/* Search Button and input */}
        <div className="flex gap-2 items-center">
          <input
            type="text"
            className="input input-bordered focus:outline-0 focus:ring-accent focus:ring-1"
            placeholder="Search owner, mobile, mouja, ID..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ minWidth: 200 }}
          />
          <button className="btn btn-accent" onClick={() => setCurrentPage(1)}>
            Search
          </button>
        </div>
        <Link className="btn btn-accent" to="/dashboard/addland">
          Add a Land
        </Link>
      </div>

      <div className="w-full rounded-lg border dark:border-gray-700 overflow-x-auto">
        <table className="min-w-[900px] w-full">
          <thead className="bg-green-700 text-white dark:bg-green-800">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="p-1 border dark:border-gray-700 cursor-pointer select-none"
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
              <th className="p-1 border dark:border-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((land, index) => (
              <tr
                key={land._id || index}
                className={
                  (index % 2 === 0
                    ? "bg-white dark:bg-gray-900"
                    : "bg-gray-50 dark:bg-gray-800") + " transition"
                }
              >
                <td className="p-1 border dark:border-gray-700 dark:text-gray-100">
                  {startIndex + index + 1}
                </td>
                <td className="p-1 border dark:border-gray-700 dark:text-gray-100">
                  {land._id}
                </td>
                <td className="p-1 border dark:border-gray-700">
                  {land.media?.featuredImage && (
                    <img
                      src={land.media.featuredImage.thumbUrl}
                      alt="Featured"
                      className="h-12 w-16 object-cover rounded bg-gray-100 dark:bg-gray-700"
                    />
                  )}
                </td>
                <td className="p-1 border dark:border-gray-700 dark:text-gray-100">
                  {land.owner}
                </td>
                <td className="p-1 border dark:border-gray-700 dark:text-gray-100">
                  {land.mobile}
                </td>
                <td className="p-1 border dark:border-gray-700 dark:text-gray-100">
                  {land.location?.mouja}
                </td>
                <td className="p-1 border dark:border-gray-700 dark:text-gray-100">
                  {land.landDetails?.quantity}
                </td>
                <td className="p-1 border dark:border-gray-700 dark:text-gray-100">
                  {land.landDetails?.landSizeKatha} Katha{" "}
                  {land.landDetails?.landSizeChatak} Chatak
                </td>
                <td className="p-1 border dark:border-gray-700 dark:text-gray-100">
                  {land.pricing?.pricePerKatha}
                </td>
                <td className="p-1 border dark:border-gray-700 dark:text-gray-100">
                  {land.pricing?.value}
                </td>
                <td className="p-1 border dark:border-gray-700 dark:text-gray-100">
                  {land.meta?.status}
                </td>
                <td className="p-1 border dark:border-gray-700">
                  <div className="inline-flex join">
                    <Link
                      to={`/dashboard/lands/${land._id}`}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 join-item cursor-pointer transition"
                    >
                      View
                    </Link>
                    <Link
                      to={`/dashboard/lands/update/${land._id}`}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 join-item cursor-pointer transition"
                    >
                      Update
                    </Link>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 join-item cursor-pointer transition"
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

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-2 my-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="px-3 py-1 border rounded bg-accent disabled:opacity-50 cursor-pointer"
        >
          Prev
        </button>
        <span className="dark:text-white">
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

export default LandTable;
