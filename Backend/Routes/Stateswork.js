const express = require("express");
const router = express.Router();
const State = require("../Models/States");
const mongoose = require("mongoose");

router.post("/add", async (req, res) => {
  try {
    await State.insertMany(req.body);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
  res.send(req.body);
});
router.get("/find", async (req, res) => {
  try {
    const city = await State.find({});
    res.json(city)
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
 
});
router.delete("/delete", async (req, res) => {
  try {
    await Cities.deleteOne({ name: req.body.name });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
  res.send(req.body);
});
router.get("/getallcity", async (req, res) => {
  console.log(req.body);
  try {
    const city = await Cities.find({});

    res.json(city);
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
});
router.post("/state/:stateName/district/:districtName/block", async (req,res)=>{
  try {
    const { stateName, districtName} = req.params; // Get the state name and district ID from the request parameters
    const { blockName } = req.body; // Get the name of the block to be added from the request body

    // Convert the districtId parameter to an ObjectId

    // Find the state with the given name and update the district with the given ID by adding a new block
    const state = await State.findOneAndUpdate(
      { state: stateName, 'district.name': districtName },
      { $push: { 'district.$.block': { name: blockName } } },
      { new: true }
    );

    if (!state) {
      // If the state or district is not found, return an error response
      return res.status(404).json({ error: 'State or district not found' });
    }

    // If the update is successful, return the updated state as the response
    res.json(state);
  } catch (error) {
    // If an error occurs, return an error response
    res.status(500).json({ error: error.message });
  }
});

router.post('/add-district/:stateName', async (req, res) => {
  try {
    const { stateName } = req.params;
    const { districtName, blockName } = req.body;

    // Find the state by name
    const state = await State.findOne({ state: stateName });

    if (!state) {
      return res.status(404).json({ message: `State ${stateName} not found` });
    }

    // Add the new district to the state's district array
    state.district.push({ name: districtName, block: { name: blockName } });

    // Save the updated state to the database
    await state.save();

    return res.json(state);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = router;
