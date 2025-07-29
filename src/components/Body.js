import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Login";
import Browse from "./Browse";
import AdminLogin from "./AdminLogin";
import Admin from "./Admin";
import ProtectedAdminRoute from "./ProtectedAdminRoute";
import AddMovies from "./AddMovies";
import UserSearch from "./UserSearch";

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
    {
      path: "/admin-login",
      element: <AdminLogin />,
    },
    {
      path: "/user-search",
      element: <UserSearch />,
    },
    {
      path: "/admin",
      element: (
        <ProtectedAdminRoute>
          <Admin />
        </ProtectedAdminRoute>
      ),
    },
    {
      path: "/add-movies",
      element: <AddMovies />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={appRouter} />;
    </div>
  );
};

export default Body;
