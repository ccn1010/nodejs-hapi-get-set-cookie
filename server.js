var Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({ port: '3000' });


var cookieOptions = {
  ttl: null,
  isSecure: false,
  isHttpOnly: true,
  encoding: 'base64json',
  clearInvalid: false, // remove invalid cookies
  strictHeader: true // don't allow violations of RFC 6265
};

/* **** ROUTES ************************************************************** */
server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    reply('FUNCIONANDO');
  }
});

server.route({
  method: 'GET',
  path: '/cookie/{cookieValue}',
  handler: function (request, reply) {
    reply('Cookie activada!!').state(request.params.cookieValue, { value: Date.now() }, cookieOptions);

    //reply();
  }
});

server.route({
  method: 'GET',
  path: '/cookie',
  handler: function (request, reply) {
    reply(request.state);
  }
});
/* **** END: ROUTES ********************************************************* */
server.start();