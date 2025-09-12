import "../App.css";
import { Link, useParams } from "react-router-dom";
// import { Routes, Route, Link } from "react-router-dom";
import "../App.jsx";

function CountryDetails({ country, countriesData }) {
  const { flags, name, population, region, capital } = country;
  const countryName = useParams().countryName;

  return (
    <>
      {/* <Link to={countries} className="card-link"></Link> */}
      <Link to={`/country/${country.name.common}`}>
        <button>Back</button>
        <div className="details-image-card">
          <img src={flags.png} alt="Flag" />
        </div>
        <div className="country-details-card">
          <h3>{name.common}</h3>
          <button>Save</button>
          <p>Population: {population.toLocaleString()}</p>
          <p>Capital: {capital}</p>
          <p>Region: {region}</p>
          <p>Bordering countries: </p>
        </div>
      </Link>
    </>
  );
}

export default CountryDetails;
