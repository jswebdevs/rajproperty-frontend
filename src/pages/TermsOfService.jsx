import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Helmet } from "react-helmet";

const sections = [
  {
    title: "Introduction",
    content: `Welcome to Raj Property! These Terms of Service ("Terms") govern your use of our website, services, and tools for buying, selling, and exploring properties. By accessing our website, you agree to these terms in full.`,
  },
  {
    title: "Acceptance of Terms",
    content: `By using Raj Property, you acknowledge and agree to abide by these Terms. If you do not agree, please refrain from using our services.`,
  },
  {
    title: "User Responsibilities",
    content: `You agree to provide accurate information when submitting listings or inquiries. You must use the platform lawfully and respect other users. Account credentials must be kept secure.`,
  },
  {
    title: "Services Provided",
    content: `Raj Property offers services for listing, searching, and contacting sellers or buyers for lands, flats, and houses. Our platform also provides tools like property filters and contact forms.`,
  },
  {
    title: "Content Ownership & Use",
    content: `All content on Raj Property, including text, images, and graphics, is our property. Users retain ownership of their submitted content but grant Raj Property the right to display and use it for service purposes.`,
  },
  {
    title: "Prohibited Activities",
    content: `Users must not post fraudulent listings, spam other users, or engage in any illegal activity on the platform. Violations may result in account suspension or removal.`,
  },
  {
    title: "Limitation of Liability",
    content: `Raj Property is not responsible for inaccuracies in listings, user disputes, or third-party interactions. We provide the platform as-is without warranties.`,
  },
  {
    title: "Termination & Suspension",
    content: `We reserve the right to suspend or terminate accounts that violate these Terms without prior notice.`,
  },
  {
    title: "Governing Law",
    content: `These Terms are governed by the laws of Bangladesh. Any disputes will be resolved in the competent courts of Bangladesh.`,
  },
  {
    title: "Changes to Terms",
    content: `Raj Property may update these Terms periodically. Users are encouraged to review them regularly. Continued use constitutes acceptance of updates.`,
  },
  {
    title: "Contact Information",
    content: `For any questions regarding these Terms, please contact us at [support@rajproperty.com](mailto:support@rajproperty.com) or visit our contact page.`,
  },
];

const TermsOfService = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (index) => {
    setOpenSection(openSection === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 text-gray-200 shadow-lg rounded-lg">
      <Helmet>
        <title>Terms of Service | RajProperty</title>
        <meta
          name="description"
          content="Read the Terms of Service for RajProperty. Understand rules for using Bangladesh's trusted Rajshahi property site, including your rights, responsibilities, and platform conditions."
        />
        <meta
          name="keywords"
          content="terms of service, terms, RajProperty, property website, user agreement, legal, Rajshahi, Bangladesh, real estate, site rules"
        />
        <meta property="og:title" content="Terms of Service - RajProperty" />
        <meta
          property="og:description"
          content="See the updated Terms of Service for RajProperty, including user responsibilities, acceptable use, legal guidelines, and more."
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <h1 className="text-3xl font-bold mb-6 text-center text-green-400">
        Terms of Service
      </h1>
      <p className="mb-6 text-gray-300 text-center">
        Welcome to Raj Property! Please read these Terms carefully as they
        govern your use of our website and services.
      </p>
      {sections.map((section, index) => (
        <div
          key={index}
          className="mb-4 border border-gray-700 rounded-lg overflow-hidden"
        >
          <button
            onClick={() => toggleSection(index)}
            className="w-full px-4 py-3 flex justify-between items-center bg-gray-900 hover:bg-gray-800 font-semibold cursor-pointer transition-colors"
          >
            <span>{section.title}</span>
            {openSection === index ? (
              <ChevronUp className="w-5 h-5 text-green-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-green-400" />
            )}
          </button>
          {openSection === index && (
            <div className="px-4 py-3 text-gray-300 bg-gray-900 border-t border-gray-700">
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

export default TermsOfService;