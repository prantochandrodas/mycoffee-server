const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;

const app=express();
require('dotenv').config();
app.use(express.json());
app.use(cors());



app.get('/', (req, res) => {
    res.send('mycoffee-server server is running')
});

app.listen(port, () => console.log(`mycoffee-server server is running on ${port}`))