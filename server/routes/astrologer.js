const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
require('../db/connecion');
const { body, validationResult } = require('express-validator');
const Astrologer = require("../models/Astrologer");


router.get("/testing", async (req, res) => {
  res.send("hello")
})


//create astrologer 
router.post("/createAstro", async (req, res) => {
  try {
    const astrologer = new Astrologer(req.body);
    await astrologer.save();
    res.status(201).json(astrologer);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "something went wrong" })
  }
})

//get astrologer
router.get("/getAstro/:id", async (req, res) => {
  try {
    const astrologer = await Astrologer.findById(req.params.id);
    if (!astrologer) {
      return res.status(404).json({ error: 'Astrologer not found' });
    }
    res.status(200).json(astrologer);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Something went wrong" });
  }
})

//put astrologer
router.put('/update/:id', async (req, res) => {
  try {
    const astrologer = await Astrologer.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!astrologer) {
      return res.status(404).json({ error: 'Astrologer not found' });
    }
    res.json(astrologer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete Astrologer by ID
router.delete('/delete/:id', async (req, res) => {
  try {
    const astrologer = await Astrologer.findByIdAndDelete(req.params.id);
    if (!astrologer) {
      return res.status(404).json({ error: 'Astrologer not found' });
    }
    res.json({ message: 'Astrologer deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//getall astrologer
router.get("/getAllAstrologer",async (req,res)=>{
  try{
    const astrologers = await Astrologer.find();
    res.status(200).json(astrologers);
  }catch(err){
    console.log(err);
    res.status(500).json({error:"Something went wrong"});
  }
})

//get Paginated data

router.get('/getPaginatedData', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 3;

  try {
    const astrologers = await Astrologer.find()
      .skip((page - 1) * limit)
      .limit(limit);
    
    const total = await Astrologer.countDocuments();

    res.json({
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      totalAstrologers: total,
      astrologers,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//get search query on name and expertise


router.get('/searchAstro', async (req, res) => {
  const { query } = req.query;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 3;

  try {
    const astrologers = await Astrologer.find({
      $or: [
        { name: new RegExp(query, 'i') },
        { expertise: new RegExp(query, 'i') },
        { languages: new RegExp(query, 'i') }
      ]
    })
    .skip((page - 1) * limit)
    .limit(limit);
    
    const total = await Astrologer.countDocuments({
      $or: [
        { name: new RegExp(query, 'i') },
        { expertise: new RegExp(query, 'i') },
        { languages: new RegExp(query, 'i') }
      ]
    });

    res.status(200).json({
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      totalAstrologers: total,
      astrologers,
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//sort the 
router.get('/astrologer/sort', async (req, res) => {
  const { sortBy } = req.query;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 3;

  if (!sortBy) {
    return res.status(400).json({ error: 'Missing required query parameter: sortBy' });
  }

  const sortOptions = {};
  const isStringField = ['name'].includes(sortBy); // Adjust this list as needed
  sortOptions[sortBy] = isStringField ? 1 : -1; // Ascending for strings, descending otherwise

  try {
    const astrologers = await Astrologer.find()
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Astrologer.countDocuments();

    res.status(200).json({
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      totalAstrologers: total,
      astrologers,
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.post("/createAstroBulk", async (req, res) => {
  try {
    const astrologers = req.body.astrologers;
    
    // Validate that the request body contains an array
    if (!Array.isArray(astrologers)) {
      return res.status(400).json({ error: "Request body must be an array of astrologers" });
    }
    
    const createdAstrologers = await Astrologer.insertMany(astrologers);
    res.status(201).json(createdAstrologers);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.get("/getAllAstrologers", async (req, res) => {
  try {
    const astrologers = await Astrologer.find(); // Fetch all astrologer records
    res.status(200).json(astrologers);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});
module.exports = router;