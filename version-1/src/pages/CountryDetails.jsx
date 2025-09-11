import "../App.css";
import { Link, useParams } from "react-router-dom";
import "../App.jsx";

function CountryDetails({ countryData }) {
  const countryName = useParams().countryName;

  return (
    <>
      {/* <Link to={countries} className="card-link"></Link> */}
      <button>Back</button>
      <div className="details-image-card">
        <img></img>
      </div>
      <div className="country-details-card">
        <h3>Country Name</h3>
        <button>Save</button>
        <p>Population:</p>
        <p>Capital:</p>
        <p>Region:</p>
        <p>Bordering countries:</p>
      </div>
    </>
  );
}

export default CountryDetails;
