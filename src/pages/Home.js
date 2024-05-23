import { useRouteLoaderData } from "react-router-dom";
import PageContent from "../components/PageContent";
import { getAuthToken } from "../util/getToken";
import { redirect } from "react-router-dom";
function HomePage() {
  const token = useRouteLoaderData("root");

  if (!token) {
    console.log("no token found ");
    console.log(token);
    redirect("/login");
  }
  return (
    <PageContent title="Welcome!">
      {!token && <p>Logged out</p>}
      {token && <p>Browse all our amazing events!</p>}
    </PageContent>
  );
}

export default HomePage;
