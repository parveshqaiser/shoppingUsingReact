var mongoClient = require('mongodb').MongoClient;
var express = require('express');
var cors = require ('cors');
const { urlencoded } = require('express');

var connectionString = 'mongodb://localhost:27017';
var app = express();

app.use(cors());

app.use(express.urlencoded( // url encoded is internally using bodyParser
    {
        extended: true
    }
));
app.use(express.json());


app.get('/', function (req, res) // below one is to check testing of api
{
    res.send('<h2>Welcome to NODEJS </h2>')
})


app.get('/getUsers', function (req, res) // to login we need all users & we have to verify
{
    mongoClient.connect(connectionString).then(clientObj=>
        {
            var database = clientObj.db('BigBazar');
            database.collection('Client').find({}).toArray().then(function(docs)
            {
                res.send(docs)
            })
        })
});

app.post('/register', function(req, res)
{
    var details ={
        Username : req.body.Username,
        Password : req.body.Password,
        Email : req.body.Email,
        Phone : req.body.Phone,
    };
    mongoClient.connect(connectionString).then(clientObj=>
        {
            var database = clientObj.db('BigBazar');
            database.collection('Client').insertOne(details, function(doc, err)
            {
                if (!err)
                {
                    console.log('Record Inserted')
                }
            })
        })
})

// CRUD OPERATION Starts here 

app.get('/getProducts', function(req, res)
{
    mongoClient.connect(connectionString).then(clientObj=>
        {
            var database = clientObj.db('BigBazar');
            database.collection('Products').find({}).toArray().then(function(docs)
            {
                res.send(docs)
            })
        })
})


app.post('/addProducts', function(req, res)
{
    var items = {
        Id : parseInt(req.body.Id),
        Product : req.body.Product,
        Price : parseFloat(req.body.Price),
        Stock : (req.body.Stock=='true')? true : false
    }
    mongoClient.connect(connectionString).then(clientObj=>
        {
            var database= clientObj.db('BigBazar');
            database.collection('Products').insertOne(items, function(doc, err)
            {
                if (!err)
                {
                    console.log('Record Inserted')
                }
            })
        })
})


app.delete('/delete/:serverId', function(req, res)
{
    var serverId= parseInt(req.params.serverId); // important step, we should use params & not body. & we r converting here server side params
    mongoClient.connect(connectionString).then(clientObj=>
        {
            var database= clientObj.db('BigBazar');
            database.collection('Products').deleteOne({Id:serverId}, function(err, docs)
            {
                if(!err)
                {
                    console.log(" Record Deleted")
                    res.redirect('/addProduct')
                }
                else{
                    alert(err)
                }
            })
        })
})


app.patch('/update/:serverId', (req,res)=>
{
    var serverId= parseInt(req.params.serverId);
    mongoClient.connect(connectionString).then(clientObj=>
        {
            var database= clientObj.db('BigBazar');
            var item={
                Product : req.body.Product,
                Price : parseFloat(req.body.Price),
                Stock : (req.body.Stock=='true')? true : false
            };
            var findQuery= {Id:serverId};
            var updateQuery = {$set: item};
            database.collection('Products').updateOne(findQuery,updateQuery, function(err, res)
            {
                if(!err)
                {
                    console.log('Record Inserted')
                }
            })
        })
})

app.get('/details/:serverId', function(req, res)
{
    var serverId= parseInt(req.params.serverId);
    mongoClient.connect(connectionString).then(clientObj=>
        {
            var database= clientObj.db('BigBazar');
            database.collection('Products').find({Id:serverId}).toArray().then(function(documents)
            {
                res.send(documents)
            })
        })
})

app.listen(7000);
console.log('Server Started at : http://127.0.0.1:7000')