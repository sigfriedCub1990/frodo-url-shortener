const dns = require('dns');

const lookup = (address) => {
  return new Promise((resolve, reject) => {
    dns.lookup(address, (err, ip) => {
      if (err) reject(err);
      resolve(ip);
    });
  });
};

module.exports = lookup;
