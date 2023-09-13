const mongoose = require("mongoose");
const { Schema } = mongoose;

const locationdata = new Schema({
    state: {type:String, required:true},
    district: {type:String, default: "da"},
    block: {type:String, default: "ba"}
})
const botiyauser = new Schema({
  locationdata: locationdata,
  image: {type: Buffer},
  phoneNo: { type: Number, required: true, unique: false , index: false},
  name: {type: String, required:true  },
  fathername: {type: String},
  casteType: {type: String, default:"Jas"},
  position: {type: String, default:"Normal"},
  address: {type:String},
  jodate: {type: String},
  expdate: {type: Date},
  idNO: {type: Number, default: 0}
});
botiyauser.pre('save', function (next) {
  const doc = this;
  // Check if the document is new (i.e., doesn't already have an ID)
  if (doc.isNew) {
    // Find the highest existing ID number and increment it by 1
    mongoose.model("BotiyaUser", botiyauser)
      .aggregate([
        { $group: { _id: null, maxID: { $max: "$idNO" } } }
      ])
      .exec()
      .then(function (result) {
        doc.idNO = result[0].maxID + 1;
        next();
      })
      .catch(function (err) {
        next(err);
      });
  } else {
    next();
  }
});

module.exports = mongoose.model("BotiyaUser", botiyauser);
