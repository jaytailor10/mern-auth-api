const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

//connect to DB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("DB CONNECTED"));
mongoose.connection.on("error", (err) => {
  console.log(`DB connection error: ${err.message}`);
});

//import routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

//it is important that we usew app middleware before middlewares
//app middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());

//app.use(cors()); //allowsall origins

if ((process.env.NODE_ENV = "development")) {
  app.use(cors({ origin: `http://localhost:3000` }));
}

//middleware, any time you use middleware "use" is used from express

app.use("/api", authRoutes);
app.use("/api", userRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`API is running on port ${port}`);
});
