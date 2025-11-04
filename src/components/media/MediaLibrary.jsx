import { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { Trash2, FileText, PlayCircle, Eye, X, Check } from "lucide-react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const MediaLibrary = ({ multiple = true, onSelect, onClose }) => {
  const [media, setMedia] = useState([]);
  const [selectedInternal, setSelectedInternal] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(50);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);
  const [bulkMode, setBulkMode] = useState(false);
  const [viewMedia, setViewMedia] = useState(null);

  const loader = useRef(null);

  useEffect(() => {
    setMedia([]);
    setPage(1);
    setAllLoaded(false);
  }, [filter]);

  const loadMedia = useCallback(async () => {
    if (loading || allLoaded) return;
    setLoading(true);
    try {
      let typeQuery = "";
      if (filter === "photos") typeQuery = "image";
      else if (filter === "videos") typeQuery = "video";
      else if (filter === "documents") typeQuery = "docs";
      const res = await axios.get(
        `https://backend.rajproperty.site/api/media?page=${page}&limit=${limit}${
          typeQuery ? `&type=${typeQuery}` : ""
        }`
      );
      const newMedia = res.data.media || [];
      setMedia((prev) => [
        ...prev,
        ...newMedia.filter((nm) => !prev.find((m) => m._id === nm._id)),
      ]);
      setTotal(res.data.total || 0);
      if (
        !newMedia.length ||
        media.length + newMedia.length >= res.data.total
      ) {
        setAllLoaded(true);
      }
    } catch (err) {
      console.error("Error loading media:", err);
      alert("Failed to load media. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [page, limit, filter, loading, media.length, allLoaded]);

  useEffect(() => {
    loadMedia();
  }, [loadMedia]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && !allLoaded) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );
    if (loader.current) observer.observe(loader.current);
    return () => {
      if (loader.current) observer.unobserve(loader.current);
    };
  }, [loading, allLoaded]);

  // Select logic for uploads/forms
  function handleSelect(item) {
    if (multiple) {
      setSelectedInternal((prev) =>
        prev.find((i) => i._id === item._id)
          ? prev.filter((i) => i._id !== item._id)
          : [...prev, item]
      );
    } else {
      setSelectedInternal([item]);
    }
  }

  // Confirm select (calls parent callback)
  function confirmSelection() {
    if (selectedInternal.length === 0) return;
    if (onSelect) {
      onSelect(multiple ? selectedInternal : [selectedInternal[0]]);
      setSelectedInternal([]);
      if (onClose) onClose();
    }
  }

  // Delete logic (including modal reaction)
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this media?")) return;
    try {
      await axios.delete(`https://backend.rajproperty.site/api/media/${id}`);
      setMedia((prev) => prev.filter((item) => item._id !== id));
      setSelectedInternal((prev) => prev.filter((item) => item._id !== id));
      setViewMedia(null);
    } catch (err) {
      console.error("Error deleting media:", err);
      alert("Failed to delete media. Please try again.");
    }
  };

  // Compute correct image/video/document url
  const getCorrectUrl = (url, folder) => {
    if (!url) return null;
    const fileName = url.split("/").pop();
    if (url.startsWith("/uploads")) return url;
    return `/uploads/${folder}/${fileName}`;
  };

  return (
    <div className="space-y-4">
      {/* Filter + Bulk Select Row */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          {["all", "photos", "videos", "documents"].map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`btn ${filter === t ? "btn-accent" : "btn-outline"}`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {media.map((item) => {
          const isSelected = selectedInternal.find((i) => i._id === item._id);
          const url = getCorrectUrl(item.url, item.folder);
          const thumbUrl = getCorrectUrl(item.thumbUrl, item.folder);

          return (
            <div
              key={item._id}
              className={`group relative border rounded-lg overflow-hidden bg-white shadow-sm cursor-pointer hover:shadow-lg transition-all duration-200 ${
                isSelected ? "ring-4 ring-green-500" : ""
              }`}
              style={{
                minHeight: "180px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
              }}
            >
              {/* Overlay for selection */}
              {isSelected && (
                <div
                  className="absolute inset-0 bg-green-400/30 z-10 pointer-events-none"
                  style={{ borderRadius: "inherit" }}
                ></div>
              )}

              {/* View Button (opens modal, does NOT select) */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setViewMedia(item);
                }}
                className="absolute top-2 right-2 bg-black/70 text-white rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition z-20"
                style={{ fontSize: "0.8rem" }}
              >
                <Eye size={14} className="inline mr-1" />
                View
              </button>
              {/* Select Button */}
              {onSelect && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelect(item);
                  }}
                  className="absolute bottom-2 right-2 bg-green-700 text-white rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition z-20"
                  style={{ fontSize: "0.8rem" }}
                >
                  {isSelected ? (
                    <Check size={14} className="inline mr-1" />
                  ) : null}
                  {multiple ? "Select" : "Pick"}
                </button>
              )}

              {/* Thumbnail */}
              {item.mimeType.startsWith("image/") ? (
                <LazyLoadImage
                  src={
                    thumbUrl
                      ? `https://backend.rajproperty.site${thumbUrl}`
                      : `https://backend.rajproperty.site${url}`
                  }
                  alt={item.originalName}
                  effect="blur"
                  style={{
                    width: "100%",
                    height: "140px",
                    objectFit: "cover",
                    background: "#f7f7f7",
                    borderBottom: "1px solid #eee",
                  }}
                  className="block"
                />
              ) : item.mimeType.startsWith("video/") ? (
                <div className="relative w-full h-[140px] bg-gray-900 flex items-center justify-center">
                  <LazyLoadImage
                    src={
                      thumbUrl
                        ? `https://backend.rajproperty.site${thumbUrl}`
                        : `https://backend.rajproperty.site${url}`
                    }
                    alt={item.originalName}
                    effect="blur"
                    style={{
                      width: "100%",
                      height: "140px",
                      objectFit: "cover",
                      opacity: 0.9,
                    }}
                  />
                  <PlayCircle className="absolute inset-0 m-auto w-12 h-12 text-white opacity-80 pointer-events-none" />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-[140px] text-sm text-center p-2 bg-gray-100">
                  <FileText size={32} />
                  <span className="truncate mt-1 text-xs">
                    {item.originalName}
                  </span>
                </div>
              )}
              {/* Title */}
              <div className="px-2 py-1 text-xs text-center font-medium truncate bg-gray-50 text-gray-900">
                {item.originalName}
              </div>
            </div>
          );
        })}
      </div>

      {/* Loader */}
      <div ref={loader} className="h-16 flex justify-center items-center">
        {loading && !allLoaded && (
          <div className="loader border-t-4 border-blue-500 w-8 h-8 rounded-full animate-spin"></div>
        )}
        {!loading && allLoaded && media.length === 0 && (
          <span className="text-gray-500">No media found</span>
        )}
      </div>

      {/* Modal: view image/video/document, delete, close */}
      {viewMedia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="relative bg-white rounded-lg max-w-3xl w-full max-h-[90vh] p-4 flex flex-col items-center">
            {/* Delete Button */}
            <button
              onClick={() => handleDelete(viewMedia._id)}
              className="absolute top-3 right-3 text-red-800 rounded-full bg-white shadow p-1 cursor-pointer hover:bg-red hover:text-white border"
              style={{ zIndex: 2 }}
              title="Delete image"
            >
              <Trash2 size={24} />
            </button>
            {/* Close Button (X) */}
            <button
              onClick={() => setViewMedia(null)}
              className="absolute top-3 left-3 text-gray-700 hover:text-black rounded-full bg-white shadow p-1 cursor-pointer"
              style={{ zIndex: 2 }}
              title="Close"
            >
              <X size={24} />
            </button>
            {/* Full Preview */}
            {viewMedia.mimeType.startsWith("image/") ? (
              <img
                src={`${viewMedia.url}`}
                alt={viewMedia.originalName}
                className="w-full h-auto max-h-[70vh] object-contain rounded"
                style={{
                  background: "#eee",
                  marginTop: "2rem",
                  marginBottom: "2rem",
                }}
              />
            ) : viewMedia.mimeType.startsWith("video/") ? (
              <video
                src={`${viewMedia.url}`}
                controls
                className="w-full h-auto max-h-[70vh] object-contain rounded"
                style={{
                  background: "#222",
                  marginTop: "2rem",
                  marginBottom: "2rem",
                }}
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-[60vh] w-full">
                <FileText size={60} className="mb-4 text-gray-500" />
                <span className="text-lg font-semibold">
                  {viewMedia.originalName}
                </span>
                <span style={{ wordBreak: "break-all", color: "#666" }}>
                  {viewMedia.mimeType}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="absolute bottom-4 right-4">
        {onSelect && (
          <button
            className={`btn btn-success btn-sm ${
              selectedInternal.length === 0 && "opacity-70 cursor-not-allowed"
            }`}
            onClick={confirmSelection}
            disabled={selectedInternal.length === 0}
          >
            <Check size={16} className="mr-1" /> Select{" "}
            {multiple ? "Files" : "File"}
          </button>
        )}
      </div>
    </div>
  );
};

export default MediaLibrary;
