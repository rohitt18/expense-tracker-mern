const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
require("dotenv").config();
const app = express();

const router = require("./routes/transactions");
const connectDB = require("./db/connect");

app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1/transactions", router);

app.get("/", (req, res) => res.send("app is running"));

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    app.listen(
      PORT,
      console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
          .bold
      )
    );
    await connectDB(process.env.MONGO_URI);
  } catch (err) {
    console.log(`Error: ${err.message}`.red);
  }
};

start();
