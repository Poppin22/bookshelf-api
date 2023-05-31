// import package
import Hapi from '@hapi/hapi';
import dotenv from 'dotenv';
import routes from './routes.js';

// inisialisasi file env
dotenv.config();

const init = async () => {
  const server = Hapi.server({
    host: process.env.HOST,
    port: process.env.PORT,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.route(routes);
  await server.start();
  console.log(`Server berjalan' ${server.info.uri}`);
};

init();
