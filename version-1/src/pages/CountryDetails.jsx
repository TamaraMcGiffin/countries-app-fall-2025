import "../App.css";
import { useParams } from "react-router-dom";
// import { Routes, Route, Link } from "react-router-dom";
import "../App.jsx";
import CountryCard from "../components/CountryCard.jsx";

// Added back 'country' prop
// Corrected countriesData to countryData - now console log working
function CountryDetails({ country, countryData }) {
  //This is not needed?
  // const { flags, name, population, region, capital } = country;
  const countryName = useParams().countryName;
  console.log(countryName, "CountryDetails console check");

  return (
    <>
      {/* Something is wrong with the key, corrected countriesData to countryData  */}
      {/* tried countryName, country.name.common, country.common didn't work */}
      <CountryCard key={country} country={countryData} />
    </>
  );
}

export default CountryDetails;
