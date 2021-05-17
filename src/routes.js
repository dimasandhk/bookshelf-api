const handler = require("./handler");

const routes = [
  { method: "POST", path: "/books", handler: handler.addBookHandler }
];

module.exports = routes;
