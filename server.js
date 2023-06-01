const mongoose = require("mongoose");

const app = require("./app");

const DB_HOST =
  "mongodb+srv://Yulia:aEh68cJCvowYn4Dd@hw-rest-api.ckyqju9.mongodb.net/db-contacts?retryWrites=true&w=majority";
const PORT = 3000;

// const {DB_HOST, PORT = 3000} = process.env;

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT);
    console.log("Database connection successful!  ;)");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
