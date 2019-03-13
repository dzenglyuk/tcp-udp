const net = require('net');
const readline = require('readline-sync');
const colors = require('colors');

const host = '127.0.0.1';
const port = 3000;

let client = null;

let menuExec = () => setTimeout(() => menu(), 0);

let openConn = () => {
  if (client) {
    console.log('Connection is already open!'.red);
    menuExec();
    return;
  }
  client = new net.Socket();

  client.on('error', err => {
    client.destroy();
    client = null;
    console.log(`ERROR: Connection could not be opened: ${err.message}`.red);
    menuExec();
  });

  client.on('data', data => {
    console.log(data.toString());
    menuExec();
  });

  client.connect(port, host, () => {
    console.log('Connection opened successfully!'.green);
    menuExec();
  });
};

let sendCommand = command => {
  if (!client) {
    console.log('There is no opened connection!'.red);
    menuExec();
    return;
  }
  client.write(command);
};

let closeConn = () => {
  if (!client) {
    console.log('There is no opened connection!'.red);
    menuExec();
    return;
  }

  client.destroy();
  client = null;
  console.log('Connection closed successfully!'.green);
  menuExec();
};

function menu() {
  const line = readline.question(
    'Enter option (1-Open connection, 2-Send command, 3-Close connection, 4-Quit): \n'
  );

  switch (line) {
    case '1':
      openConn();
      break;
    case '2':
      const command = readline.question('Enter command to send: \n');
      sendCommand(command);
      break;
    case '3':
      closeConn();
      break;
    case '4':
      console.log('Quit');
      break;
    default:
      console.log('No such command!'.red);
      menuExec();
      break;
  }
}

menuExec();
