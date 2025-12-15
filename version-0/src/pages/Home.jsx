import CountryCard from "../components/CountryCard";

function Home({ countriesData }) {
  console.log(countriesData);
  return (

      <div className="countries-container">
        {countriesData.map((country) => (
          <CountryCard key={country.name.common} country={country} />
        ))}
      </div>

  );
}

export default Home;
