const path = require("path");

// basename
console.log(path.basename(__filename));

//diretorio
console.log(path.dirname(__dirname));

// exntesão do arquivo
console.log(path.extname(__filename));

// criar
console.log(path.parse(__filename));

// juntar caminhos de arquivos
console.log(path.join(__dirname, "teste", "teste.html"));
