const newSocket = require('socket.io');

/**
 * @function
 * Initializes socket server
 *
 * @param {Object} server - Http server.
 */
module.exports = (server) => {
  // Creating a new socket.io instance by passing the HTTP server object
  const io = newSocket(server);
  io.onlineUsers = {};
  io.on('connection', (socket) => {
    // eslint-disable-next-line no-console
    console.log(`Socket: ${JSON.stringify(socket)}`);
  }); // end on connection listener
  return io;
};
