const express = require('express');
const bodyParser = require('body-parser');
const fs = require("fs");
const app = express();

app.use(bodyParser.json({limit: "100mb"}));
app.use(express.static('public'));


app.get('/', function(req, res) {
  res.sendFile("index.html");
});


app.post('/submitinventory', function(req, res) {
    const body = req.body;
    fs.writeFileSync('./temp/inventory.json', Buffer.from(JSON.stringify(body)));
    res.send("success");
});

app.get('/getInventory', function(req, res) {
   var inventoryJSON = fs.readFileSync('./temp/inventory.json');
   res.send(JSON.parse(inventoryJSON.toString()));
});


app.listen(8000,function() {
  console.log("server started");
});