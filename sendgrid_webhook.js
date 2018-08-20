const localtunnel = require('localtunnel');

localtunnel(5000, { subdomain: 'auanoraj' }, function(err, tunnel) {
  console.log('LT running')
});