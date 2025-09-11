import CountryCard from "../components/CountryCard";

// This line is the function name of Home for the Home.jsx page and it is passing through the countriesData prop
// The countriesData prop stores the array of countries and it's details
function Home({ countriesData }) {

  // Here I am console logging countriesData to check that the information is coming through
  console.log(countriesData);

  // Return means to render or display the items defined within the parentheses
  return (

    // Here is a div class named "countries-container" which will hold the cards
    <div className="countries-container">

      {/* Here I am using the map method to iterate over the array of countriesData and using the prop name "country" */}
      {countriesData.map((country) => (

        // Here I am assigning the data to the CountryCard componenet and using dot notation to identify the key
        // and it's items for rendering back in the card
        // country={country} is being useed here to assign the country prop to the CountryCard component
        <CountryCard key={country.name.common} country={country} />
      ))}
    </div>
  );
}

export default Home;
