const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const GotSchema = new Schema(
  {
    name: { type: String, require: true },
    leader: { type: String, require: true },
    motto: { type: String, require: true },
    location: { type: String, require: true },
    img: { type: String, require: true },
  },
  { timestamps: true }
);

const Got = mongoose.model("gots", GotSchema);
module.exports = Got;
