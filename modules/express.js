const express = require("express");
const UserModel = require("../src/models/user.model");
const app = express();

app.use(express.json());

// get
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

//post
app.post("/users", async (req, res) => {
  try {
    // verifica se o email já existe
    const isEmail = await UserModel.findOne({ email: req.body.email });
    if (isEmail) {
      return res.status(400).json({ error: "Email já esta em uso" });
    }

    // se nao existir o email o usuario é criado
    const user = await UserModel.create(req.body);
    res.status(201).json([{ user, message: "Usuário criado com sucesso" }]);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// conectar
const port = 8181;
app.listen(port, () => console.log(`porta express ${port}`));
