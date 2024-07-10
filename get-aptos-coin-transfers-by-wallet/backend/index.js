import fetch from "node-fetch";
import express from "express";
const app = express();
const port = 5001;
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

app.use(cors());
app.use(express.json());

const MORALIS_API_KEY = process.env.MORALIS_API_KEY;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    "X-API-Key": MORALIS_API_KEY,
  },
};

app.get("/getcointransfers", async (req, res) => {
  const { query } = req;
  try {
    fetch(
      `https://mainnet-aptos-api.moralis.io/wallets/coins/transfers?limit=10&offset=0&owner_addresses=${query.address}`,

      options
    )
      .then((response) => response.json())
      .then((response) => {
        return res.status(200).json(response);
      });
  } catch (e) {
    console.log(`Something went wrong ${e}`);
    return res.status(400).json();
  }
});

app.listen(port, () => {
  console.log(`Listening for API Calls`);
});
