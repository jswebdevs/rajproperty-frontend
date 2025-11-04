import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Helmet } from "react-helmet";

const sections = [
  {
    title: "What Are Cookies?",
    content: `Cookies are small text files stored on your device by your web browser. They help websites remember your preferences, login information, and activity for a better user experience.`,
  },
  {
    title: "Types of Cookies We Use",
    content: `1. Necessary Cookies: Required for basic website functionality.
2. Performance Cookies: Help us analyze website usage and improve performance.
3. Functional Cookies: Remember your preferences and provide enhanced features.
4. Advertising Cookies: Used to deliver relevant ads and track ad performance.`,
  },
  {
    title: "How We Use Cookies",
    content: `We use cookies to enhance your browsing experience, analyze traffic, remember preferences, and provide personalized content. Cookies help us improve our services and offer relevant property listings.`,
  },
  {
    title: "Third-Party Cookies",
    content: `We may allow third-party services like analytics, social media, or advertising platforms to place cookies on your browser. We are not responsible for their practices.`,
  },
  {
    title: "Managing Cookies",
    content: `You can choose to accept or reject cookies by adjusting your browser settings. However, disabling some cookies may affect website functionality or limit certain features.`,
  },
  {
    title: "Policy Updates",
    content: `We may update our Cookie Policy from time to time. Updated versions will be posted on this page with an effective date.`,
  },
  {
    title: "Contact Us",
    content: `For questions or concerns about our use of cookies, please contact us at [support@rajproperty.com](mailto:support@rajproperty.com) or via our contact page.`,
  },
];

const CookiePolicy = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (index) => {
    setOpenSection(openSection === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 text-gray-200 shadow-xl rounded-xl">
      <Helmet>
        <title>Cookie Policy | RajProperty</title>
        <meta
          name="description"
          content="Read how RajProperty uses cookies for user experience, site performance, advertising and personalization. Learn about your cookie choices and our privacy practices."
        />
        <meta
          name="keywords"
          content="cookie policy, cookies, privacy, RajProperty, property website, user experience, analytics, advertising, settings, Bangladesh"
        />
        <meta property="og:title" content="Cookie Policy - RajProperty" />
        <meta
          property="og:description"
          content="See RajProperty's cookie usage, management, and privacy details for property browsing in Rajshahi City, Bangladesh."
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <h1 className="text-3xl font-bold mb-6 text-center text-purple-400">
        Cookie Policy
      </h1>
      <p className="mb-6 text-gray-300 text-center">
        This Cookie Policy explains how Raj Property uses cookies and similar
        technologies to enhance your experience.
      </p>
      {sections.map((section, index) => (
        <div
          key={index}
          className="mb-4 border border-gray-700 rounded-lg overflow-hidden"
        >
          <button
            onClick={() => toggleSection(index)}
            className="w-full px-4 py-3 text-left flex justify-between items-center bg-gray-800 hover:bg-gray-700 font-semibold cursor-pointer transition-colors"
          >
            {section.title}
            {openSection === index ? (
              <ChevronUp className="w-5 h-5 text-purple-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-purple-400" />
            )}
          </button>
          {openSection === index && (
            <div className="px-4 py-3 text-gray-300 bg-gray-800 border-t border-gray-700">
              {section.content.split("\n").map((line, i) => (
                <p key={i} className="mb-2">
                  {line}
                </p>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CookiePolicy;
