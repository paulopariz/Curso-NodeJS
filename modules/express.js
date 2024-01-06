const express = require("express");

const app = express();

app.get("/home", (req, res) => {
  res.contentType("application/html");
  res.status(200).send("<h1>Welcome!!</h1>");
});

app.get("/users", (req, res) => {
  const users = [
    { name: "John", email: "john@example.com" },
    { name: "John2", email: "john@example2.com" },
  ];

  res.status(200).json(users);
});

const port = 8181;

app.listen(port, () => console.log(`porta express ${port}`));
