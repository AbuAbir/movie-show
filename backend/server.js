import express from 'express';
import mongoose from 'mongoose';
import Movies from './dbModel.js';
import Data from './data.js';
import Cors from "cors";

// app config
const app = express();
const port = process.env.port || 9000;


// middlewares
app.use(express.json());
app.use(Cors());

// DB config, I am using mongo atlas, local mongo is also okay
const connection_url = 'mongodb+srv://<user>:<pass>@cluster0.9yqhd.mongodb.net/movie-flix?retryWrites=true&w=majority';

const conn = mongoose.connect(connection_url, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    });

// api endpoints
app.get("/", (req, res) => 
    res.status(200).send("in the base url")
);


// v1 is for local testing, v2 is in the Mongo Atlas cloud
app.get("/v1/posts", (req, res) => 
    res.status(200).send(Data)
);

app.get("/v2/posts", (req, res) => 
    Movies.find((err, data) => {
        if (err){
            res.status(500).send(err);
        }
        else{
            res.status(201).send(data);
        }
    })
);

app.post('/v2/posts', (req, res) => {
    // post request to add Video Document to Video Collection
    const dbMovies = req.body;
    Movies.create(dbMovies, (err, data) => {
        if (err){
            res.status(500).send(err);
        }
        else{
            res.status(201).send(data);
        }
    })

});

// app listeners
app.listen(port, ()=> console.log(`Listening on localhost: ${port}`));
