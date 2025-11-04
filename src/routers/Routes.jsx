import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import AdminHouseView from "../pages/admin/houses/AdminHouseView";
import FeaturedProperties from "../pages/FeaturedProperties";
import Messages from "../pages/admin/Messages";
import Latest from "../pages/Latest";

// Lazy-load pages for code splitting
const Root = lazy(() => import("../layout/Root"));
const ErrorPage = lazy(() => import("../pages/ErrorPage"));
const HomePage = lazy(() => import("../pages/HomePage"));
const Dashboard = lazy(() => import("../pages/admin/Dashboard"));
const PrivateRoute = lazy(() => import("./PrivateRoute"));
const Login = lazy(() => import("../pages/admin/Login"));
const Lands = lazy(() => import("../pages/Lands"));
const AccountRoot = lazy(() => import("../pages/admin/AccountRoot"));
const AdminLands = lazy(() => import("../pages/admin/lands/AdminLands"));
const AddLand = lazy(() => import("../pages/admin/lands/AddLand"));
const Media = lazy(() => import("../components/media/Media"));
const MediaUpload = lazy(() => import("../components/media/MediaUpload"));
const AdminLandView = lazy(() => import("../pages/admin/lands/AdminLandView"));
const UpdateLand = lazy(() => import("../pages/admin/lands/UpdateLand"));
const AdminFlats = lazy(() => import("../pages/admin/flats/AdminFlats"));
const AddFlat = lazy(() => import("../pages/admin/flats/AddFlat"));
const SingleLand = lazy(() => import("../pages/SingleLand"));
const AdminFlatView = lazy(() => import("../pages/admin/flats/AdminFlatView"));
const UpdateFlat = lazy(() => import("../pages/admin/flats/UpdateFlat"));
const AdminHouses = lazy(() => import("../pages/admin/houses/AdminHouses"));
const AddHouse = lazy(() => import("../pages/admin/houses/AddHouse"));
const FilteredPage = lazy(() => import("../pages/FilteredPage"));
const Properties = lazy(() => import("../pages/Properties"));
const Houses = lazy(() => import("../pages/Houses"));
const Flats = lazy(() => import("../pages/Flats"));
const ContactUs = lazy(() => import("../pages/ContactUs"));
const TermsOfService = lazy(() => import("../pages/TermsOfService"));
const PrivacyPolicy = lazy(() => import("../pages/PrivacyPolicy"));
const CookiePolicy = lazy(() => import("../pages/CookiePolicy"));
const Faq = lazy(() => import("../pages/Faq"));
const Agreements = lazy(() => import("../pages/Agreements"));
const AboutUs = lazy(() => import("../pages/AboutUs"));
const Services = lazy(() => import("../pages/Services"));
const AdminChatBox = lazy(() => import("../pages/admin/AdminChatBox"));
const Drafts = lazy(() => import("../pages/admin/Drafts"));
const SingleFlat = lazy(() => import("../pages/SingleFlat"));
const SingleHouse = lazy(() => import("../pages/SingleHouse"));

// Wrapped loader function
const fetchJSON = async (url) => {
  const res = await fetch(url);
  if (!res.ok) throw new Response("Failed to load", { status: res.status });
  return res.json();
};

const suspenseWrapper = (element) => (
  <Suspense fallback={<div>Loading...</div>}>{element}</Suspense>
);

