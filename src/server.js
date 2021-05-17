const Hapi = require("@hapi/hapi");

const startServer = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
    routes: {
      cors: {
        origin: ["*"]
      }
    }
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

startServer();
