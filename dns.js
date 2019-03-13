const dns = require('dns');

const options = {
    family: 4,
    hints: dns.ADDRCONFIG | dns.V4MAPPED,
};

const domain = process.argv[2];

dns.lookup(domain, options, (err, address, family) => {
    if (!err) {
        console.log(`Address: ${address}, IP version: ${family}`);
    }
});