import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Helmet } from "react-helmet";

const sections = [
  {
    title: "Introduction",
    content: `At Raj Property, we value your privacy. This Privacy Policy explains how we collect, use, and protect your personal information when you use our website and services.`,
  },
  {
    title: "Information We Collect",
    content: `We may collect personal information such as your name, phone number, email address, and property preferences. We also collect technical data such as IP address, browser type, and usage patterns.`,
  },
  {
    title: "How We Use Your Information",
    content: `Your information is used to provide and improve our services, respond to inquiries, send notifications, and offer personalized property recommendations.`,
  },
  {
    title: "Data Sharing",
    content: `We do not sell your personal information. We may share information with third-party service providers for processing purposes, such as hosting, analytics, or email communication.`,
  },
  {
    title: "Cookies and Tracking",
    content: `Raj Property uses cookies and similar technologies to enhance your experience, track usage, and analyze site performance. You can manage cookie preferences in your browser.`,
  },
  {
    title: "Data Security",
    content: `We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.`,
  },
  {
    title: "Your Rights",
    content: `You can access, update, or request deletion of your personal data. You can also opt out of marketing communications at any time by contacting us.`,
  },
  {
    title: "Third-Party Links",
    content: `Our website may contain links to third-party websites. We are not responsible for the privacy practices of external websites and encourage you to read their policies.`,
  },
  {
    title: "Children's Privacy",
    content: `Our services are not directed at children under 13. We do not knowingly collect personal information from children.`,
  },
  {
    title: "Policy Changes",
    content: `We may update this Privacy Policy periodically. Changes will be posted on this page with an updated effective date. Continued use of our services indicates acceptance of updates.`,
  },
  {
    title: "Contact Us",
    content: `If you have questions about this Privacy Policy, please contact us at [support@rajproperty.com](mailto:support@rajproperty.com) or use our contact page.`,
  },
];

const PrivacyPolicy = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (index) => {
    setOpenSection(openSection === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 text-gray-200 shadow-xl rounded-xl mt-10">
      <Helmet>
        <title>Privacy Policy | RajProperty</title>
        <meta
          name="description"
          content="Read RajProperty's Privacy Policy. Learn how we collect, store, use, and protect your information while browsing and using our real estate website and services in Rajshahi City, Bangladesh."
        />
        <meta
          name="keywords"
          content="privacy policy, RajProperty, data protection, user data, real estate, Rajshahi, Bangladesh, personal information, cookies, user rights"
        />
        <meta property="og:title" content="Privacy Policy - RajProperty" />
        <meta
          property="og:description"
          content="See how RajProperty collects and protects your information for property browsing, buying and selling. Your privacy is our priority."
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <h1 className="text-4xl font-extrabold mb-6 text-center text-green-400">
        Privacy Policy
      </h1>
      <p className="mb-8 text-gray-300 text-center">
        Your privacy matters to us. Read carefully to understand how we collect,
        use, and protect your information.
      </p>
      {sections.map((section, index) => (
        <div
          key={index}
          className="mb-4 border border-gray-700 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
        >
          <button
            onClick={() => toggleSection(index)}
            className="w-full px-5 py-4 text-left flex justify-between items-center bg-gray-800 hover:bg-gray-700 font-semibold cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          >
            <span className="text-lg">{section.title}</span>
            {openSection === index ? (
              <ChevronUp className="w-6 h-6 text-green-400" />
            ) : (
              <ChevronDown className="w-6 h-6 text-green-400" />
            )}
          </button>
          {openSection === index && (
            <div className="px-5 py-4 text-gray-300 bg-gray-900 border-t border-gray-700 animate-slideDown">
              {section.content.split("\n").map((line, i) => (
                <p key={i} className="mb-3 leading-relaxed">
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

export default PrivacyPolicy;
