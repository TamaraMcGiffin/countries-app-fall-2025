import { Link } from "react-router-dom";

function CountryCard({ country }) {
  // console.log("country prop working?", country);
  const { flags, name, population, region, capital } = country;
  // const country = { flags, name, population, region, capital };
  return (
    // Working don't mess with it
    <Link to={`/country-detail/${country.name.common}`}>
      <div className="country-card">
        <img src={flags.png} alt="Flag" />
        <div className="country-details">
          <h3>{name.common}</h3>
          <p>
            <b>Population:</b> {population.toLocaleString()}
          </p>
          <p>
            <b>Region:</b> {region}
          </p>
          <p>
            <b>Capital:</b> {capital}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default CountryCard;
