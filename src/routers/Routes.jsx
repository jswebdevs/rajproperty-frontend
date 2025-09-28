import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";
import Dashboard from "../pages/admin/Dashboard";
import PrivateRoute from "./PrivateRoute";
import Login from "../pages/admin/login";
import Lands from "../pages/Lands";
import AccountRoot from "../pages/admin/AccountRoot";
import AdminLands from "../pages/admin/lands/AdminLands";
import AddLand from "../pages/admin/lands/AddLand";
import Media from "../components/media/Media";
import MediaUpload from "../components/media/MediaUpload";
import MediaLibrary from "../components/media/MediaLibrary";
import AdminLandView from "../pages/admin/lands/AdminLandView";
import UpdateLand from "../pages/admin/lands/UpdateLand";
import AdminFlats from "../pages/admin/flats/AdminFlats";
import AddFlat from "../pages/admin/flats/AddFlat";
import SingleLand from "../pages/SingleLand";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <HomePage></HomePage>,
      },
      {
        path: "dashboard",
        element: (
          <PrivateRoute>
            <AccountRoot></AccountRoot>
          </PrivateRoute>
        ),
        children: [
          {
            path: "",
            element: (
              <PrivateRoute>
                <Dashboard></Dashboard>
              </PrivateRoute>
            ),
          },
          {
            path: "lands",
            element: (
              <PrivateRoute>
                <AdminLands></AdminLands>
              </PrivateRoute>
            ),
          },
          {
            path: "addland",
            element: (
              <PrivateRoute>
                <AddLand></AddLand>
              </PrivateRoute>
            ),
          },
          {
            path: "media",
            element: (
              <PrivateRoute>
                <Media></Media>
              </PrivateRoute>
            ),
          },
          {
            path: "media/upload",
            element: (
              <PrivateRoute>
                <MediaUpload></MediaUpload>
              </PrivateRoute>
            ),
          },
          {
            path: "lands/:id",
            element: (
              <PrivateRoute>
                <AdminLandView></AdminLandView>
              </PrivateRoute>
            ),
            loader: async ({ params }) =>
              fetch(
                `https://rajproperty-backend-1.onrender.com/api/lands/${params.id}`
              ),
          },
          {
            path: "lands/:id/update",
            element: (
              <PrivateRoute>
                <UpdateLand></UpdateLand>
              </PrivateRoute>
            ),
            loader: async ({ params }) =>
              fetch(
                `https://rajproperty-backend-1.onrender.com/api/lands/${params.id}`
              ),
          },
          {
            path: "flats",
            element: <AdminFlats></AdminFlats>,
          },
          {
            path: "addflat",
            element: <AddFlat></AddFlat>,
          },
        ],
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "lands",
        element: <Lands></Lands>,
        loader: async () =>
          fetch(`https://rajproperty-backend-1.onrender.com/api/lands`),
      },
      {
        path: "lands/:id",
        element: <SingleLand></SingleLand>,
        loader: async ({params}) =>
          fetch(`https://rajproperty-backend-1.onrender.com/api/lands/${params.id}`),
      },
    ],
  },
]);

export default Routes;