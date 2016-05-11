var start=1000;
var end=500;
if (process.argv.length>2) {
  start = parseInt(process.argv[2]);
}
if (process.argv.length>3) {
  end = parseInt(process.argv[3]);
}
var gpio = require("gpio");
var gpio4;
gpio4 = gpio.export(4, {
  ready: function() {
    setInterval(function() {
      gpio4.set();
      setTimeout(function() {
        gpio4.reset();
      },end);
    },start);
  }
});
var gpio26;
gpio26 = gpio.export(26,{
  ready: function() {
    setInterval(function() {
      gpio26.reset();
      setTimeout(function() {
        gpio26.set();
      },end);
    },start);
  }
});