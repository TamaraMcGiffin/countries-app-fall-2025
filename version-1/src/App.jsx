import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import SavedCountries from "./pages/SavedCountries";
// import localData from "../localData";
import { useEffect, useState } from "react";
// import CountryDetails from "./pages/CountryDetails";

function App() {
  const [countryData, setCountryData] = useState([]);
  console.log(countryData);

  // Comment out getCountriesData function to do the "try" fetch in later milestones

  const getCountriesData = () => {
    fetch(
      `https://restcountries.com/v3.1/all?fields=name,flags,population,capital,region,cca3,borders`
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setCountryData(data);
      })
      .catch((error) => console.log("Error: " + error.message));
  };

  useEffect(() => {
    getCountriesData();
  }, []);

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
        <Route path="/" element={<Home countriesData={countryData} />} />
        <Route path="/SavedCountries" element={<SavedCountries />} />
        {/* <Route path="/CountryDetails" element={<CountryDetails />} /> */}
      </Routes>
    </div>
  );
}

export default App;
