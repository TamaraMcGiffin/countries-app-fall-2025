import "../App.css";
import { useState } from "react";
import "../App.jsx";

function SavedCountries({ countryData}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "",
    bio: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  function handleSubmit(event) {
    event.preventDefault();
    console.log(formData, "formData");
    setFormData({ name: "", email: "", country: "", bio: "" });
  }

  return (
    <>
      <div className="form-container">
        <br />
        <h2> My Saved Countries</h2>
        <br />

        <h2> My Profile </h2>

        <form onSubmit={handleSubmit}>
          {/* <label htmlFor="name">Name</label> */}
          <input
            type="text"
            placeholder="Full Name"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
          />

          {/* <label htmlFor="email">Email</label> */}
          <input
            type="text"
            placeholder="Email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
          />
          {/* 
          <label htmlFor="country">Country</label> */}
          <input
            type="text"
            placeholder="Country"
            name="country"
            id="country"
            value={formData.country}
            onChange={handleChange}
          />

          {/* <label htmlFor="bio">Bio</label> */}
          <textarea
            id="bio"
            placeholder="Bio"
            name="bio"
            rows="4"
            cols="50"
            value={formData.bio}
            onChange={handleChange}
          />
          <br />
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}

export default SavedCountries;
