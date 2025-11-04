import { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import { Helmet } from "react-helmet";
import AuthContext from "../../context/AuthContext";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const { user } = useContext(AuthContext);
  const location = useLocation();

  // Auto-close drawer when location changes (route changes)
  useEffect(() => {
    const drawer = document.getElementById("my-drawer-3");
    if (drawer) drawer.checked = false;
  }, [location]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handler for mobile menu links
  const handleMenuClick = () => {
    const drawer = document.getElementById("my-drawer-3");
    if (drawer) drawer.checked = false;
  };

  // In Header.js, add this handler:
  const handleLogoClick = () => {
    const drawer = document.getElementById("my-drawer-3");
    if (drawer) drawer.checked = false;
    window.scrollTo({ top: 0, behavior: "smooth" }); // instant scroll-top on logo click
  };


  const gradientButton =
      "text-white px-4 py-2 rounded-lg transition-all duration-200 bg-gradient-to-r from-emerald-500 via-blue-500 to-indigo-600 hover:from-emerald-700 hover:to-indigo-800 shadow-sm hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500";



  const links = (
    <>
      <li className="font-semibold">
        <Link to="/" className={gradientButton} onClick={handleMenuClick}>
          Home
        </Link>
      </li>
      <li className="font-semibold">
        <Link to="/about" className={gradientButton} onClick={handleMenuClick}>
          About
        </Link>
      </li>
      <li className="relative group font-semibold">
        <Link
          to="/properties"
          className={gradientButton}
          onClick={handleMenuClick}
        >
          Properties
        </Link>
        <ul className="absolute left-[-20px] top-full hidden w-40 bg-white shadow-lg rounded-lg group-hover:block z-50 p-0">
          <li>
            <Link
              to="/lands"
              className={gradientButton + " hover:bg-green-100 py-2 px-3 rounded"}
              onClick={handleMenuClick}
            >
              Lands
            </Link>
          </li>
          <li>
            <Link
              to="/flats"
              className={gradientButton + " hover:bg-green-100 py-2 px-3 rounded"}
              onClick={handleMenuClick}
            >
              Flats
            </Link>
          </li>
          <li>
            <Link
              to="/houses"
              className={gradientButton + " hover:bg-green-100 py-2 px-3 rounded"}
              onClick={handleMenuClick}
            >
              Houses
            </Link>
          </li>
        </ul>
      </li>
      <li className="font-semibold">
        <Link to="/services" className={gradientButton} onClick={handleMenuClick}>
          Services
        </Link>
      </li>
      <li className="font-semibold">
        <Link to="/contact" className={gradientButton} onClick={handleMenuClick}>
          Contact Us
        </Link>
      </li>
      <li className="font-semibold">
        {user && (
          <Link
            to={`/dashboard/`}
            className={gradientButton}
            onClick={handleMenuClick}
          >
            Dashboard
          </Link>
        )}
      </li>
    </>
  );


  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="RajProperty site navigation – access Home, About, Properties, Services, and Contact information. Discover lands, flats, and houses in Rajshahi City."
        />
        <meta
          name="keywords"
          content="header, nav, RajProperty, properties, lands, flats, houses, Rajshahi, services, contact, buy, sell"
        />
      </Helmet>
      <header
        className="sticky top-0 z-50 transition-all duration-500 bg-gradient-to-r from-white/80 via-blue-100/80 to-emerald-100/80 backdrop-blur-lg 
    shadow-none border-b border-gray-200"
        id="header"
      >
        <div className="px-[5%]">
          <div className="drawer">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
              {/* Navbar */}
              <div className="navbar w-full py-4">
                <div className="flex-1">
                  <Link to="/" onClick={handleLogoClick}>
                    <img src={logo} alt="Logo" className="h-16 w-43" />
                  </Link>
                </div>
                <div className="flex-none lg:hidden">
                  <label
                    htmlFor="my-drawer-3"
                    aria-label="open sidebar"
                    className="cursor-pointer inline-flex items-center justify-center bg-gradient-to-r from-emerald-400 via-blue-500 to-indigo-600 text-white hover:from-pink-500 hover:to-yellow-500 shadow-md rounded-sm p-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="inline-block h-6 w-6 stroke-current"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                      ></path>
                    </svg>
                  </label>
                </div>
                <div className="hidden flex-none lg:block">
                  <ul className="menu menu-horizontal gap-2">{links}</ul>
                </div>
              </div>
            </div>
            {/* Sidebar menu (mobile) */}
            <div className="drawer-side">
              <label
                htmlFor="my-drawer-3"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <div className="relative w-70 min-h-full bg-white flex flex-col py-8 gap-4">
                {/* Mobile Close Button (top right) */}
                <label
                  htmlFor="my-drawer-3"
                  aria-label="close sidebar"
                  className="absolute right-0 top-0 cursor-pointer z-50 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white hover:from-indigo-500 hover:to-emerald-400 shadow-lg rounded-sm p-2 text-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  style={{ lineHeight: 1, fontSize: "1.5rem" }}
                >
                  ✕
                </label>
                <Link
                  to="/"
                  className="mb-4 flex justify-center"
                  onClick={handleMenuClick}
                >
                  <img src={logo} alt="Logo" className="h-16" />
                </Link>
                <ul className="menu gap-3 px-4 pt-20">{links}</ul>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
