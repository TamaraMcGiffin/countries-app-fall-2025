import "../App.css";
import { useParams } from "react-router-dom";
//Added useEffect
import { useState, useEffect } from "react";
// import { Routes, Route, Link } from "react-router-dom";
import "../App.jsx";
// import CountryCard from "../components/CountryCard.jsx";

function CountryDetails({ countriesData }) {
  // Setter function/variables with useState at default value of zero for view counts
  const [viewCount, setViewCount] = useState(0);

  const countryName = useParams().countryName;
  console.log(countryName, "CountryDetails console check");

  const country = countriesData.find(
    (country) => country.name.common === countryName
  );

  if (!country) {
    return <div>Country not found.</div>;
  }
  // Moved useEffect outside of handleClick function
  useEffect(() => {
    // Changed [] to {} with quotes, want an empty object not an array?
    const savedCounts = JSON.parse(
      localStorage.getItem("country-view-count") || "{}"
    );

    // Declaring a variable called current count which keeps track of each country name if viewed, if not then start count at 0 (meaning no views)
    const currentCount = savedCounts[countryName] || 0;
    // Increase view count by 1
    const updatedCount = currentCount + 1;
    // Set the view count to update with the new count
    setViewCount(updatedCount);

    // Save the data of country view counts to local storage with updated count using setItem function
    savedCounts[countryName] = updatedCount;
    localStorage.setItem("country-view-count", JSON.stringify(savedCounts));
  }, [countryName]);

  function handleClick() {
    if (country) {
      // Get the existing list of saved countries from localStorage.

      const savedCountriesDestringified =
        localStorage.getItem("saved-countries");
      const listSavedCountries = savedCountriesDestringified
        ? JSON.parse(savedCountriesDestringified)
        : [];
      // Assigning a variable savedToList to equal value of the list of saved countries(listSavedCountries) if savedCountry is true
      const savedToList = listSavedCountries.find(
        (savedCountry) => savedCountry.name.common === country.name.common
      );

      // If the country has not been saved to the list, then add it to the list/update the list
      if (!savedToList) {
        // Create a new and updated array with all the current saved countries plus the new one
        const updatedSavedCountries = [...listSavedCountries, country];

        localStorage.setItem(
          "saved-countries",
          JSON.stringify(updatedSavedCountries)
        );
        console.log(`${country.name.common} is saved to list`);
      }
    }
  }

  return (
    <>
      <button className="back-button"> ← Back </button>

      <div className="details-countrycard">
        <img src={country.flags.png} alt={`${country.name.common} flag`} />
        <div className="details-infocard">
          <h2>{country.name.common}</h2>
          <button className="save-button" onClick={handleClick}>
            Save
          </button>
          <p>
            <b>Population:</b> {country.population.toLocaleString()}
          </p>
          <p>
            <b>Capital:</b> {country.capital}
          </p>
          <p>
            <b>Region:</b> {country.region}
          </p>
          <p>Viewed: {viewCount} times </p>
        </div>
      </div>
    </>
  );
}

export default CountryDetails;
