require("dotenv").config();

const express = require("express");
const cors = require("cors");
const router = require("./src/Routes");
const PORT = process.env.PORT || 4130;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1", router);
app.use(express.static("public"));

app.listen(PORT, () => console.log(`Server running on Port ${PORT}...`))