import "../App.css";
import { useParams } from "react-router-dom";
// import { Routes, Route, Link } from "react-router-dom";
import "../App.jsx";
// import CountryCard from "../components/CountryCard.jsx";

// Took out 'country' prop

function CountryDetails({ countriesData }) {

  const countryName = useParams().countryName;
  console.log(countryName, "CountryDetails console check");

  const country = countriesData.find(
    (country) => country.name.common === countryName
  );

  if (!country) {
    return <div>Country not found or still loading...</div>;
  }

  return (
    <>
      <button className="back-button"> ← Back </button>

   
        <div className="details-countrycard">
          <img src={country.flags.png} alt={`${country.name.common} flag`} />
          <div className="details-infocard">
            <h2>{country.name.common}</h2>
            <button className="save-button">Save</button>
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
