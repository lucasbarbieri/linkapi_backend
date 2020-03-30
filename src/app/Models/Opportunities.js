const env = require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const schema = new mongoose.Schema({
  total: "number",
  created_at: "date"
});

module.exports = mongoose.model("Opportunities", schema);
