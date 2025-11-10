import "../App.css";
import { useState, useEffect } from "react";
import "../App.jsx";
import CountryCard from "../components/CountryCard.jsx";

function SavedCountries({ countriesData }) {
  // Declaring a variable for the empty form state with the key names & value pairs
  const emptyFormState = { fullName: "", email: "", country: "", bio: "" };

  // This holds the current state of the form inputs
  const [formData, setFormData] = useState(emptyFormState);

  // This holds the user's profile information, if a user previously submitted the form
  const [userInfo, setUserInfo] = useState(null);

  // Changed state from 'null' to empty array, per research - goal is to return an array and not an object
  const [savedCountries, setSavedCountries] = useState([]);

  // Update the state when input values change
  const handleInputChange = (e) => {
    // Destructuring method used to extract name & value properties
    const { name, value } = e.target;
    // Setting formData's useState using a key/value pair
    setFormData({ ...formData, [name]: value });
  };

  // Step 1: Declare a new function called storeUserData() which should send a POST request to the API to the /add-one-user endpoint
  // Step 2: Call the storeUserData() function on submit

  const storeUserData = async () => {
    // When we call the fetch() function, we only need to pass in
    // The API url as one parameter when it's a GET request
    // When we need to make a POST request, we have to pass in a second parameter: an Object
    const response = await fetch(
      "/api/add-one-user",
      {
        method: "POST", // We need to say we're sending a POST request because by default it's always a GET request
        headers: {
          // Headers is where we put metadata about our request, including the data type that we pass in the body
          // In this case, we are saying we're passing in JSON data in the body
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.fullName,
          country_name: formData.country,
          email: formData.email,
          bio: formData.bio,
        }),
      }
    );
  };
  // handleSubmit function handles the event (e) object when form is submitted, preventDefault keeps it from reloading
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData, "form was submitted");

    storeUserData();
    // Setting user info to formData
    setUserInfo(formData);
    // Resets the form to empty state
    setFormData(emptyFormState);
  };

  // Step 1: Make a function called getNewestUser() that will get the form data from the API by sending a GET request to the /get-newest-user-endpoint

  // Step 2: Save the form data in a state variable using useState()

  const getNewestUser = async () => {
    // Declare a variable that will hold the response from the GET request to /get-newest-user
    const response = await fetch(
      "/api/get-newest-user"
    );
    // Turn the response into json format
    const data = await response.json();
    console.log(data);
    const newestUserFromAPI = data[0];
    // Save the data in state
    setUserInfo({
      fullName: newestUserFromAPI.name,
      email: newestUserFromAPI.email,
      country: newestUserFromAPI.country,
      bio: newestUserFromAPI.bio,
    });
  };

  // Step 3: Call the getNewestUser() function on page load in the useEffect()

  // Step 4: Conditionally render the user's name in the return statement (in JSX) if the user's name exists
  // Add more steps as needed!

  // Create a function for rendering, other function will be for separate purposes - rename according to task

  const renderSavedCountries = async () => {
    try {
      const response = await fetch(
        "/api/get-all-saved-countries"
      );

      if (!response.ok) {
        console.error("Error", response.status);
        return;
      }

      const savedCountryData = await response.json();

      const savedCountryList = savedCountryData.map(
        (item) => item.country_name
      );
      // Fixed misspelling names to name
      const allSavedCountries = countriesData.filter((country) =>
        savedCountryList.includes(country.name.common)
      );
      setSavedCountries(allSavedCountries);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //Call renderSavedCountries in useEffect

  useEffect(() => {
    getNewestUser();
    renderSavedCountries();
  }, []);

  return (
    <>
      <h2> My Saved Countries</h2>
      {/* Ternary operator - if userInfo is true then to return the welcome message inlucding/accessing user's full name using dot notation */}
      {userInfo && <h2>Welcome {userInfo.fullName}!</h2>}

      <div className="form-container">
        <h2> My Profile </h2>
        {/* Form has onSubmit handler that calls the handleSubmit function, when user clicks submit form button */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            name="fullName"
            id="fullName"
            // Extracts the full name value from formData (using dot notation) - which is submitted by user
            value={formData.fullName}
            // onChange calls the handleInputChange function, which changes or updates the new input or value submitted by user in the form
            onChange={handleInputChange}
          />

          <input
            type="text"
            placeholder="Email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleInputChange}
          />

          <input
            type="text"
            placeholder="Country"
            name="country"
            id="country"
            value={formData.country}
            onChange={handleInputChange}
          />

          <textarea
            id="bio"
            placeholder="Bio"
            name="bio"
            rows="4"
            cols="50"
            value={formData.bio}
            onChange={handleInputChange}
          />
          <br />
          <br />
          <button className="form-button" type="submit">
            Submit
          </button>
        </form>
      </div>
      <div className="saved-countries-list">
        {savedCountries &&
          savedCountries
            .filter((country) => country != null)
            .map((country) => (
              <CountryCard key={country.cca3} country={country} />
            ))}
      </div>
    </>
  );
}

export default SavedCountries;
