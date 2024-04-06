const express = require("express");
const pool = require("../config/db");
const app = express();

//Adding New Listing
app.post("/addNewListing", async (req, res) => {
  const {
    additional_features,
    brand,
    condition,
    description,
    gender,
    model,
    movement,
    price,
    price_currency,
    reference_number,
    scope_of_delivery,
    type_of_watch,
    userId,
    title,
  } = req.body;

  const insertQuery = `INSERT INTO vw_all_listings (additional_features, brand, condition, description, gender, model, movement, price, currency, reference_number, scope_of_delivery, type_of_watch, listing_created_at, listed_by_user_id, title) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, NOW(), $13, $14)`;

  const values = [
    JSON.stringify(additional_features),
    brand,
    condition,
    description,
    gender,
    model,
    movement,
    price,
    price_currency,
    reference_number,
    scope_of_delivery,
    type_of_watch,
    userId,
    title,
  ];

  try {
    const result = await pool.query(insertQuery, values);
    console.log("New listing added successfully");
    res.status(200).send("New listing added successfully");
  } catch (error) {
    console.error("Error inserting new listing:", error);
    res.status(500).send("Error inserting new listing");
  }
});

module.exports = app;
