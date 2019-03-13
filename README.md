# TCP and UDP Servers

Simple TCP and UDP Servers with clients to connect them.
The main functionality is sending shell commands from client app to the server and see the result of execution from the client`s side.

## Getting Started

Project works on [NodeJS](https://nodejs.org/)

Clone project:

```
$ git clone https://github.com/dzenglyuk/tcp-udp.git
```

Download dependencies:

```
npm install
```

## Usefull commands

Run TCP server:

```
npm run tcp-server
```

Run TCP client:

```
npm run tcp-client
```

Run UDP server:

```
npm run udp-server
```

Run UDP client:

```
npm run udp-client
```

Try DNS Resolver:

```
node dns.js 'DOMAIN NAME'