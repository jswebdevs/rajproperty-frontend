import { useState, memo } from "react";
import Modal from "react-modal";
import MediaLibrary from "../../../components/media/MediaLibrary";

Modal.setAppElement("#root");

const PreviewItem = ({ file, type, onRemove }) => (
  <div className="flex items-center gap-2 border rounded p-2 relative">
    {type === "image" && (
      <div className="w-auto h-24 bg-gray-100 flex items-center justify-center overflow-hidden rounded">
        <img
          src={file.thumbUrl || file.url}
          alt={file.originalName}
          className="object-cover w-full h-full"
        />
      </div>
    )}
    {type === "video" && (
      <div className="w-20 h-14 bg-black text-white flex items-center justify-center text-xs rounded">
        <img src={file.thumbUrl || file.url} alt="" />
      </div>
    )}
    {type === "document" && (
      <div className="w-6 h-6 flex items-center justify-center text-xs rounded">
        <div className="text-2xl">📄</div>
      </div>
    )}
    <span className="text-sm truncate flex-1">{file.originalName}</span>
    <button
      type="button"
      onClick={() => onRemove(file)}
      className="text-red-600 hover:text-red-800 font-bold cursor-pointer"
    >
      ✕
    </button>
  </div>
);

const FlatMediaUpload = ({ formData, handleChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("featured");

  // ✅ Always update inside formData.media
  const handleMediaSelect = (files) => {
    if (!files || files.length === 0) return;

    const media = formData.media || {};

    if (activeSection === "featured") {
      handleChange("media", { featuredImage: files[0] });
    }
    if (activeSection === "photos") {
      handleChange("media", { photos: [...(media.photos || []), ...files] });
    }
    if (activeSection === "videos") {
      handleChange("media", { videos: [...(media.videos || []), ...files] });
    }
    if (activeSection === "docs") {
      handleChange("media", {
        documents: [...(media.documents || []), ...files],
      });
    }
  };

  const handleRemove = (section, file) => {
    const media = formData.media || {};
    handleChange("media", {
      [section]: (media[section] || []).filter((f) => f._id !== file._id),
    });
  };

  const media = formData.media || {};

  return (
    <section className="rounded-lg space-y-6">
      <h3 className="font-semibold mb-4 text-center text-lg">Add Media</h3>

      {/* Featured Image */}
      <div className="flex items-center">
        <label className="w-1/3">Featured Image</label>
        <div className="flex w-full">
          {media.featuredImage ? (
            <PreviewItem
              file={media.featuredImage}
              type="image"
              onRemove={() => handleChange("media", { featuredImage: null })}
              className="h-40"
            />
          ) : (
            <button
              type="button"
              className="w-full border p-2 rounded-sm cursor-pointer"
              onClick={() => {
                setActiveSection("featured");
                setIsOpen(true);
              }}
            >
              Select Featured Image
            </button>
          )}
        </div>
      </div>

      {/* Photos */}
      <div className="flex items-center">
        <label className="w-1/3">Photos</label>
        <div className="flex flex-col w-full">
          {(media.photos || []).length > 0 && (
            <div className="flex mb-2 max-h-28 overflow-y-auto w-full gap-2">
              {media.photos.map((file) => (
                <PreviewItem
                  key={file._id}
                  file={file}
                  type="image"
                  onRemove={() => handleRemove("photos", file)}
                />
              ))}
            </div>
          )}
          <button
            type="button"
            className="border p-2 rounded-sm cursor-pointer w-full"
            onClick={() => {
              setActiveSection("photos");
              setIsOpen(true);
            }}
          >
            {(media.photos || []).length > 0 ? "Add More" : "Choose Photos"}
          </button>
        </div>
      </div>

      {/* Videos */}
      <div className="flex items-center">
        <label className="w-1/3 mt-2">Videos</label>
        <div className="flex flex-col w-full">
          {(media.videos || []).length > 0 && (
            <div className="flex mb-2 max-h-28 overflow-y-auto w-full gap-2">
              {media.videos.map((file) => (
                <PreviewItem
                  key={file._id}
                  file={file}
                  type="video"
                  onRemove={() => handleRemove("videos", file)}
                />
              ))}
            </div>
          )}
          <button
            type="button"
            className="border p-2 rounded-sm cursor-pointer w-full"
            onClick={() => {
              setActiveSection("videos");
              setIsOpen(true);
            }}
          >
            {(media.videos || []).length > 0 ? "Add More" : "Choose Videos"}
          </button>
        </div>
      </div>

      {/* Documents */}
      <div className="flex items-center">
        <label className="w-1/3">Documents</label>
        <div className="flex flex-col w-full">
          {(media.documents || []).length > 0 && (
            <div className="flex mb-2 max-h-28 overflow-y-auto w-full gap-2">
              {media.documents.map((file) => (
                <PreviewItem
                  key={file._id}
                  file={file}
                  type="document"
                  onRemove={() => handleRemove("documents", file)}
                />
              ))}
            </div>
          )}
          <button
            type="button"
            className="border p-2 rounded-sm cursor-pointer w-full"
            onClick={() => {
              setActiveSection("docs");
              setIsOpen(true);
            }}
          >
            {(media.documents || []).length > 0
              ? "Add More"
              : "Choose Documents"}
          </button>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        shouldFocusAfterRender={false}
        style={{
          overlay: { backgroundColor: "rgba(0,0,0,0.6)", zIndex: 1000 },
          content: {
            inset: "5%",
            padding: 0,
            border: "none",
            borderRadius: "0.5rem",
            overflow: "hidden",
          },
        }}
      >
        <div className="bg-base-100 w-full h-full relative">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-3 right-3 text-red-600 hover:text-red-800 text-2xl font-bold z-10 cursor-pointer"
          >
            ✕
          </button>
          <div className="h-full overflow-y-auto p-4">
            <MediaLibrary
              multiple={activeSection !== "featured"}
              onSelect={handleMediaSelect}
              onClose={() => setIsOpen(false)}
            />
          </div>
        </div>
      </Modal>
    </section>
  );
};

export default memo(FlatMediaUpload);
