import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Spot from "./pages/Spot";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <div className="sticky top-0">
        <Navbar></Navbar>
      </div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/spot" element={<Spot />}></Route>
      </Routes>

      <div className="h-[1000px]"></div>
    </>
  );
}

export default App;
