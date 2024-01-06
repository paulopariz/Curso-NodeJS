const fs = require("fs");
const path = require("path");

//criar uma pasta
fs.mkdir(path.join(__dirname, "/test"), (error) => {
  if (error) {
    return console.log("err", error);
  }

  console.log("pasta criada");
});

//criar arquivo

fs.writeFileSync(path.join(__dirname, "/test", "test.txt"), "hello", (err) => {
  if (err) {
    return console.log("err", err);
  }

  console.log("criado");
  // adicionar a um arquivo
  fs.appendFile(
    path.join(__dirname, "/test", "test.txt"),
    "hello aaa",
    (error) => {
      if (error) {
        return console.log("err", error);
      }

      console.log("arquivo modificado");
    }
  );
});

// ler arquivo
fs.readFile(path.join(__dirname, "/test", "test.txt"), "utf8", (err, data) => {
  if (err) {
    return console.log("Erro", err);
  }

  console.log("data", data);
});
