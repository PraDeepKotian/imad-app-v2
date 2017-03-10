var express = require('express');
var morgan = require('morgan');
var path = require('path');
var crypto = require('crypto');
var bodyparser = require('body-parser');

var app = express();
app.use(morgan('combined'));
app.use(bodyparser.json());

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

function hash(input , salt){
    var hashed = crypto.pbkdf2Sync(input,salt,1000,512,'sha512');
    return hashed.toString('hex');
}

app.get('/hash/:input',function(req,res){
   var hashstring = hash(req.params.input,'this-is-same-random-string');
   res.send(hashstring);
    
});


app.post('/create-user',function(req,res){
    var username = req.body.username;
    var pass = req.body.pass;
    var salt = crypto.getRandomBytes(128).toString('hex');
    var dbString = hash(password,salt);
    pool.query('INSERT into "user"(username, pass)VALUES($1 ,$2)',[username , dbString], function(err,result){
        if(err){
            res.status(500).send(err.toSting());
        }else{
            res.send('user created');
        }
    } );
});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
