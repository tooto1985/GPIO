var piblaster = require('pi-blaster.js');
var express = require("express");
var path = require("path");
var app = express();
app.get("/api", function(req, res) {
	if (req.query.v) {
		var v = parseFloat(req.query.v);	
		piblaster.setPwm(4, v );
		res.send("ok");
	} else {
		res.send("not set");
	}
	if(req.query.r) {
		piblaster.release(4, function() {
		  res.send("release");	
		});
		
	}
});
app.listen(80);