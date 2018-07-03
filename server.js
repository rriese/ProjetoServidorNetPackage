var net = require('net'),
	clients = [],
	port = 3000;

net.createServer(function (socket) {

  socket.name = socket.remoteAddress + ":" + socket.remotePort 

  clients.push(socket);

  socket.on('data', function (data) {
    broadcast(data, socket);
  });

  socket.on('end', function () {
    clients.splice(clients.indexOf(socket), 1);
  });
  
  function broadcast(message, sender) {
    clients.forEach(function (client) {
      if (client === sender) return;
      client.write(message);
    });
  }

}).listen(port);

console.log(`Servidor online na porta ${port}\n`);