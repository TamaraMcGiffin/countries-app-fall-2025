import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import SavedCountries from "./pages/SavedCountries";
// import localData from "../localData";
import { useEffect, useState } from "react";
import CountryDetails from "./pages/CountryDetails";

function App() {
  // Here I am assigning the useState hook to the variables countryData, and setCountryData which is a setter function
  const [countryData, setCountryData] = useState([]);


  // Note to self: Comment out getCountriesData function to refactor or do the "try" fetch in later milestones

  // This function is being used for the purpose of fetching data from the assigned url
  const getCountriesData = () => {
    fetch(
      `https://restcountries.com/v3.1/all?fields=name,flags,population,capital,region,cca3,borders`
    )
      // This line fetches the data and converts it to json formatting
      .then((response) => response.json())

      // This line receives the data and then sets it in the following line
      .then((data) => {
        setCountryData(data);
      })

      // This line handles any errors during fetch call
      .catch((error) => console.log("Error: " + error.message));
  };

  // This is a useEffect hook being used to call on the getCountriesData function to fetch the data & using empty array (?)
  // Googled why empty array, called a dependency array and prevents an infinite loop from happening when rendering component
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
        {/* Here I am assigning the Home component to the route path as an element */}
        {/* The home component also includes the countriesData function and passing through countryData prop */}
        <Route path="/" element={<Home countriesData={countryData} />} />

        <Route
          path="/SavedCountries"
          element={<SavedCountries countriesData={countryData} />}
        />
        <Route
          path="/country-detail/:countryName"
          element={<CountryDetails countriesData={countryData} />}
        />
      </Routes>
    </div>
  );
}

export default App;
