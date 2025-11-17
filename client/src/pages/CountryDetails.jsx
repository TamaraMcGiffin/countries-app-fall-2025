import "../App.css";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../App.jsx";

function CountryDetails({ countriesData }) {
  // Declaring variable to navigate back button to home page
  const navigate = useNavigate();
  // Setter function/variables with useState at default value of zero for view counts
  const [viewCount, setViewCount] = useState(0);
  const [isSaved, setIsSaved] = useState();

  const countryName = useParams().countryName;
  console.log(countryName, "CountryDetails console check");

  const country = countriesData.find(
    (country) => country.name.common === countryName
  );

  if (!country) {
    return <div>Country not found.</div>;
  }

  // Function used to retrieve JSON data from the API call, using a base URL and endpoint
  // Using a fetch call with async/try boilerplate code and passing through a dynamic prop called "name" to retrieve from dynamic API call key of country_name instead of "France" - no ""'s needed
  // Headers are key-value pairs sent between the client and server in an HTTP request or response
  // The body is requesting to convert the desired object in the API call into a JSON string

  const getNewCountryCount = async (name) => {
    try {
      const response = await fetch(
        "/api/update-one-country-count",
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

      // This IF statement I found as demonstrated on MDN Docs is using what is called a guard clause instead of an else statement
      // Used to check response status if 404 error and "throw if not okay" (!) , otherwise fetch response body content
      // response.json() turns response object into JSON friendly format
      // the return result.count line is the result of the JSON object retrieved from the response and targeting the key called "count" which holds the value of the count number
      //setViewCount updates the count key retrieved from the API response
      // The purpose of return 0; - if there is an error, don't run the code in the rest of the function

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

  // This useEffect function is being used to set the updated view count upon load and holds another function, the showNewCount async function which is nested inside of the useEffect function
  // The newCount variable is awaiting to get or retrieve the updated count and passing through the data from countryName key in API call
  // setViewCount is a useState which calls upon the newCount variable which holds the updated view count
  // The [countryName] line is a dependency array passing through to retrieve the object & key of countryName which works via housing the useParams(); method

  useEffect(() => {
    const updateCountryCount = async () => {
      const newCount = await getNewCountryCount(countryName);
      setViewCount(newCount);
    };
    updateCountryCount();
  }, [countryName]);

  // Moved storeSavedCountry OUT of handleClick function - biggest debug!!

  const storeSavedCountry = async (name) => {
    try {
      const response = await fetch(
        "/api/save-one-country",
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

      if (!response.ok) {
        console.error("Error:", response.status);
        return false;
      }
      console.log(`${name} saved`);
      return true;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getStoredSavedCountry = async () => {
    const response = await fetch(
      "/api/get-all-saved-countries"
    );

    const savedCountryData = await response.json();

    const countryHasBeenSaved = savedCountryData.some(
      (savedCountry) => savedCountry.country_name === countryName
    );

    setIsSaved(countryHasBeenSaved);

    console.log(savedCountryData);
  };

  useEffect(() => {
    getStoredSavedCountry();
  }, []);

  async function handleClick() {
    if (country) {
      const grabbed = await storeSavedCountry(country.name.common);

      if (grabbed) {
        setIsSaved(true);
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
          <button
            className="save-button"
            onClick={handleClick}
            disabled={isSaved}
          >
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
          {/* useState variable of viewCount rendered here, viewCount represents updated count determined by setViewCount with functions that do the job */}
          <p>Viewed: {viewCount} times </p>
        </div>
      </div>
    </>
  );
}

export default CountryDetails;
