import "./App.css";
import NavBar from "./components/nav-bar/NavBar.jsx";
import Footer from "./components/footer/Footer.jsx";
import { Outlet } from "react-router";

function App() {
  return (
    <>
      <NavBar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
