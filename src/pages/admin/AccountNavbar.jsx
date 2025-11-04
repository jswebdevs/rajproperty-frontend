import { NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";

const AccountNavbar = () => {
  const { signOutUser, user } = useContext(AuthContext);

  const [dateTime, setDateTime] = useState(new Date());

  const clearAllCache = () => {
    // Clear service worker cache (if your app registers a SW)
    if ("caches" in window) {
      caches.keys().then((names) => {
        names.forEach((name) => caches.delete(name));
      });
    }
    // Clear localStorage/cache
    localStorage.clear();
    sessionStorage.clear();
    // Inform the user
    alert("Website cache cleared. The page will reload.");
    // Force a hard reload (bypass HTTP cache for most browsers)
    window.location.reload(true);
  };

  useEffect(() => {
    const interval = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedDate = dateTime.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const formattedTime = dateTime.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  // Responsive navbar - links split into 2 rows on mobile (<640px)
  const links = (
    <ul className="flex flex-col md:flex-row justify-center">
      <div className="flex">
        <li className="w-1/3 md:w-auto">
          <NavLink to="/dashboard" className="btn btn-accent w-full sm:w-auto">
            Dahsboard
          </NavLink>
        </li>
        <li className="w-1/3 md:w-auto">
          <NavLink
            to="/dashboard/lands"
            className="btn btn-accent join-item w-full sm:w-auto"
          >
            Lands
          </NavLink>
        </li>
        <li className="w-1/3 md:w-auto">
          <NavLink
            to="/dashboard/flats"
            className="btn btn-accent join-item w-full sm:w-auto"
          >
            Flats
          </NavLink>
        </li>
      </div>
      <div className="flex">
        <li className="w-1/3 md:w-auto">
          <NavLink
            to="/dashboard/houses"
            className="btn btn-accent join-item w-full sm:w-auto"
          >
            Houses
          </NavLink>
        </li>
        <li className="w-1/3 md:w-auto">
          <NavLink
            to="/dashboard/drafts"
            className="btn btn-accent join-item w-full sm:w-auto"
          >
            Drafts
          </NavLink>
        </li>
        <li className="w-1/3 md:w-auto">
          <NavLink
            to="/dashboard/media"
            className="btn btn-accent join-item w-full sm:w-auto"
          >
            Media
          </NavLink>
        </li>
      </div>
    </ul>
  );

  return (
    <div className="px-[5%] my-10 mx-auto lg:flex justify-between items-center gap-2 sm:grid-cols-1">
      {/* Left */}
      <div className="text-center md:text-left font-semibold">
        Welcome to RajProperty,&nbsp;
        {user?.displayName || user?.email}
      </div>
      {/* Center */}
      <div>{links}</div>
      {/* Right */}
      <div className="flex gap-2 items-center justify-between lg:justify-end mt-2 lg:mt-0">
        <div className="whitespace-nowrap">
          <span className="me-1">{formattedTime},</span>
          {formattedDate}
        </div>
        <button
          className="bg-red-500 text-white py-2 px-4 rounded cursor-pointer"
          onClick={clearAllCache}
        >
          Clear Website Cache
        </button>
        <button onClick={signOutUser} className="btn btn-error join-item">
          Logout
        </button>
      </div>
    </div>
  );
};

export default AccountNavbar;
