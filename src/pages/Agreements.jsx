import React from "react";
import { Helmet } from "react-helmet";

const Agreements = () => {
  return (
    <>
      <Helmet>
        <title>Agreements & Fees | RajProperty</title>
        <meta
          name="description"
          content="RajProperty's transparent buyer and seller policy, commission and agreement documents for property deals in Rajshahi City, Bangladesh. Download agreements and understand our fee structure."
        />
        <meta
          name="keywords"
          content="agreement, fees, commission, buyer policy, seller policy, download, RajProperty, Rajshahi, Bangladesh, real estate"
        />
        <meta property="og:title" content="Agreements & Fees - RajProperty" />
        <meta
          property="og:description"
          content="See our buyer and seller agreement terms, commission policies and download contracts for property transactions with RajProperty."
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="min-h-screen bg-gray-900 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto p-8 bg-gradient-to-r from-green-700 via-green-600 to-green-500 rounded-3xl shadow-2xl">
          <h1 className="text-4xl font-extrabold mb-8 text-center text-white drop-shadow-lg">
            Agreements & Fees
          </h1>
          {/* Buyer Policy */}
          <section className="mb-8 bg-gray-800 p-6 rounded-2xl shadow-lg hover:scale-105 transform transition duration-300">
            <h2 className="text-2xl font-semibold mb-3 text-green-300">
              Buyer Policy
            </h2>
            <p className="text-gray-200">
              At Raj Property, we do not take any fees from buyers. You can
              search for and purchase properties freely without any additional
              charges.
            </p>
          </section>
          {/* Seller Policy */}
          <section className="mb-8 bg-gray-800 p-6 rounded-2xl shadow-lg hover:scale-105 transform transition duration-300">
            <h2 className="text-2xl font-semibold mb-3 text-green-300">
              Seller Policy
            </h2>
            <p className="text-gray-200 mb-3">
              We charge a <span className="font-bold">2% commission</span> of
              the total property value from sellers. The following minimums
              apply:
            </p>
            <ul className="list-disc list-inside text-gray-300 mb-3">
              <li>
                <span className="font-semibold">Minimum Fee:</span> 50,000 BDT
                for general properties.
              </li>
              <li>
                <span className="font-semibold">Lands:</span> For properties
                priced above 10 lakh BDT per Katha, the fee is 1 lakh BDT per
                Katha.
              </li>
              <li>
                <span className="font-semibold">Flats/Houses:</span> Minimum fee
                is 1 lakh BDT.
              </li>
            </ul>
            <p className="text-gray-200">
              This ensures transparency and fairness in all property
              transactions through our platform.
            </p>
          </section>
          {/* Agreement Download */}
          <section className="mb-8 bg-gray-800 p-6 rounded-2xl shadow-lg hover:scale-105 transform transition duration-300">
            <h2 className="text-2xl font-semibold mb-3 text-green-300">
              Agreement Download
            </h2>
            <p className="text-gray-200 mb-4">
              You can download our standard seller/buyer agreement in PDF format
              for reference:
            </p>
            <a
              href="https://yourdomain.com/path-to-agreement.pdf" // Replace with your PDF link
              download
              className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition duration-300 transform hover:-translate-y-1"
            >
              Download Agreement (PDF)
            </a>
          </section>
          {/* Notes */}
          <section className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:scale-105 transform transition duration-300">
            <h2 className="text-2xl font-semibold mb-3 text-green-300">
              Notes
            </h2>
            <p className="text-gray-200">
              All transactions and commissions are handled transparently. For
              any clarifications regarding fees or agreements, please contact
              our support team via the Contact page.
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

export default Agreements;
