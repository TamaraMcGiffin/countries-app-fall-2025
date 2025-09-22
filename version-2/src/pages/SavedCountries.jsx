import "../App.css";
import { useState, useEffect } from "react";
import "../App.jsx";

function SavedCountries({ countriesData }) {
  // Declaring a variable for the empty form state with key names including values of empty strings
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

  // handleSubmit function handles the event (e) object when form is submitted, preventDefault keeps it from reloading
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData, "form was submitted");

    //declaring variable called 'stringify' use to house the stringify method targeting the formData
    let stringified = JSON.stringify(formData);
    // using setItem method to save to localStorage
    localStorage.setItem("profile", stringified);

    // setting user info to formData
    setUserInfo(formData);
    // resets the form to empty state
    setFormData(emptyFormState);
  };

  // Here I am using a conditional statement in useEffect for profile in getItem to convert the string of key/value pairs into a JSON formatted object using the destringify method
  useEffect(() => {
    if (localStorage.getItem("profile")) {
      let profileDeStringified = JSON.parse(localStorage.getItem("profile"));
      setUserInfo(profileDeStringified);
    }
  }, []);

  // Here I am using another useEffect function to access the key "saved-countries" which has been saved to localStorage
  useEffect(() => {
    // Declaring a variable of saved to represent the JSON parse/getItem method for cleaner code
    // JSON parse is used to convert JSON string into an object or array
    let saved = JSON.parse(localStorage.getItem("saved-countries"));

    // Setting saved countries (list of saved countries) of the items retrieved from localStorage using the getItem method saved in the variable above
    setSavedCountries(saved);
    console.log("saved", saved);
  }, []);

  return (
    <>
      {/* Ternary operator - if userInfo is true then to return the welcome message inlucding/accessing user's full name using dot notation */}
      {userInfo ? (
        <h2>Welcome {userInfo.fullName}!</h2>
      ) : (
        // If false :  render the form
        <div className="form-container">
          <br />
          <h2> My Saved Countries</h2>
          <div>{/* </CountryCard> */}</div>
          <br />

          <h2> My Profile </h2>
          {/* Form has onSubmit handler that calls the handleSubmit function, when user clicks submit form button */}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Full Name"
              name="fullName"
              id="fullName"
              // Extracts value of formData input by user in full name
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
      )}
    </>
  );
}

export default SavedCountries;
