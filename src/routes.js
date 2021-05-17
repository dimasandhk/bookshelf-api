const handler = require("./handler");

const routes = [
  { method: "POST", path: "/books", handler: handler.addBookHandler },
  { method: "GET", path: "/books", handler: handler.getAllBooksHandler }
];

module.exports = routes;
