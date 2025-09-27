import { useEffect, useState } from "react";
import axios from "axios";
import { Trash2 } from "lucide-react";

const MediaLibrary = ({ multiple = true, onSelect, onClose }) => {
  const [media, setMedia] = useState([]);
  const [selectedInternal, setSelectedInternal] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(50);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState("all");
  const totalPages = Math.ceil(total / limit);

  const loadMedia = () => {
    let typeQuery = "";
    if (filter === "photos") typeQuery = "image";
    else if (filter === "videos") typeQuery = "video";
    else if (filter === "documents") typeQuery = "docs";

    axios
      .get(
        `https://rajproperty-backend-1.onrender.com//api/media?page=${page}&limit=${limit}${
          typeQuery ? `&type=${typeQuery}` : ""
        }`
      )
      .then((res) => {
        setMedia(res.data.media || []);
        setTotal(res.data.total || 0);
      })
      .catch((err) => console.error("Error loading media", err));
  };

  useEffect(() => {
    loadMedia();
  }, [page, limit, filter]);

  const toggleSelect = (item) => {
    if (multiple) {
      setSelectedInternal((prev) =>
        prev.find((i) => i._id === item._id)
          ? prev.filter((i) => i._id !== item._id)
          : [...prev, item]
      );
    } else {
      setSelectedInternal([item]);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this media?")) return;
    try {
      await axios.delete(
        `https://rajproperty-backend-1.onrender.com//api/media/${id}`
      );
      setMedia((prev) => prev.filter((item) => item._id !== id));
      setSelectedInternal((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Error deleting media", err);
    }
  };

  return (
    <div className="space-y-4">
      {/* Filter Tabs */}
      <div className="flex space-x-4 mb-4">
        {["all", "photos", "videos", "documents"].map((t) => (
          <button
            key={t}
            onClick={() => {
              setFilter(t);
              setPage(1);
            }}
            className={`btn ${filter === t ? "btn-accent" : "btn-outline"}`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* Selected Preview (inside modal) */}
      {selectedInternal.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {selectedInternal.map((item) => (
            <div
              key={item._id}
              className="flex items-center space-x-2 p-2 border rounded relative"
            >
              {item.mimeType.startsWith("image/") ||
              item.mimeType.startsWith("video/") ? (
                <img
                  src={`https://rajproperty-backend-1.onrender.com${
                    item.thumbUrl || item.url
                  }`}
                  alt={item.originalName}
                  className="w-16 h-16 object-cover rounded"
                />
              ) : (
                <div className="w-16 h-16 flex items-center justify-center bg-gray-200 text-xs text-center">
                  {item.originalName}
                </div>
              )}
              <button
                onClick={() => toggleSelect(item)}
                className="absolute top-0 right-0 text-red-500 font-bold bg-white rounded-full w-5 h-5 flex items-center justify-center"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-5 gap-4">
        {media.map((item) => (
          <div
            key={item._id}
            className={`group relative border rounded-md overflow-hidden cursor-pointer ${
              selectedInternal.find((i) => i._id === item._id)
                ? "ring-4 ring-blue-500"
                : ""
            }`}
          >
            {/* Delete button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(item._id);
              }}
              className="absolute top-2 right-2 hidden group-hover:flex items-center justify-center w-8 h-8 bg-red-600 text-white rounded-full shadow hover:bg-red-700 z-10 cursor-pointer"
            >
              <Trash2 size={16} />
            </button>

            {/* Thumbnail / file preview */}
            <div onClick={() => toggleSelect(item)}>
              {item.mimeType.startsWith("image/") ? (
                <img
                  src={`https://rajproperty-backend-1.onrender.com${
                    item.thumbUrl || item.url
                  }`}
                  alt={item.originalName}
                  className="w-full h-32 object-cover"
                />
              ) : item.mimeType.startsWith("video/") ? (
                <img
                  src={`https://rajproperty-backend-1.onrender.com${item.thumbUrl}`}
                  alt={item.originalName}
                  className="w-full h-32 object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-32 bg-gray-200 text-sm">
                  {item.originalName}
                </div>
              )}
            </div>

            {/* Title */}
            <div className="p-2 text-xs text-center truncate bg-gray-50 text-gray-950">
              {item.originalName}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="btn btn-accent disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {page} of {totalPages || 1}
        </span>
        <button
          onClick={() => setPage((p) => (page < totalPages ? p + 1 : p))}
          disabled={page >= totalPages}
          className="btn btn-accent disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Done button */}
      <div className="mt-4 flex justify-end">
        <button
          onClick={() => {
            if (onSelect) onSelect(selectedInternal);
            if (onClose) onClose();
          }}
          className="btn btn-primary"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default MediaLibrary;
