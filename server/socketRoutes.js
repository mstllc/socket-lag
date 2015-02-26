// Crude client storage
var clients = {};

module.exports = function(io) {

  io.sockets.on('connection', function(socket) {

    socket.on('client-setup', function(client) {
      if(!clients[client.cid]) {
        if(client.mobile) {
          clients[client.cid] = {
            mobile: socket
          };
        } else {
          clients[client.cid] = {
            desktop: socket
          };
        }
      } else {
        if(client.mobile) {
          clients[client.cid].mobile = socket;
        } else {
          clients[client.cid].desktop = socket;
        }
      }
    });

    socket.on('pad-down', function(e) {
      if(clients[e.cid].desktop) {
        clients[e.cid].desktop.emit('pad-down', e.pid);
      }
    });

    socket.on('pad-up', function(e) {
      if(clients[e.cid].desktop) {
        clients[e.cid].desktop.emit('pad-up', e.pid);
      }
    });

  });

};
