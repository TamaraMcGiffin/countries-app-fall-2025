# 🌎 Countries App 🇬🇧

## 📌 Project Description & Purpose 

This project is the "graduation piece" of my first year in development. 🌟 It marks my transition from learning the foundations of code as a beginner from frontend, backend and building a database to finally building a fully functional, full-stack application.

## 🚀 Live Site

Check out the app: https://countries-app-tamara.netlify.app/

## 🖼️ Screenshots



<img width="1465" height="901" alt="image" src="https://github.com/user-attachments/assets/79340eb7-ba65-457b-acbc-7a8d8ecd93b4" />


## ✨ Features

This is what you can do on the app:

- View a list of countries from around the world, complete with stats along with their official national flags
- Create a user profile using the form on Saved Countries Page
- Save countries to database


## 🛠️ Tech Stack

**Frontend**

- **Languages:** Javascript, HTML & CSS
- **Framework:** React
- **Deployment:** Netlify

**Server/API**

- **Languages:** Node.js
- **Framework:** Express
- **Deployment:** Render and Netlify

**Database**

- **Languages:** PostgreSQL
- **Deployment:** Neon

## 🔹 API Documentation

These are the API endpoints I built:

1. /get-all-users
2. /get-newest-user
3. /add-one-user
4. /update-one-country-count
5. /get-all-saved-countries
6. 	/save-one-country

Learn more about the API endpoints here: https://github.com/AnnieCannons/countries-app-instructions/blob/main/version-4/api-documentation.md

## 🗄️ Database Schema

Here's the SQL I used to create my tables:

```sql
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  country_name VARCHAR NOT NULL,
  email VARCHAR NOT NULL UNIQUE,
  bio VARCHAR NOT NULL
);
```

```sql
CREATE TABLE saved_countries (
  saved_country_id SERIAL PRIMARY KEY,
  country_name VARCHAR NOT NULL UNIQUE
);
```

```sql
CREATE TABLE country_counts (
  country_count_id SERIAL PRIMARY KEY,
  country_name VARCHAR NOT NULL UNIQUE,
  count INTEGER NOT NULL
);
```

## 💭 Reflections

**What I learned:** I learned how multiple pages work together, gained a deeper understanding of creating async functions and combining the front-end with the back-end, and how to create my own database!

**What I'm proud of:** I'm proud of learning and creating this web app from front to back, I'm happy with the results and I learned that I am really good with building the server side as well as the database

**What challenged me:** Learning to build the functions and getting comfortable with if/else statements and building confidence using ternary operators.

**Future ideas for how I'd continue building this project:**

1. Toggle for Light & Dark Mode
2. Hearts for saving the countries
3. Filters for regions
4. A map!

## 🙌 Credits & Shoutouts

Thanks to my instructor Arianna for teaching me how to build this app from start to finish!
And thanks to Bakari and Makeba, the TA's who helped guide me in debugging and build the app along the way!

