const express = require("express");
const router = express.Router();
const multer = require('multer');
const BotiyaUser = require("../Models/User/CreateUser");
const { body, validationResult } = require("express-validator");
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/state/:stateName/district/:districtName/block/:blockName", upload.single('image'), async (req, res) => {
   
    const {stateName,districtName,blockName}= req.params;
    const {phoneNo,name,casteType,position,date,address,fathername} = req.body;
    const imageBuffer = req.file.buffer;
   
    console.log(phoneNo)
    // Convert the blob file to a buffer or base64-encoded string
   // const buffer = Buffer.from(image, 'base64');
   
    const newuser = new BotiyaUser(
        {locationdata: {state:stateName,district : districtName,block: blockName},phoneNo,name,casteType,position,image: imageBuffer,jodate: date,address,fathername},
       
    )
  
 
     try {
    const savedUser = await newuser.save();
      res.json(savedUser)
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }


  });
router.get("/phoneNo/:phoneNo", async (req, res) => {
   
    const {phoneNo}= req.params;
  try {
    const users = await BotiyaUser.find({phoneNo});
      res.json(users)
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }


  });

  router.get("/state/:stateName/district/:districtName/block/:blockName", async (req,res)=>{
    try {
      const { stateName, districtName,blockName} = req.params; // Get the state name and district ID from the request parameters
      // Get the name of the block to be added from the request body
  
      // Creating a filter for getting the data
      const filter = {
        'locationdata.state': stateName,
        // ...(districtName !== "NA" ? {'locationdata.district': districtName} : {}),
        // ...(blockName !== "NA" ? {'locationdata.block': blockName} : {})
      };
  
      // Find the state with the given name and update the district with the given ID by adding a new block
      const searcheduser = await user.find(
        {'locationdata.state': stateName ,...(districtName !== "NA" ? {'locationdata.district': districtName} : {}),}
      );
  
      if (!stateName) {
        // If the state or district is not found, return an error response
        return res.status(404).json({ error: 'State or district not found' });
      }
  
      // If the update is successful, return the updated state as the response
      res.json(searcheduser);
    } catch (error) {
      // If an error occurs, return an error response
      res.status(500).json({ error: error.message });
    }
  });
module.exports = router;