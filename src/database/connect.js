const mongoose = require("mongoose");

const connectToDatabase = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@backnode.ybmjk3g.mongodb.net/dbnode?retryWrites=true&w=majority`
    );
    console.log("Conectado ao banco");
  } catch (err) {
    console.error("Erro ao conectar bando de dados:", err);
  }
};

module.exports = connectToDatabase;
