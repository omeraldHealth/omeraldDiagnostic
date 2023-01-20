import type { NextPage } from "next";
import LoginComponent from "../components/Login/Login.component";

const Home: NextPage = () => {
  return (
    <div className="grid h-screen place-content-center">
      <LoginComponent />
    </div>
  );
};

export default Home;
