import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MediaUpload = () => {
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState({});
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  // Handle file selection
  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
    setProgress({});
  };

  // Upload files
  const handleUpload = async () => {
    if (files.length === 0) return alert("Select files to upload");

    setUploading(true);
    const formData = new FormData();
    files.forEach((file) => formData.append("media", file));

    try {
      await axios.post(
        "https://rajproperty-backend-1.onrender.com/api/media/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (event) => {
            const percentCompleted = Math.round(
              (event.loaded * 100) / event.total
            );
            setProgress({ overall: percentCompleted });
          },
        }
      );

      // Redirect back to Media Library after upload
      navigate("/dashboard/media");
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed. See console for details.");
      setUploading(false);
    }
  };

  return (
    <div className="px-[5%] py-5 space-y-4">
      <h2 className="text-xl font-bold">Upload Media</h2>

      <input
        type="file"
        multiple
        onChange={handleFileChange}
        className="border p-2 rounded w-full"
      />

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => (
            <div key={index} className="flex justify-between items-center">
              <span>{file.name}</span>
              {uploading && (
                <span className="text-sm text-blue-600">
                  {progress.overall || 0}%
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={uploading}
        className="btn btn-accent"
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
};

export default MediaUpload;
