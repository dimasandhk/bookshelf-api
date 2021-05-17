const Hapi = require("@hapi/hapi");
const routes = require("./routes");

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

  server.route(routes);

  await server.start();
  console.log(`Server started on ${server.info.uri}`);
};

startServer();