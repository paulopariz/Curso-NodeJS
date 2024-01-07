const express = require("express");
const UserModel = require("../src/models/user.model");
const app = express();

app.use(express.json());

// get
app.get("/users", async (req, res) => {
  try {
    const page = req.query.page || 1;
    const perPage = req.query.perPage || 10;
    const totalUsers = await UserModel.countDocuments();

    const users = await UserModel.find({})
      .skip((page - 1) * perPage)
      .limit(perPage);

    const data = {
      current_page: page,
      data: users,
      per_page: perPage,
      to: (page - 1) * perPage + users.length,
      total: totalUsers,
    };
    res.status(200).json(data);
  } catch (error) {
    return res.status(500).send(error.message);
  }
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
