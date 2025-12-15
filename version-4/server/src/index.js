/* --------------------------------
Server/API for Countries App Version 4

DB Fiddle Link: https://www.db-fiddle.com/f/7ncBR6fiiE59JbEwtrYn1W/11
----------------------------------*/
// importing Node Modules
import express from "express";
import pg from "pg"; // pg stands for PostgreSQL, for connecting to the database
import config from "./config.js"; // importing the connection string to our database hosted on Neon

//connecting to our PostgreSQL database, or db for short
const db = new pg.Pool({
  // new pg.Pool() creates a connection to the database
  connectionString: config.databaseUrl, // credentials to access the database. Keep private!
  ssl: true, // use SSL encryption when connecting to the database to keep data safe
});

const app = express(); // create an instance of the Express module, which gives us access to all of Express's functions, methods, useful superpowers

app.use(express.json()); // This server will receive and respond to requests with JSON data

const port = 3000; // Setting which port to listen or receive requests

app.listen(port, () => {
  console.log(`Server is listening on port ${port}!`);
});

/*----------------------------------
Helper Functions
----------------------------------*/

async function getNewestUser() {
  const data = await db.query(
    "SELECT * FROM users ORDER BY user_id DESC LIMIT 1"
  );
  console.log(data.rows);
  return data.rows;
}

async function getAllUsers() {
  const data = await db.query("SELECT * FROM users");
  return data.rows;
}

async function addOneUser(name, country_name, email, bio) {
  const data = await db.query(
    "INSERT INTO users (name, country_name, email, bio) VALUES ($1, $2, $3, $4) RETURNING *",
    [name, country_name, email, bio]
  );
  console.log(data.rows[0]);
  return data.rows[0];
}

//Necessary function for retrieving saved countries added
// Error handling not necessary in helper functions, only in API

// Reformulate SELECT all countries from saved countries table
// Should I pass through saved_countries?
async function getAllSavedCountries() {
  const data = await db.query("SELECT * FROM saved_countries");
  return data.rows;
}

async function saveOneCountry(country_name) {
  const data = await db.query(
    "INSERT INTO saved_countries (country_name) VALUES ($1) ON CONFLICT (country_name) DO NOTHING;",
    [country_name]
  );
}

// Fix query - refer back to db fiddle, looks like correct formatting from there
// DB Fiddle counts was wrong?
// Need to pass something through and the return is data
async function updateOneCountryCount(country_name) {
  const data = await db.query(
    "INSERT INTO country_counts (country_name, count) VALUES ($1, 1) ON CONFLICT (country_name) DO UPDATE SET count = country_counts.count + 1 RETURNING *;",
    [country_name]
  );
  console.log("Updated country count", data.rows[0].count);
  return data.rows[0].count;
}

/*----------------------------------
API Endpoints
----------------------------------*/

// Refer back to API documentation:
// https://github.com/AnnieCannons/countries-app-instructions/blob/main/version-4/api-documentation.md

app.get("/get-newest-user", async (req, res) => {
  try {
    const newestUser = await getNewestUser();
    if (newestUser) {
      res.json(newestUser);
    } else {
      // Returning a 404 better than 500 when nothing is found
      return res.status(404).json({ status: "No newest user found" });
    }
  } catch (error) {
    console.error("Error in /get-newest-user", error);
    res.status(500).json({ status: "Unable to retrieve newest user" });
  }
});

app.get("/get-all-users", async (req, res) => {
  try {
    const allUsers = await getAllUsers();
    res.json(allUsers);
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ status: "Unable to retrieve all users" });
  }
});

app.post("/add-one-user", async (req, res) => {
  const { name, country_name, email, bio } = req.body;
  await addOneUser(name, country_name, email, bio);
  res.send(`User has been successfully added`);
});

app.get("/get-all-saved-countries", async (req, res) => {
  // Removed some code, and removed and testing again after 500 error message - Dec 7th/put back error handling, keep in endpoint functions just not helper functions
  const savedCountries = await getAllSavedCountries();
  // Returns the array of country name strings from the helper function
  res.json(savedCountries);
});

// Create endpoint functions for saveOneCountry

app.post("/save-one-country", async (req, res) => {
  const { country_name } = req.body;
  await saveOneCountry(country_name);
  res.send(`Success! The country was saved.`);
});

// Country Counts Endpoint

// app.post("/update-one-country-count", async (req, res) => {
//   const { country_name } = req.body;

//   try {
//     const currentCount = await updateOneCountryCount(country_name);

//     if (!currentCount) {
//       return res.status(500).json({ error: "Failed to update count" });
//     }
//     return res.status(200).json({ count: currentCount });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Error retrieving count" });
//   }
// });

// create a variable or use dot notation to tap into count?
// Response currently coming back as:
// {
//     "count": {
//         "country_count_id": 11,
//         "country_name": "France",
//         "count": 3
//     }
// }

app.post("/update-one-country-count", async (req, res) => {
  const { country_name } = req.body;
  const count = await updateOneCountryCount(country_name);

  res.json({ count: count });
});
