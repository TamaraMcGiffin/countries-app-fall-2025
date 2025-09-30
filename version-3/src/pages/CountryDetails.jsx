import "../App.css";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../App.jsx";

function CountryDetails({ countriesData }) {
  // Declaring variable to navigate back button to home page
  const navigate = useNavigate();
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

  // Function used to retrieve JSON data from the API call or URL
  // Using a fetch call with async/try boilerplate code and passing through a dynamic name prop to retrieve from dynamic API call key of country_name instead of "France" - no ""'s needed

  const getNewCountryCount = async (name) => {
    try {
      const response = await fetch(
        "https://backend-answer-keys.onrender.com/update-one-country-count",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            country_name: name,
          }),
        }
      );

      // This if statement found on MDN Docs is using what is called a guard clause instead of an else statement
      // Used to check response status if 404 error and "throw if not okay", otherwise fetch response body content

      if (!response.ok) {
        console.error("Server error status", response.status);
        return 0;
      }

      const result = await response.json();
      return result.count;
    } catch (error) {
      console.error("Error during API request", error);
      return 0;
    }
  };

  // This useEffect function is being used to setViewCount upon load and calling the showNewCount async function which is nested inside of the useEffect function
  // The newCount variable is awaiting to get or retrieve the updated count and passing through the data from countryName key in API call
  // The [countryName] line is a dependency array passing through to retrieve the key of countryName via useParams(); method
  
  useEffect(() => {
    const showNewCount = async () => {
      const newCount = await getNewCountryCount(countryName);
      setViewCount(newCount);
    };
    showNewCount();
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

  // Creating a function with useNavigate to go back (-1) one page/previous page which is the home page
  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      {/* Attached goBack function to button */}
      <button className="back-button" onClick={goBack}>
        {" "}
        ← Back{" "}
      </button>

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
