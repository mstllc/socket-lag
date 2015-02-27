;(function(window, $, io) {

  var socket = io();

  // Client ID
  var pathParts = window.location.pathname.split('/').filter(function(element) {return element !== '';});
  var isMobile = pathParts.indexOf('mobile') > -1;
  var clientID = pathParts.pop();


  var padContainer = document.getElementById("app-container");
  var padEls = document.querySelectorAll("[pad]");
  var pads = [];
  var i;
  var padsActive = 0;
  for (i = 0; i < padEls.length; i += 1) {
    padEls[i].padID = Math.pow(2, i);
    padEls[i].padActive = false;
    pads.push(padEls[i]);
  }

  // Set up eventListeners;
  padContainer.addEventListener("touchstart", on);
  padContainer.addEventListener("touchend", off);
  padContainer.addEventListener("mousedown", on);
  padContainer.addEventListener("mouseup", off);


  function on(e) {
    e.target.padActive = true;
    broadcast();
  }

  function off(e) {
    e.target.padActive = false;
    broadcast();
  }

  function broadcast() {
    padsActive = pads.reduce(function(val, pad) {
      return pad.padActive ? val | pad.padID : val;
    }, 0);
    socket.emit("change", padsActive);
  }


  // drawing shit
  function highlightActivePads() {
    pads.forEach(function(p) {
      var active = padsActive & p.padID;
      if (active) {
        p.classList.add("activated");
      } else {
        p.classList.remove("activated");
      }
      p.padActive = active;
    });
    requestAnimationFrame(highlightActivePads);
  }

  highlightActivePads();


  socket.on("change", function(active) {
    padsActive = active;
  });

}(window, window.jQuery, window.io, undefined));
