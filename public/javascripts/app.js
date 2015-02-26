;(function(window, $, io) {

  var socket = io();

  // Client ID
  var pathParts = window.location.pathname.split('/').filter(function(element) {return element !== '';});
  var isMobile = pathParts.indexOf('mobile') > -1;
  var clientID = pathParts.pop();

  // Socket connection
  socket.on('connect', function() {

    // Setup client on server
    socket.emit('client-setup', {cid: clientID, mobile: isMobile});

    if(!isMobile) {
      socket.on('pad-down', function(pid) {
        $('#' + pid).addClass('down');
      });
      socket.on('pad-up', function(pid) {
        $('#' + pid).removeClass('down');
      });
    } else {
      $('.sampler-grid-col').on('touchstart', function(e) {
        socket.emit('pad-down', {cid: clientID, pid: e.currentTarget.id});
        $(e.currentTarget).addClass('down');
      });

      $('.sampler-grid-col').on('touchend', function(e) {
        socket.emit('pad-up', {cid: clientID, pid: e.currentTarget.id});
        $(e.currentTarget).removeClass('down');
      });
    }

  });

}(window, window.jQuery, window.io, undefined));
