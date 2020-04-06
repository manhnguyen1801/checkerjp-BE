const express = require('express');

const app = express();
const mongoose = require('mongoose');
require('dotenv/config');

const bodyParser = require('body-parser');

const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(
    process.env.DBCONNECTION,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true
    },
    () => {
        console.log('connect to asdasd DB 1');
    }
);

// mongoose.connect(process.env.DBCONNECTION, { useUnifiedTopology: true, useNewUrlParser: true }).
//   then(() => console.log('Connected')).
//   catch(err => console.log('Caught', err.stack));
    
//Post
const postsRoute = require('./routes/posts');
app.use('/api/posts', postsRoute);
    
// Users
const authRoute = require('./routes/auth');
app.use('/api/user', authRoute);

//Feeds
const feedRoute = require('./routes/feed');
app.use('/api/feed', feedRoute);

// const MongoClient = require('mongodb').MongoClient;
// const uri = process.env.DBCONNECTION;
// console.log('uri', uri);
// MongoClient.connect(uri, { useUnifiedTopology: true }, function(err, db) {
//     // var cursor = db('test').collection('posts').find();
//     console.log(db);
// });

// MongoClient.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true }, function(err, db) {
//     if (err) {
//         console.log('err', err)
//         throw err;
//     }
//     var dbo = db.db("test");
//     //Find the first document in the customers collection:
//     dbo.collection("posts").findOne({}, function(err, result) {
//       if (err) throw err;
//       console.log(result.title);
//       db.close();
//     });
// });

app.listen(3000);