const Routes = createBrowserRouter([
  {
    path: "/",
    element: suspenseWrapper(<Root />),
    errorElement: suspenseWrapper(<ErrorPage />),
    children: [
      { path: "/", element: suspenseWrapper(<HomePage />) },
      {
        path: "dashboard",
        element: suspenseWrapper(
          <PrivateRoute>
            <AccountRoot />
          </PrivateRoute>
        ),
        children: [
          {
            path: "",
            element: suspenseWrapper(
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            ),
          },
          {
            path: "lands",
            element: suspenseWrapper(
              <PrivateRoute>
                <AdminLands />
              </PrivateRoute>
            ),
          },
          {
            path: "addland",
            element: suspenseWrapper(
              <PrivateRoute>
                <AddLand />
              </PrivateRoute>
            ),
          },
          {
            path: "media",
            element: suspenseWrapper(
              <PrivateRoute>
                <Media />
              </PrivateRoute>
            ),
          },
          {
            path: "media/upload",
            element: suspenseWrapper(
              <PrivateRoute>
                <MediaUpload />
              </PrivateRoute>
            ),
          },
          {
            path: "lands/:id",
            element: suspenseWrapper(
              <PrivateRoute>
                <AdminLandView />
              </PrivateRoute>
            ),
            loader: ({ params }) =>
              fetchJSON(
                `https://backend.rajproperty.site/api/lands/${params.id}`
              ),
          },
          {
            path: "lands/update/:id",
            element: suspenseWrapper(
              <PrivateRoute>
                <UpdateLand />
              </PrivateRoute>
            ),
            loader: ({ params }) =>
              fetchJSON(
                `https://backend.rajproperty.site/api/lands/${params.id}`
              ),
          },
          { path: "flats", element: suspenseWrapper(<AdminFlats />) },
          { path: "addflat", element: suspenseWrapper(<AddFlat />) },
          {
            path: "flats/:id",
            element: suspenseWrapper(
              <PrivateRoute>
                <AdminFlatView />
              </PrivateRoute>
            ),
            loader: ({ params }) =>
              fetchJSON(
                `https://backend.rajproperty.site/api/flats/${params.id}`
              ),
          },
          {
            path: "flats/update/:id",
            element: suspenseWrapper(
              <PrivateRoute>
                <UpdateFlat />
              </PrivateRoute>
            ),
            loader: ({ params }) =>
              fetchJSON(
                `https://backend.rajproperty.site/api/flats/${params.id}`
              ),
          },
          {
            path: "houses",
            element: suspenseWrapper(
              <PrivateRoute>
                <AdminHouses />
              </PrivateRoute>
            ),
          },
          {
            path: "houses/:id",
            element: (
              <PrivateRoute>
                <AdminHouseView></AdminHouseView>
              </PrivateRoute>
            ),
            loader: ({ params }) =>
              fetchJSON(
                `https://backend.rajproperty.site/api/houses/${params.id}`
              ),
          },
          {
            path: "addHouse",
            element: suspenseWrapper(
              <PrivateRoute>
                <AddHouse />
              </PrivateRoute>
            ),
          },
          {
            path: "chats",
            element: suspenseWrapper(<AdminChatBox />),
          },
          {
            path: "drafts",
            element: suspenseWrapper(<Drafts />),
          },
          {
            path: "messages",
            element: suspenseWrapper(
              <PrivateRoute>
                <Messages></Messages>
              </PrivateRoute>
            ),
            loader: () =>
              fetchJSON("https://backend.rajproperty.site/api/messages"),
          },
        ],
      },
      { path: "login", element: suspenseWrapper(<Login />) },
      {
        path: "houses",
        element: suspenseWrapper(<Houses />),
        loader: () => fetchJSON(`https://backend.rajproperty.site/api/houses`),
      },
      {
        path: "flats",
        element: suspenseWrapper(<Flats />),
        loader: () => fetchJSON(`https://backend.rajproperty.site/api/flats`),
      },
      {
        path: "lands",
        element: suspenseWrapper(<Lands />),
        loader: () => fetchJSON(`https://backend.rajproperty.site/api/lands`),
      },
      {
        path: "lands/:id",
        element: suspenseWrapper(<SingleLand />),
        loader: ({ params }) =>
          fetchJSON(`https://backend.rajproperty.site/api/lands/${params.id}`),
      },
      {
        path: "flats/:id",
        element: suspenseWrapper(<SingleFlat />),
        loader: ({ params }) =>
          fetchJSON(`https://backend.rajproperty.site/api/flats/${params.id}`),
      },
      {
        path: "houses/:id",
        element: suspenseWrapper(<SingleHouse />),
        loader: ({ params }) =>
          fetchJSON(`https://backend.rajproperty.site/api/houses/${params.id}`),
      },
      { path: "search", element: suspenseWrapper(<FilteredPage />) },
      {
        path: "properties",
        element: suspenseWrapper(<Properties />),
        loader: () => fetchJSON(`https://backend.rajproperty.site/api/all`),
      },
      {
        path: "featured",
        element: <FeaturedProperties></FeaturedProperties>,
        loader: () =>
          fetchJSON(`https://backend.rajproperty.site/api/featured`),
      },
      {
        path: "latest",
        element: <Latest></Latest>,
        loader: () =>
          fetchJSON(`https://backend.rajproperty.site/api/recent`),
      },
      { path: "contact", element: suspenseWrapper(<ContactUs />) },
      {
        path: "terms-of-service",
        element: suspenseWrapper(<TermsOfService />),
      },
      { path: "privacy-policy", element: suspenseWrapper(<PrivacyPolicy />) },
      { path: "cookie-policy", element: suspenseWrapper(<CookiePolicy />) },
      { path: "faq", element: suspenseWrapper(<Faq />) },
      { path: "agreements", element: suspenseWrapper(<Agreements />) },
      { path: "about", element: suspenseWrapper(<AboutUs />) },
      { path: "services", element: suspenseWrapper(<Services />) },
    ],
  },
]);

export default Routes;
