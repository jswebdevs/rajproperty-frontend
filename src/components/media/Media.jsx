import { useNavigate } from "react-router-dom";
import MediaLibrary from "./MediaLibrary";
import { Helmet } from "react-helmet";

const Media = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Media Library | RajProperty Dashboard</title>
        <meta
          name="description"
          content="View, manage, and upload property images and media for RajProperty in Rajshahi City. Your media hub for marketing and listings."
        />
        <meta
          name="keywords"
          content="media library, upload, photos, property, dashboard, RajProperty, Rajshahi, Bangladesh, admin, real estate"
        />
        <meta property="og:title" content="RajProperty Media Library" />
        <meta
          property="og:description"
          content="Manage and upload real estate media for properties in Rajshahi City. RajProperty dashboard access."
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="px-[5%] py-5">
        <div className="flex justify-between items-center mb-4">
          <h2
            className="text-xl font-bold cursor-pointer hover:text-green-600 transition"
            onClick={() => navigate("/dashboard/media")}
          >
            Media Library
          </h2>
          <button
            className="btn btn-accent"
            onClick={() => navigate("/dashboard/media/upload")}
          >
            Upload Media
          </button>
        </div>
        <MediaLibrary />
      </div>
    </>
  );
};

export default Media;
