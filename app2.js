var gpio = require("gpio");
var gpio4 = gpio.export(4, {}); //led
var gpio14 = gpio.export(14, { //button
    direction: "in",
    ready: function() {
        var sid = null;
        gpio14.on("change", function() {
            if (gpio14.value) {
                if (gpio4.value) {
                    gpio4.reset();
                }
                if (!gpio4.value) {
                    gpio4.set();
                }
            }
        });
    }
});
var express = require("express");
var path = require("path");
var app = express();
app.use(express.static(path.join(__dirname, "public")));
app.get("/api", function(req, res) {
    if (req.query.status === "on") {
        gpio4.set();
    } else {
        gpio4.reset();
    }
    res.send("ok");
});
app.listen(80);