const express = require("express");
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

//user - marsTravelUser
//pass - kpV83C1feSHe8DIV
// hello

const uri = "mongodb+srv://marsTravelUser:kpV83C1feSHe8DIV@cluster0.xd7k8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
    try {
        await client.connect()
        const database = client.db('mars_Travel')
        const packageCollection = database.collection('packages');


        //GET PACKAGES API
        app.get('/packages', async (req, res) => {
            const cursor = packageCollection.find({});
            const packages = await cursor.toArray();
            res.send(packages)
        })
    }
    finally {
        // await client.close();
    }
}

run().catch(console.dir)


app.get('/', (req, res) => {
    res.send('Mars Travel is Running');
});

app.listen(port, () => {
    console.log('Server running', port);
});