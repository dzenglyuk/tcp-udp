const net = require('net');
const exec = require('child_process').exec;
const colors = require('colors');
const server = net.createServer();

server.on('connection', socket => {
  const clientAddr = `${socket.remoteAddress}:${socket.remotePort}`;
  console.log(`New Client was connected from ${clientAddr}`.green);

  socket.on('data', command => {
    exec(command.toString(), (err, stdout, stderr) => {
      if (err) {
        socket.write(err.message);
      } else {
        socket.write(stdout ? stdout : 'Done');
      }
    });
  });

  socket.on('close', () =>
    console.log(`The connection with ${clientAddr} is closed`.yellow)
  );

  socket.on('error', err => console.log(`Error: ${err.message}`.red));
});

server.listen(3000, () => {
  console.log(
    `TCP Server is listening on port ${
      JSON.stringify(server.address().port).green
    }`
  );
});
