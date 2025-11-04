import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import Header from "../components/global/Header";
import Footer from "../components/global/Footer";
import animation404 from "../assets/404.json";
import { Helmet } from "react-helmet";


const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Helmet>
        <title>404 - Page Not Found | RajProperty</title>
        <meta
          name="description"
          content="404: The page you are looking for does not exist or has been moved. Browse trusted properties in Rajshahi City, Bangladesh."
        />
        <meta name="robots" content="noindex, follow" />
        <meta property="og:title" content="404 - Not Found | RajProperty" />
        <meta
          property="og:description"
          content="Page not found on RajProperty. Return home or explore properties in Rajshahi City, Bangladesh."
        />
      </Helmet>
      <Header />

      <main className="flex-grow flex flex-col items-center justify-center text-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Lottie Animation */}
          <Lottie
            animationData={animation404}
            loop={true}
            className="w-full h-64 md:h-96 mb-6"
          />
        </div>

        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4 animate-bounce">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-2">
          Page Not Found
        </h2>
        <p className="text-gray-500 mb-6 max-w-xl">
          Oops! Looks like the page you are looking for doesn’t exist or has
          been moved.
        </p>

        <Link
          to="/"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
        >
          Back to Home
        </Link>

        {/* Optional extra fun message */}
        <p className="mt-6 text-gray-400 text-sm">
          Tip: You can explore our{" "}
          <Link className="text-blue-500 hover:underline" to="/properties">
            latest properties
          </Link>{" "}
          instead!
        </p>
      </main>

      <Footer />
    </div>
  );
};

export default ErrorPage;
