var finalhandler = require('finalhandler');
var serveStatic = require('serve-static');
var http = require('http');
var URL = require('url');

// serving static files
var serve = serveStatic('public/', {'index': ['index.html', 'index.htm']});
var todos = [];
var count = 1;

var pattern = /^\/todos\/(\d+)$/;  //Expresion regular que parsea y obtiene el ID que biene por GET



var app = {
  // create
  post: function(req, res) {
    var body,
        todo;

    req.on('data',function (chunk) {

      body = chunk.toString();
      todo = JSON.parse(body);
      todo.id=count;
      count++;

      todos.push(todo);

      res.end(JSON.stringify(todo));



      console.log(todo);



    })
  },
  // edit
  put: function(req, res) {
    var url = req.url;
    var id = +/^\/todos\/(\d+)$/.exec(url)[1]
    console.log("PUT: id: " + id);

    var i;
    for (i=0; i<todos.length; i++) {

      if(todos[i].id == id)
      {
        break;
      }
    }
    var todo = todos[i];
    res.end(JSON.stringify(todo));



  },
  // read
  get: function(req, res) {
    serve(req, res, finalhandler(req, res));
  },
  // remove
  delete: function(req, res) {
    var url = req.url;
    var id = +/^\/todos\/(\d+)$/.exec(url)[1]

    console.log("id: " + id);
    //Recorerr arreglo en busca de elemento a eliminar

    var i;

    for (i=0; i<todos.length; i++) {

      if(todos[i].id == id)
      {
        break;
      }
    }
    var todo = todos[i];
    todos.splice(i,1);          //Eliminar elemento
    console.log("Elemento eliminado");

    res.end(JSON.stringify(todo));



    console.log(JSON.stringify(todos));

    //array.splice(1,2); //Eliminar elemento


  }
};

var server = http.createServer(function(req, res) {
  var method = req.method.toLowerCase();
  if (app[method]) {
    return app[method](req, res);
  }

  res.statusCode = 404;
  res.end();
});

module.exports = server;
