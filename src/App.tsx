import { Link, Route, Routes, useLocation } from "react-router-dom";
import Canvas from "./components/Canvas";
import DynamicIsland from "./components/DynamicIsland";

function App() {
  const location = useLocation();
  const { pathname } = location;
  console.log("pathname => ", pathname);

  return (
    <div>
      <header className="bg-gray-600 text-white p-6 text-center">
        <h1 className="text-2xl">Canvas Manipulation App</h1>
        <nav className="mt-3 flex items-center justify-center gap-3">
          <Link
            to={"/"}
            className={`${
              pathname === "/" ? "text-white" : "text-gray-300"
            } hover:text-white text-gray-300 transition-all duration-100 ease-linear`}
          >
            Canvas
          </Link>
          <Link
            to={"/dynamic-island"}
            className={`${
              pathname === "/dynamic-island" ? "text-white" : "text-gray-300"
            } hover:text-white transition-all duration-100 ease-linear`}
          >
            Dynamic Island
          </Link>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Canvas />} />
          <Route path="/dynamic-island" element={<DynamicIsland />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
