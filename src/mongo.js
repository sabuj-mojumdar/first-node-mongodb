const { MongoClient } = require('mongodb');
const express = require('express');
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;


const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
/*
mongodb
user: my_firstdb1
password: Ih92cHtpsJKYIjvH
*/
app.get('/', (req, res) => {
    res.send("running my crud surver");
})

app.listen(port, () => {
    console.log("running servier in Port");
})

const uri = "mongodb+srv://my_firstdb1:Ih92cHtpsJKYIjvH@cluster0.wff6x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db("student");
        const address = database.collection("address");
        //get api
        app.get('/users', async (req, res) => {
            const cursor = address.find({});
            const users = await cursor.toArray();
            res.send(users);
        })
        app.get('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const user = await address.findOne(query);
            console.log("load user with id: ", id);
            res.send(user);
        })
        //post api
        app.post('/users', async (req, res) => {
            const newUser = req.body;
            const result = await address.insertOne(newUser);
            console.log('added user', result)
            res.json(result);
        })
        //delete api
        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await address.deleteOne(query);
            console.log("deleting user with id", result);

            res.json(result);
        })

    }
    finally {
        // await client.close();
    }
}
run().catch(console.dir);


