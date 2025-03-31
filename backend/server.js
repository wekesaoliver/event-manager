const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000; //port to run the server
const app = express();

app.use(cors()); //middleware to allow cross-origin requests
app.use(express.json()); //middleware to parse JSON data from requests

app.use("/api/auth", require("./routes/authRouter")); //auth routes
app.use("/api/events", require("./routes/eventRouter")); //event routes

app.listen(PORT, () => {
    console.log(`Server running via http://localhost:${PORT}`);
});
