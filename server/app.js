// Import required packages
const express = require('express');


const cors = require('cors'); // Import CORS


require("./db/connecion")
const astrologer=require('./routes/astrologer')


const app = express();

app.use(express.json());
app.use(cors());



app.use("/astrologer",astrologer);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
