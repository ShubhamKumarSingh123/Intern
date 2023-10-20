const mongoose = require("mongoose");

const UserDetailsSchema = new mongoose.Schema(
  {
    url: String,
  },
  {
    collection: "textExtract",
  }
);
mongoose.model("textExtract", UserDetailsSchema);
