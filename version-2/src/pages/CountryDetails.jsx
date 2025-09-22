import "../App.css";
import { useParams } from "react-router-dom";
// import { Routes, Route, Link } from "react-router-dom";
import "../App.jsx";
// import CountryCard from "../components/CountryCard.jsx";

function CountryDetails({ countriesData }) {
  // const countryName = useParams().countryName;
  //
  const { countryName } = useParams();
  console.log(countryName, "CountryDetails console check");

  const country = countriesData.find(
    (country) => country.name.common === countryName
  );

  if (!country) {
    return <div>Country not found.</div>;
  }

  // function handleClick() {
  //   if (country) {
  //     console.log(country, "country name");
  //     //added hyphen in "saved countries"
  //     localStorage.setItem("saved-countries", JSON.stringify(country));
  //   }
  // }

  function handleClick() {
    if (country) {
      // Get the existing list of saved countries from localStorage.
      const listSavedCountries = JSON.parse(
        localStorage.getItem("saved-countries")
      );
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
            <b>Region:</b> {country.region}
          </p>
          <p>
            <b>Capital:</b> {country.capital}
          </p>
          {/* CountryCard component won't work however above code I had saved works! */}
          {/* <CountryCard /> */}
        </div>
      </div>
    </>
  );
}

export default CountryDetails;
