// Crio a modelo de como os dados serão trazidos do meu banco e tranformado em objetos

const database = require("./../database");
const Sequelize = require("sequelize");

const Filme = database.define("filmes", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  descricao: {
    type: Sequelize.STRING,
  },
  imagem: {
    type: Sequelize.STRING,
    allowNull: false,
  },
},
{
  freezeTableName: true,
  timestamps: false, 
  createdAt: false,
  updatedAt: false,
});

module.exports = Filme;


// filmes = [{id: 1, nome: "Senhor dos Anéis: As Duas Torres", descricao: "Segunda parte da trilogia", imagem: "https://i.pinimg.com/originals/e5/e8/cf/e5e8cfc267a11c8ae6ba728b4537543f.jpg"}, {id: 2, nome: "Jurassic Park", descricao: "Um filme de dinossauros maravilhoso", imagem: "https://i.pinimg.com/474x/0e/f4/99/0ef499dc3f429a3b639ddace98eb7134.jpg"}]