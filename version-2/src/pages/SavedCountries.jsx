import "../App.css";
import { useState, useEffect } from "react";
import "../App.jsx";

// took countriesData prop out to make sure not interfering
function SavedCountries({ countriesData }) {
  //declaring a variable for the empty form state with key names including values of empty strings
  const emptyFormState = { fullName: "", email: "", country: "", bio: "" };

  // this holds the current state of the form inputs
  const [formData, setFormData] = useState(emptyFormState);

  // this holds the user's profile information, if a user previously submitted the form
  const [userInfo, setUserInfo] = useState(null);

  // Update the state when input values change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData, "form was submitted");

    //declaring variable called 'stringify' use to house the stringify method targeting the formData
    let stringified = JSON.stringify(formData);
    // using setItem method to save to localStorage
    localStorage.setItem("profile", stringified);

    setUserInfo(formData);
    // reset the form to empty state
    setFormData(emptyFormState);
  };

  // Here I am using a conditional statement in useEffect for profile in getItem to convert the string of key/value pairs into a JSON formatted object using the destringify method
  useEffect(() => {
    if (localStorage.getItem("profile")) {
      let profileDeStringified = JSON.parse(localStorage.getItem("profile"));
      setUserInfo(profileDeStringified);
    }
  }, []);

  return (
    <>
      {/* Conditionally render the welcome message only if there userInfo and if true to render the message without the form, this sign : means to render either one element or the other element based on which conditions are met */}
      {userInfo ? (
        <h2>Welcome {userInfo.fullName}!</h2>
      ) : (
        <div className="form-container">
          <br />
          <h2> My Saved Countries</h2>
          <br />

          <h2> My Profile </h2>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Full Name"
              name="fullName"
              id="fullName"
              value={formData.fullName}
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
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </>
  );
}

export default SavedCountries;
