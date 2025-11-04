import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Drafts = () => {
  const [draftsData, setDraftsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Fetch all drafts
  useEffect(() => {
    fetch("https://backend.rajproperty.site/api/drafts")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => setDraftsData(data))
      .catch((err) => console.error("Error fetching drafts data:", err));
  }, []);

  // Delete property/draft
  const handleDelete = async (id, type = "lands") => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This record will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await fetch(
          `https://backend.rajproperty.site/api/${type}/${id}/delete`,
          { method: "DELETE" }
        );
        if (!res.ok) throw new Error("Failed to delete record");

        setDraftsData((prev) => prev.filter((d) => d._id !== id));
        Swal.fire("Deleted!", "The record has been deleted.", "success");
      } catch (err) {
        console.error("Error deleting record:", err);
        Swal.fire("Error", "Failed to delete. Try again.", "error");
      }
    }
  };

  // // Publish draft (update meta.status to "Published")
  // const handlePublish = async (draft) => {
  //   const confirm = await Swal.fire({
  //     title: "Publish Draft?",
  //     text: "This draft will be published as a property.",
  //     icon: "question",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, publish it!",
  //   });

  //   if (confirm.isConfirmed) {
  //     try {
  //       const updatedDraft = {
  //         ...draft,
  //         meta: { ...draft.meta, status: "Published" },
  //       };

  //       // API call to update the draft
  //       const res = await fetch(
  //         `https://backend.rajproperty.site/api/lands/update/${draft._id}`,
  //         {
  //           method: "PUT",
  //           headers: { "Content-Type": "application/json" },
  //           body: JSON.stringify(updatedDraft),
  //         }
  //       );
  //       if (!res.ok) throw new Error("Failed to publish draft");

  //       // Remove from local draftsData
  //       setDraftsData((prev) => prev.filter((d) => d._id !== draft._id));

  //       Swal.fire(
  //         "Published!",
  //         "Draft has been published successfully.",
  //         "success"
  //       );
  //     } catch (err) {
  //       console.error("Error publishing draft:", err);
  //       Swal.fire("Error", "Failed to publish draft. Try again.", "error");
  //     }
  //   }
  // };

  // Pagination logic
  const totalPages = Math.ceil(draftsData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = draftsData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="px-[5%] overflow-x-auto">
      <div className="flex justify-center items-center w-full my-2">
        <h2 className="text-center text-2xl font-bold">Total Drafts: {draftsData.length}</h2>
      </div>

      <table className="min-w-full border border-gray-300 rounded-lg">
        <thead className="bg-yellow-700 text-white">
          <tr>
            <th className="p-1 border">SL</th>
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
          {currentItems.map((draft, index) => (
            <tr key={draft._id || index}>
              <td className="p-1 border">{startIndex + index + 1}</td>
              <td className="p-1 border">{draft._id}</td>
              <td className="p-1 border">
                {draft.media?.featuredImage && (
                  <img
                    src={draft.media.featuredImage.thumbUrl}
                    alt="Featured"
                    className="h-12 w-16 object-cover"
                  />
                )}
              </td>
              <td className="p-1 border">{draft.owner}</td>
              <td className="p-1 border">{draft.mobile}</td>
              <td className="p-1 border">{draft.location?.mouja}</td>
              <td className="p-1 border">{draft.landDetails?.quantity}</td>
              <td className="p-1 border">
                {draft.landDetails?.landSizeKatha} Katha{" "}
                {draft.landDetails?.landSizeChatak} Chatak
              </td>
              <td className="p-1 border">{draft.pricing?.pricePerKatha}</td>
              <td className="p-1 border">{draft.pricing?.value}</td>
              <td className="p-1 border">{draft.meta?.status}</td>
              <td className="p-1 border">
                <div className="inline-flex join">
                  <Link
                    to={`/dashboard/lands/update/${draft._id}`}
                    className="bg-green-500 text-white px-3 py-1 join-item cursor-pointer"
                  >
                    Edit
                  </Link>
                  {/* <button
                    className="bg-blue-500 text-white px-3 py-1 join-item cursor-pointer"
                    onClick={() => handlePublish(draft)}
                  >
                    Publish
                  </button> */}
                  <button
                    className="bg-red-500 text-white px-3 py-1 join-item cursor-pointer"
                    onClick={() => handleDelete(draft._id, "lands")}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
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

export default Drafts;
