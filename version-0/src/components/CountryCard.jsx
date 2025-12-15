function CountryCard({ country }) {
  const { flags, name, population, region, capital } = country;
  return (
    
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
  );
}

export default CountryCard;
