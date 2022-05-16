const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require ('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.k7v69.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
  try{
    await client.connect();
    const serviceCollection = client.db("doctors_portal").collection("services");
    const bookingCollection = client.db("doctors_portal").collection("booking");
    
    // Get All Service
    app.get('/service', async (req, res) => {
      const query ={};
      const cursor = serviceCollection.find(query);
      const services = await cursor.toArray();
      res.send(services);
    });

    // Get Booking Section
    app.post('/booking', async (req, res) => {
      const booking = req.body;
      const result = await bookingCollection.insertOne(booking);
      res.send(result);
    });

  } finally{

  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
  res.send('Hello Doctors!')
})

app.listen(port, () => {
  console.log(`Doctors app listening on port ${port}`)
})