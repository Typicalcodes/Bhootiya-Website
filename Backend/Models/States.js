const mongoose = require("mongoose");
const { Schema } = mongoose;

const block = new Schema({
  name : {type: String, default: "NA"}
})
const district = new Schema({
  name: { type: String, required: true },
  block: [block]
})
const StateSchema = new Schema({
  state: { type: String, required: true },
  district: [district]
});
module.exports = mongoose.model("state", StateSchema);
