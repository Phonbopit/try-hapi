import path from 'path';
import Hapi from 'hapi';
import inert from 'inert';

const Server = new Hapi.Server({
  connections: {
    routes: {
      files: {
        relativeTo: path.join(__dirname, 'public')
      }
    }
  }
});

Server.connection({
  host: 'localhost',
  port: 7777
});

Server.register(inert, (err) => {
  
  if (err) {
    throw err;
  }

  Server.route({
    method: 'GET',
    path: '/',
    handler: ((request, reply) => {
      return reply('hello world');
    })
  });

  Server.route({
    method: 'GET',
    path: '/hello/{name}',
    handler: (request, reply) => {
      reply(`Hello ${encodeURIComponent(request.params.name)}!`);
    }
  })

  Server.route({
    method: 'GET',
    path: '/home',
    handler: (request, reply) => {
      reply.file('index.html');
    }
  })

  Server.start((err) => {
    if (err) {
        throw err;
    } 
    console.log('Server is running at ', Server.info.uri);
  });

});



