import { Link } from "react-router-dom";
import logo from "../../assets/img/footerlogo.png";
import { Helmet } from "react-helmet";

// Manually define the arrays for links
const companyLinks = [
  { label: "About Us", to: "/about" },
  { label: "All Properties", to: "/properties" },
  { label: "Featured", to: "/featured" },
  { label: "Latest", to: "/latest" },
  { label: "Contact", to: "/contact" },
];

const legalLinks = [
  { label: "Agreements", to: "/agreements" },
  { label: "Terms of Service", to: "/terms-of-service" },
  { label: "Privacy Policy", to: "/privacy-policy" },
  { label: "Cookie Policy", to: "/cookie-policy" },
  { label: "FAQ", to: "/faq" },
];

const Footer = () => {
  return (
    <div className="bg-[#0b0b0b] text-gray-300 border-t border-gray-800">
      <Helmet>
        <meta
          name="description"
          content="RajProperty – Trusted agency in Rajshahi City for safe property buy, sell, rental, and commercial decisions. All properties, company info, and legal policies."
        />
        <meta
          name="keywords"
          content="RajProperty, real estate, footer, agency, Rajshahi, company info, privacy, legal, terms"
        />
        <meta
          property="og:title"
          content="RajProperty - Trusted Agency in Rajshahi"
        />
        <meta
          property="og:description"
          content="Find property, company info, legal details, and contact RajProperty for expert advice in Rajshahi City, Bangladesh."
        />
      </Helmet>

      {/* Main Footer */}
      <footer className="w-full mx-auto flex flex-col md:flex-row justify-between py-12 px-6 md:px-[5%] gap-10 md:gap-0">
        {/* Left: Logo + Description */}
        <aside className="flex-1 lg:max-w-1/2 pe-12">
          <img src={logo} alt="Raj Property Logo" className="h-12 mb-4 w-32" />
          <p className="leading-relaxed text-gray-400">
            <span className="text-white font-semibold">Raj Property</span>
            <br />
            Where Trust Meets Property.
            <br />
            Find your next home or commercial property in Rajshahi with us. Your
            property decisions should be safe, easy, and reliable.
            <br />
            Contact us for property choices, sales, rentals, or expert advice.
          </p>
        </aside>

        {/* Links Section */}
        <div className="flex flex-1 flex-col sm:flex-row justify-between gap-10 md:gap-16">
          {/* Company Links */}
          <nav className="flex flex-col gap-2">
            <h6 className="text-white font-semibold text-lg mb-3">Company</h6>
            {companyLinks.map((link, i) => (
              <Link
                key={i}
                to={link.to}
                className="hover:text-green-400 transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Legal Links */}
          <nav className="flex flex-col gap-2">
            <h6 className="text-white font-semibold text-lg mb-3">Legal</h6>
            {legalLinks.map((link, i) => (
              <Link
                key={i}
                to={link.to}
                className="hover:text-green-400 transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </footer>

      {/* Bottom Bar */}
      <footer className="bg-[#111] text-gray-400 p-4 border-t border-gray-800">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center text-sm gap-2 md:gap-0">
          <p>© 2020 - {new Date().getFullYear()} — All rights reserved</p>
          <p>
            Designed by{" "}
            <a
              href="http://www.facebook.com/jswebdevs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400 hover:text-green-500 font-medium transition-colors duration-300"
            >
              JS Web Devs
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
