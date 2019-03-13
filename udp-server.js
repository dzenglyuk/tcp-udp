const dgram = require('dgram');
const server = dgram.createSocket('udp4');
const exec = require('child_process').exec;
const colors = require('colors');

server.on('message', (command, rinfo) => {
  exec(command.toString(), (err, stdout, stderr) => {
    if (err) {
      server.send(err.message, rinfo.port, rinfo.address, err => {
        if (err) client.close();
      });
    } else {
      server.send(stdout ? stdout : 'Done', rinfo.port, rinfo.address, err => {
        if (err) client.close();
      });
    }
  });
});

server.on('error', err => {
  console.log(`server error: ${err.stack}`.red);
  server.close();
});

server.on('close', () => {
  console.log('Socket is closed!'.yellow);
});

server.on('listening', () => {
  const addr = server.address();
  console.log(`UDP server is listening on ${addr.address}:${addr.port}`.green);
});

server.bind(4000);
