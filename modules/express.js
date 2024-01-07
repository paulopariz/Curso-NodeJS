const express = require("express");
const mongoose = require("mongoose");
const UserModel = require("../src/models/user.model");
const app = express();

app.use(express.json());

// list users
app.get("/users", async (req, res) => {
  try {
    const page = req.query.page || 1;
    const perPage = req.query.perPage || 10;
    const totalUsers = await UserModel.countDocuments();
    const sortBy = req.query.sortBy || "created_at";
    const sortOrder = req.query.sortOrder || "desc";

    const users = await UserModel.find({})
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ [sortBy]: sortOrder });

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

// list user
app.get("/user/:id", async (req, res) => {
  try {
    //verifica se o id é valido
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID inválido." });
    }

    //verifica se existe o usuario
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// create user
app.post("/user", async (req, res) => {
  try {
    // verifica se o email já existe
    const isEmail = await UserModel.findOne({ email: req.body.email });
    if (isEmail) {
      return res.status(400).json({ message: "Email já esta em uso." });
    }

    // se nao existir o email o usuario é criado
    const user = await UserModel.create(req.body);
    res.status(201).json([{ user, message: "Usuário criado com sucesso." }]);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// update user
app.put("/user/:id", async (req, res) => {
  try {
    // verifica se existe o id
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "ID inválido." });
    }

    // verifica se existe o usuario
    const user = await UserModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!user) {
      return res.status(400).json({ message: "Usuário não encontrado." });
    }

    //verifica se já existe o usario com o mesmo email
    const isEmail = await UserModel.findOne({
      email: req.body.email,
      _id: { $ne: id },
    });
    if (isEmail) {
      return res.status(400).json({ message: "Email já esta em uso." });
    }

    res
      .status(200)
      .json([{ user, message: "Usuário atualizado com sucesso." }]);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// conectar
const port = 8181;
app.listen(port, () => console.log(`porta express ${port}`));
