var express = require("express");
var path = require("path");
// end

// initializing app
var app = express();

// set static path
app.use(express.static(path.join(__dirname, '/public')));


var port = process.env.PORT || 9000;
// creating server at 3000 port
app.listen(port, function(req, res) {
	console.log("server started at port 9000....");
});
// end

app.get('/',(req, res) => {
  res.sendFile(__dirname + "/public/index")
})
