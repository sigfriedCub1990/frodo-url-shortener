const dns = require('dns');
const CustomError = require('./error');

const lookup = (address) => {
  return new Promise((resolve, reject) => {
    dns.lookup(address, (err, ip) => {
      if (err) reject(new CustomError('Domain not found', 500));
      resolve(ip);
    });
  });
};

module.exports = lookup;
