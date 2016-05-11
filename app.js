var _socket;
var gpio = require("gpio");
var gpio4 = gpio.export(4, {}); //led
var gpio14 = gpio.export(14, { //button
    direction: "in",
    ready: function() {
        gpio14.on("change", function() {
            if (gpio14.value) {
                if (gpio4.value) {
                    gpio4.reset();
                    if (_socket) {
                        _socket.emit("receive", "off");
                        _socket.broadcast.emit("receive", "off");
                    }
                }
                if (!gpio4.value) {
                    gpio4.set();
                    if (_socket) {
                        _socket.emit("receive", "on");
                        _socket.broadcast.emit("receive", "on");
                    }
                }
            }
        });
    }
});
var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);
app.use(express.static(__dirname + "/public"));
io.on("connection", function(socket) {
    _socket = socket;
    socket.on("send", function(data) {
        if (data === "on") {
            gpio4.set();
            socket.broadcast.emit("receive", "on");
        } else {
            gpio4.reset();
            socket.broadcast.emit("receive", "off");
        }
    });
});
server.listen(process.env.PORT || 80);