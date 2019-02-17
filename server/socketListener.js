// Test code for socket listener. 


// Define server objects
var app = require('express')();
var http = require('http').Server(app);

// Define socket object
var io = require('socket.io')(http);

const path = require('path');

// Connecting clients are directed to socketTestClient.html
app.get('/', function(req, res){
  res.sendFile(path.resolve(__dirname+'/../socketTestClient.html'));
});

// Open socket and handle connections
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('chat message', (msg) =>{
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
  socket.on('disconnect', () =>{
    console.log('a user disconnected');
  });
});

// Set up server on port 3002
const port = 3002;
http.listen(port, () => {
  console.log(`listening on ${port}`);
});

