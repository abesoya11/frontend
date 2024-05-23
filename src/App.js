import { RouterProvider, createBrowserRouter } from "react-router-dom";

import EditEventPage from "./pages/EditEvent";
import ErrorPage from "./pages/Error";
import EventDetailPage, {
  loader as eventDetailLoader,
  action as deleteEventAction,
} from "./pages/EventDetail";
import EventsPage, { loader as eventsLoader } from "./pages/Events";
import EventsRootLayout from "./pages/EventsRoot";
import HomePage from "./pages/Home";
import NewEventPage from "./pages/NewEvent";
import RootLayout, { loader as tokenLoader } from "./pages/Root";

import NewsletterPage, { action as newsletterAction } from "./pages/Newsletter";
import AuthForm, { action as authAction } from "./components/AuthForm";
import SignupForm, { action as signupAction } from "./components/SignupForm";
import { action as logoutAction } from "./pages/Logout";
import { checkAuthLoader } from "./util/auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: "root",
    loader: tokenLoader,
    children: [
      {
        index: true,
        element: <HomePage />,
        id: "home",
        loader: checkAuthLoader,
      },

      {
        path: "newsletter",
        element: <NewsletterPage />,
        action: newsletterAction,
        loader: checkAuthLoader,
      },
      { path: "login", element: <AuthForm />, action: authAction },
      { path: "Signup", element: <SignupForm />, action: signupAction },
      { path: "logout", action: logoutAction },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
