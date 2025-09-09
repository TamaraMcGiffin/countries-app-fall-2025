import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import SavedCountries from "./pages/SavedCountries";
import localData from "../localData";
// import CountryDetails from "./pages/CountryDetails";

function App() {
  return (
    <div>
      <div className="header">
        <nav>
          <ul>
            <li>
              <Link to="/" className="world-link">
                Where in the world?
              </Link>
            </li>
            <li>
              <Link to="/SavedCountries">Saved Countries</Link>
            </li>
          </ul>
        </nav>
      </div>

      <Routes>
        <Route path="/" element={<Home countriesData={localData} />} />
        <Route path="/SavedCountries" element={<SavedCountries />} />
        {/* <Route path="/CountryDetails" element={<CountryDetails />} /> */}
      </Routes>
    </div>
  );
}

export default App;
