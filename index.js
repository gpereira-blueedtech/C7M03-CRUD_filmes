require('dotenv').config()
const express = require("express");
const app = express();
const port = process.env.PORT || 3000; // Const para armanezar a porta do servidor
const path = require("path");

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());

let message = "";

// Esse é o responsável por trazer os dados.
// Ele vai chamar os módulos da modelo e database para fazer a conexão e trazer
// o objeto com todas as informações que precisamos.
// Por isso que em todas as rotas que trabalhamos com nosso DB, vamos nos referir ao "Filmes"
// Atenção com a letra maiúscula!!!!!
const Filme = require("./models/filme");



// R (Read) do CRUD - É aqui que vou LER os dados passados pelo banco
app.get("/", async (req, res) => {
  // Aqui estou pegando todas as entradas de "Filmes" e guardando em "filmes"
  // Criando uma lista de objetos
  const filmes = await Filme.findAll(); //find all = procurar tudo

  // Renderizo minha página passando como variável o filmes que acabei de criar
  // Ou seja, estou passando todos os dados puxados do BD
  res.render("index", {
    filmes, message
  });
});


// Read de uma entrada específica
app.get("/detalhes/:id", async (req, res) => { //O id definido aqui na rota é passado pelo meu HTML quando clico no link
  //Pegando uma entrada específica no banco (passada pelo ID) e construindo um objeto 
  //Aqui é apenas um objeto, não uma lista como na rota principal.
  const filme = await Filme.findByPk(req.params.id); //Find By PK - Procurar pela PK

  res.render("detalhes", {
    filme,
  });
});


app.get("/criar", (req, res) => {
  res.render("criar", {message});
});


// C (Create) do meu CRUD - Aqui eu vou criar uma entrada nova no meu banco
app.post("/criar", async (req, res) => {

  const { nome, descricao, imagem } = req.body;

  if (!nome) {
    res.render("criar", {
      message: "Nome é obrigatório",
    });
  }

  else if (!imagem) {
    res.render("criar", {
      message: "Imagem é obrigatório",
    });
  }

  else {
    try {
      const filme = await Filme.create({
        nome,
        descricao,
        imagem,
      });

      res.redirect("/");
    } catch (err) {
      console.log(err);

      res.render("criar", {
        message: "Ocorreu um erro ao cadastrar o Filme!",
      });
    }
  }
});

// Embora a rota seja "editar", nesse momento, no GET, eu estou apenas pegando os dados
// de uma entrada para serem editados, por isso ainda não é um UPDATE, é um READ.
app.get("/editar/:id", async (req, res) => {
  const filme = await Filme.findByPk(req.params.id);

  if (!filme) {
    res.render("editar", {
      filme,
      message: "Filme não encontrado!",
    });
  }

  res.render("editar", {
    filme, message
  });
});

//U (Update) do meu CRUD - Aqui é onde eu faço a atualização (edição) dos dados de uma entrada
app.post("/editar/:id", async (req, res) => {
  const filme = await Filme.findByPk(req.params.id);

  const { nome, descricao, imagem } = req.body;

  filme.nome = nome;
  filme.descricao = descricao;
  filme.imagem = imagem;

  const filmeEditado = await filme.save();

  res.render("editar", {
    filme: filmeEditado,
    message: "Filme editado com sucesso!",
  });
});


app.get("/deletar/:id", async (req, res) => {
  const filme = await Filme.findByPk(req.params.id);

  if (!filme) {
    res.render("deletar", {
      filme,
      message: "Filme não encontrado!",
    });
  }

  res.render("deletar", {
    filme, message
  });
});


app.post("/deletar/:id", async (req, res) => {
  const filme = await Filme.findByPk(req.params.id);

  if (!filme) {
    res.render("deletar", {
      mensagem: "Filme não encontrado!",
    });
  }

  await filme.destroy();

  res.redirect("/");
});

app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`))