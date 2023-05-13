const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
const app=express();
require('dotenv').config();
app.use(express.json());
app.use(cors());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pbafkul.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


async function run() {
    try {

        const bannerCollection = client.db('mycoffee').collection('banners');
        const menusCollection = client.db('mycoffee').collection('menus');
       

         app.get('/banners',async(req,res)=>{
            const query={};
            const result = await bannerCollection.find(query).toArray();
            res.send(result);
        });

        app.get('/homemenus',async(req,res)=>{
            const query={};
            const result = await menusCollection.find(query).limit(3).toArray();
            res.send(result);
        });
        app.get('/menus',async(req,res)=>{
            const query={};
            const result = await menusCollection.find(query).toArray();
            res.send(result);
        });
    } finally {
       
    }
}
run().catch(error => console.log(error));

app.get('/', (req, res) => {
    res.send('mycoffee-server server is running')
});

app.listen(port, () => console.log(`mycoffee-server server is running on ${port}`))