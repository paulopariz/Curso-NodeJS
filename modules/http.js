const http = require("http");

const port = 8080;

const server = http.createServer((req, res) => {
  if (req.url === "/home") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1>Home</h1>");
  }

  if (req.url === "/users") {
    const users = [
      { name: "John", email: "john@example.com" },
      { name: "John2", email: "john@example2.com" },
    ];

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(users));
  }
});

server.listen(port, () => console.log(` porta --> ${port}`));
