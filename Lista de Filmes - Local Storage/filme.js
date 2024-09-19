// Criando a base de dados de filmes  
const filmes = [
  { id: 0, nome: 'Harry Potter', genero: 'fantasia', lancamento: 2001 },
  { id: 1, nome: 'Avatar', genero: 'fantasia', lancamento: 2010 },
  { id: 2, nome: 'O senhor dos Anéis', genero: 'fantasia', lancamento: 2000 },
  { id: 3, nome: 'Branquelas', genero: 'comédia', lancamento: 2007 },
  { id: 4, nome: 'A Lagoa Azul', genero: 'romance', lancamento: 1983 }
];

// Criando um array de filmes favoritos
let filmesFavoritos = [];

// Pegando Elementos HTML
const btn1 = document.querySelector('button');
const listaFilmes = document.querySelector('#listaFilmes');

// Ao carregar a página, executa a função que renderiza os elementos na tela
window.onload = () => {
  carregarFilmesFavoritos();
  renderizarLista();
}

// Função para carregar filmes favoritos do localStorage
const carregarFilmesFavoritos = () => {
  if (localStorage.getItem('favoritos')) {
    filmesFavoritos = JSON.parse(localStorage.getItem('favoritos'));
  }
}

// Função para renderizar filmes na tela
const renderizarLista = () => {
  listaFilmes.innerHTML = "";

  filmes.forEach((filme) => {
    const itemLista = document.createElement('li');
    listaFilmes.append(itemLista);
    itemLista.innerHTML = `Meu filme ${filme.nome}`;

    const favorito = document.createElement('img');
    favorito.src = filmesFavoritos.some(f => f.id === filme.id) ? 'img/heart-fill.svg' : 'img/heart.svg';
    favorito.style.cursor = 'pointer';
    favorito.addEventListener('click', (e) => {
      favoritoClicado(e, filme);
    });

    itemLista.append(favorito);
  });
}

// Adiciona o evento de clique ao botão 
btn1.addEventListener('click', () => {
  const inputUsuario = document.querySelector('#filmeInput');
  let id = filmes.length;
  filmes.push({ id: id, nome: inputUsuario.value, genero: '', lancamento: '' });
  renderizarLista();
  inputUsuario.value = '';
});

// Função que é executada quando o botão de favorito é clicado
const favoritoClicado = (eventoDeClique, objetoFilme) => {
  const favoriteState = {
    favorited: 'img/heart-fill.svg',
    notFavorited: 'img/heart.svg'
  };

  if (eventoDeClique.target.src.includes(favoriteState.notFavorited)) {
    eventoDeClique.target.src = favoriteState.favorited;
    saveToLocalStorage(objetoFilme);
  } else {
    eventoDeClique.target.src = favoriteState.notFavorited;
    removeFromLocalStorage(objetoFilme.id);
  }
}

// Função executada para salvar o filme no localStorage
const saveToLocalStorage = (objetoFilme) => {
  if (localStorage.getItem('favoritos')) {
    filmesFavoritos = JSON.parse(localStorage.getItem('favoritos'));
  }
  filmesFavoritos.push(objetoFilme);
  localStorage.setItem('favoritos', JSON.stringify(filmesFavoritos));
}

// Função executada para remover o filme no localStorage
function removeFromLocalStorage(id) {
  if (localStorage.getItem('favoritos')) {
    filmesFavoritos = JSON.parse(localStorage.getItem('favoritos'));
  }
  filmesFavoritos = filmesFavoritos.filter(movie => movie.id !== id);
  localStorage.setItem('favoritos', JSON.stringify(filmesFavoritos));
}