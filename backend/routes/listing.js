const express = require("express");
const pool = require("../config/db");
const app = express();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/listing");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

//Adding New Listing
app.post("/addNewListing", upload.array("images"), async (req, res) => {
  const files = req.files;
  const fileUrls = files.map((file) => file.path);
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

  const insertQuery = `INSERT INTO vw_all_listings (additional_features, brand, condition, description, gender, model, movement, price, currency, reference_number, scope_of_delivery, type_of_watch, listing_created_at, listed_by_user_id, title, image_gallery) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, NOW(), $13, $14 , $15)`;
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
    JSON.stringify(fileUrls),
  ];
  try {
    const result = await pool.query(insertQuery, values);
    res.status(200).send("New listing added successfully");
  } catch (error) {
    res.status(500).send("Error inserting new listing");
  }
});

module.exports = app;
