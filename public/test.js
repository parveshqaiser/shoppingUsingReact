

var mongoClient = require('mongodb').MongoClient;
var conString = 'mongodb://localhost:27071';
var express = require('express');
var cors = require('cors');

var app = express();

app.get('/get', function(req, res)
{
    res.send('<h3>Welcome to Node JS</h3>')
})

app.get('/users', (req,res)=>
{
    mongoClient.connect(conString).then(clientObj=>
        {
            var database = clientObj.db('some');
            database.collection('list').find({}).toArray().then(function(docs)
            {
                res.send(docs)
            })
        })
})

app.listen(9000);
console.log('server stated at http://127.0.0.1:9000')