const express = require("express");
const { MongoClient } = require('mongodb');
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());



const uri = "mongodb+srv://marsTravelUser:kpV83C1feSHe8DIV@cluster0.xd7k8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
    try {
        await client.connect()
        const database = client.db('mars_Travel')
        const packageCollection = database.collection('packages');
        const userCollection = database.collection('users');


        //GET PACKAGES API
        app.get('/packages', async (req, res) => {
            const cursor = packageCollection.find({});
            const packages = await cursor.toArray();
            res.send(packages)
        })
        //GET Users API
        app.get('/users', async (req, res) => {
            const cursor = userCollection.find({});
            const users = await cursor.toArray();
            res.send(users);
        })

        //Get Single Package
        app.get('/packages/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const package = await packageCollection.findOne(query);
            res.json(package);
        })

        //POST API
        app.post('/packages', async (req, res) => {
            const service = req.body;
            console.log('post api hitted', service);
            const result = await packageCollection.insertOne(service);
            console.log(result);
            res.json(result)
        })
        app.post('/users', async (req, res) => {
            const user = req.body;
            console.log('2nd post api hitted', user);
            const result = await userCollection.insertOne(user);
            console.log(result);
            res.json(result)
        })

        // Delete API
        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await userCollection.deleteOne(query);
            console.log('Deleted', result);
            res.json(result);
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