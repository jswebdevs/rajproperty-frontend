
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import Header from "../components/global/Header";
import Footer from "../components/global/Footer";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header></Header>
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4 py-12 bg-gray-50">
        <ExclamationTriangleIcon className="h-20 w-20 text-red-500 mb-6" />
        <h1 className="text-5xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
          Page Not Found
        </h2>
        <p className="text-gray-500 mb-6">
          Sorry, the page you are looking for doesn’t exist or has been moved.
        </p>

        <Link
          to="/"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700 transition"
        >
          Back to Home
        </Link>
      </main>

      <Footer></Footer>
    </div>
  );
};

export default ErrorPage;
