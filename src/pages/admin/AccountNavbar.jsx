import { NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";

const AccountNavbar = () => {
  const { signOutUser, user } = useContext(AuthContext);

  const [dateTime, setDateTime] = useState(new Date());

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

  const links = (
    <ul className="join flex flex-wrap justify-center">
      <li>
        <NavLink to="/dashboard/lands" className="btn btn-accent join-item">
          Lands
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/flats" className="btn btn-accent join-item">
          Flats
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/houses"
          className="btn btn-accent join-item"
        >
          Houses
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/media" className="btn btn-accent join-item">
          Media
        </NavLink>
      </li>

    </ul>
  );

  return (
    <div className="px-[5%] my-10 mx-auto lg:flex justify-between items-center gap-2 sm:grid-cols-1">
      {/* Left */}
      <div className="text-left sm:text-center font-semibold">
        Welcome to RajProperty,&nbsp;
        {user?.displayName || user?.email}
      </div>

      {/* Center */}
      <div>{links}</div>

      {/* Right */}
      <div className="flex gap-2 items-center">
        <div>
          <span className="me-1">{formattedTime},</span>
          {formattedDate}
        </div>

        <button onClick={signOutUser} className="btn btn-accent join-item ">
          Logout
        </button>
      </div>
    </div>
  );
};

export default AccountNavbar;
