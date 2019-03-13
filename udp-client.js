const dgram = require('dgram');
const client = dgram.createSocket('udp4');
const readline = require('readline-sync');
const colors = require('colors');

const host = '127.0.0.1';
const port = 4000;

let menuExec = () => setTimeout(() => menu(), 0);

client.on('message', (msg, rinfo) => {
  console.log(msg.toString());
  menuExec();
});

let sendComm = command => {
  client.send(Buffer.from(command), port, host, err => {
    if (err) {
      console.log(`Error: ${err.stack}`.red);
      client.close();
    } else {
      console.log(`Command sent!`.green);
    }
  });
};

function menu() {
  const line = readline.question('Enter option (1-Send command, 2-Quit): \n');
  
  switch (line) {
    case '1':
      const command = readline.question('Enter command to send: \n');
      sendComm(command);
      break;
    case '2':
      console.log('Quit');
      client.close();
      break;
    default:
      console.log('No such command!'.red);
      menuExec();
      break;
  }
}

menuExec();
