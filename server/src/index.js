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
  try {
    const data = await db.query(
      "SELECT * FROM users ORDER BY user_id DESC LIMIT 1"
    );
    return data.rows[0];
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

async function getAllUsers() {
  try {
    const data = await db.query("SELECT * FROM users");
    return data.rows;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

async function addOneUser(name, country_name, email, bio) {
  try {
    const result = await db.query(
      "INSERT INTO users (name, country_name, email, bio) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, country_name, email, bio]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

//Necessary function for retrieving saved countries added

async function getAllSavedCountries() {
  try {
    const data = await db.query(
      "SELECT DISTINCT country_name FROM users WHERE country_name IS NOT NULL AND country_name != '' ORDER BY country_name ASC"
    );
    return data.rows.map((row) => row.country_name);
  } catch (error) {
    console.error("Error", error);
    //needs to return empty array
    return [];
  }
}
/*----------------------------------
API Endpoints
----------------------------------*/
// Reminder: use terminal to cd to src folder in server, node index.js to activate server port for Postman

// Endpoint successfully tested in Postman

// Debugging note for backend: missing api/ on endpoints? 404 Error message

// app.get("/get-newest-user", async (req, res) => {
//   try {
//     const newestUser = await getNewestUser();
//     if (newestUser) {
//       res.json(newestUser);
//     } else {
//       return res.status(500).json({ status: "Unable to retrive newest user" });
//     }
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ status: "Unable to retrieve newest user" });
//   }
// });

// // Endpoint successfully tested in Postman

// app.get("/get-all-users", async (req, res) => {
//   try {
//     const allUsers = await getAllUsers();
//     res.json(allUsers);
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ status: "Unable to retrieve all users" });
//   }
// });

// // Note for later: Must put POST where form lives - in SavedCountries.jsx

// // POST request body for testing, no user id needed
// // {
// //     "name": "Tamara",
// //     "country_name": "USA",
// //     "email": "tamara@world.com",
// //     "bio": "Social Justice Warrior"
// // }

// // Endpoint successfully tested in Postman!!

// app.post("/add-one-user", async (req, res) => {
//   const { name, country_name, email, bio } = req.body;

//   if (!name || !country_name || !email) {
//     return res.status(400).json({ status: "Missing user information" });
//   }

//   try {
//     const newUser = await addOneUser(name, country_name, email, bio);

//     res.status(201).json(newUser);
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ status: "Failed to add new user" });
//   }
// });

//SECOND ATTEMPT: Need to test first one with backend running, forgot to run server side
// Add /api to endpoints to match frontend calls

app.get("/api/get-newest-user", async (req, res) => {
  try {
    const newestUser = await getNewestUser();
    if (newestUser) {
      res.json(newestUser);
    } else {
      // Returning a 404 better than 500 when nothing is found
      return res.status(404).json({ status: "No newest user found" });
    }
  } catch (error) {
    console.error("Error in /api/get-newest-user:", error);
    res.status(500).json({ status: "Unable to retrieve newest user" });
  }
});

app.get("/api/get-all-users", async (req, res) => {
  try {
    const allUsers = await getAllUsers();
    res.json(allUsers);
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ status: "Unable to retrieve all users" });
  }
});

app.post("/api/add-one-user", async (req, res) => {
  const { name, country_name, email, bio } = req.body;

  if (!name || !country_name || !email) {
    return res.status(400).json({ status: "Missing user information" });
  }

  try {
    const newUser = await addOneUser(name, country_name, email, bio);

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ status: "Failed to add new user" });
  }
});

//The missing endpoint that caused the 500 error!
app.get("/api/get-all-saved-countries", async (req, res) => {
  try {
    const savedCountries = await getAllSavedCountries();
    // Returns the array of country name strings from the helper function
    res.json(savedCountries);
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ status: "Unable to retrieve saved countries" });
  }
});
