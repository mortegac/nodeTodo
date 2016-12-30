var server = require('./server');
var port = 8000;

server.listen(port, function(err) {
  if (err) return console.log('something bad happened');
  console.log('server is running on port:', port);
});
