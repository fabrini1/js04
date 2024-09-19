// Array de produtos disponíveis
const produtos = [
    { id: 1, nome: 'Camiseta', valor: 29.99 },
    { id: 2, nome: 'Calça Jeans', valor: 99.90 },
    { id: 3, nome: 'Tênis', valor: 149.90 }
];

// Função para adicionar um produto ao carrinho
function adicionarProduto(id, nome, valor, quantidade = 1) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    const produtoExistente = carrinho.find(produto => produto.id === id);
    if (produtoExistente) {
        produtoExistente.quantidade += quantidade;
    } else {
        carrinho.push({ id, nome, valor, quantidade });
    }

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    exibirCarrinho();
}

// Função para adicionar um produto ao carrinho pelo ID
function adicionarPorId() {
    const idInput = document.getElementById('input-id').value;
    const quantidadeInput = document.getElementById('input-quantidade').value;

    const id = parseInt(idInput);
    const quantidade = parseInt(quantidadeInput);

    const produto = produtos.find(p => p.id === id);
    if (produto) {
        adicionarProduto(produto.id, produto.nome, produto.valor, quantidade);
    } else {
        alert('Produto não encontrado!');
    }

    document.getElementById('input-id').value = '';
    document.getElementById('input-quantidade').value = 1;
}

// Função para remover um produto do carrinho
function removerProduto(id) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho'));
    carrinho = carrinho.filter(produto => produto.id !== id);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    exibirCarrinho();
}

// Função para exibir os produtos do carrinho
function exibirCarrinho() {
    let carrinho = JSON.parse(localStorage.getItem('carrinho'));
    const listaCarrinho = document.getElementById('lista-carrinho');
    listaCarrinho.innerHTML = '';

    if (carrinho && carrinho.length > 0) {
        carrinho.forEach(produto => {
            const li = document.createElement('li');
            li.textContent = `${produto.nome} - Quantidade: ${produto.quantidade} - Valor: R$ ${produto.valor.toFixed(2)}`;
            const removerBtn = document.createElement('button');
            removerBtn.textContent = 'Remover';
            removerBtn.onclick = () => removerProduto(produto.id);
            li.appendChild(removerBtn);
            listaCarrinho.appendChild(li);
        });
    } else {
        listaCarrinho.innerHTML = 'O carrinho está vazio!';
    }
}

// Inicialização da aplicação: verificar se há produtos no carrinho e exibi-los
exibirCarrinho();