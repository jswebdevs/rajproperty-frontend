"use client";

import { useState, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { Helmet } from "react-helmet";

const faqs = [
  {
    question: "How can I list my property on Raj Property?",
    answer:
      "To list your property, you need to register as a seller. Once registered, you can submit property details, including location, type, and pricing, via the contact form or your dashboard.",
  },
  {
    question: "Is there any fee to list a property?",
    answer:
      "Currently, listing properties is free. If we introduce premium listings or featured placement, the details and fees will be clearly stated.",
  },
  {
    question: "How do I contact a property owner?",
    answer:
      "You can contact a property owner directly via the contact details provided in the property listing or by submitting a message through the Raj Property contact form.",
  },
  {
    question: "Can I search for properties by location?",
    answer:
      "Yes! You can filter properties by location, type (land, flat, house), price range, and other features to find the perfect match.",
  },
  {
    question: "How secure is my personal information?",
    answer:
      "We take your privacy seriously. All personal information is protected as per our Privacy Policy, and we never share your data without consent.",
  },
  {
    question: "Can I remove my property listing?",
    answer:
      "Yes, registered sellers can remove or update their listings anytime via the dashboard. If you face any issues, contact our support team for assistance.",
  },
  {
    question: "What if I encounter a problem with a property listing?",
    answer:
      "If you notice an error or suspicious listing, please report it immediately via our contact page. We review all reports and take appropriate action.",
  },
  // NEW FAQS BELOW
  {
    question: "How do I know if a property is available?",
    answer:
      "Current availability is shown on each property listing. We update listings regularly to reflect sold and available properties.",
  },
  {
    question: "Can buyers and sellers communicate directly?",
    answer:
      "Yes, our platform provides direct messaging and contact information so buyers and sellers can communicate securely.",
  },
  {
    question: "Are there hidden charges for transactions?",
    answer:
      "All charges and commissions are clearly shown in our Agreements and Fees section. We have no hidden charges—full transparency is our policy.",
  },
  {
    question: "Is there customer support if I need help?",
    answer:
      "Yes, you can reach our support team anytime via the Contact Us page, WhatsApp, email, or phone.",
  },
  {
    question: "How do I edit my account or profile details?",
    answer:
      "Login to your dashboard and use the account settings to update your profile, email, password or other information.",
  },
  {
    question: "What property types are listed on Raj Property?",
    answer:
      "Raj Property offers listings for lands, flats, and houses across Rajshahi City, covering both residential and commercial opportunities.",
  },
  {
    question: "How do I schedule a property visit?",
    answer:
      "You can request a viewing or site visit by contacting our agent listed on the property page, or submit your preferred schedule in the contact form.",
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const contentRefs = useRef([]);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-black text-gray-200 shadow-lg rounded-lg">
      <Helmet>
        <title>FAQ | RajProperty Rajshahi</title>
        <meta
          name="description"
          content="Frequently asked questions for buyers and sellers using RajProperty in Rajshahi. See answers on listings, privacy, contact, fees, property search, and more."
        />
        <meta
          name="keywords"
          content="FAQ, help, buyers, sellers, RajProperty, Rajshahi, real estate, property, support, privacy, fees, how-to"
        />
        <meta property="og:title" content="FAQ - RajProperty" />
        <meta
          property="og:description"
          content="See answers to common questions about buying, selling, and using RajProperty to find or list properties in Rajshahi City."
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <h1 className="text-3xl font-bold mb-6 text-center text-green-400">
        Frequently Asked Questions
      </h1>
      <p className="mb-6 text-gray-400 text-center">
        Answers to some common questions about using Raj Property.
      </p>
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className="mb-4 border border-gray-700 rounded-lg overflow-hidden transition-all duration-300"
          >
            <button
              onClick={() => toggleFaq(index)}
              className={`w-full px-4 py-3 text-left flex justify-between items-center bg-gray-900 hover:bg-gray-800 font-semibold rounded-t-lg select-none cursor-pointer transition-colors duration-200`}
            >
              {faq.question}
              <ChevronDown
                className={`w-5 h-5 text-green-400 transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              ref={(el) => (contentRefs.current[index] = el)}
              style={{
                maxHeight: isOpen
                  ? contentRefs.current[index]?.scrollHeight + "px"
                  : "0px",
                transition: "max-height 0.3s ease",
              }}
              className="px-4 overflow-hidden bg-gray-900 border-t border-gray-700"
            >
              <p className="py-3 text-gray-300">{faq.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Faq;
