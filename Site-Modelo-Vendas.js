// Seleciona elementos do DOM que você precisa:
const checkboxes = document.querySelectorAll('.adicionar-ao-carrinho');
const carrinhoItens = document.getElementById('carrinho-itens');
const carrinhoTotal = document.getElementById('carrinho-total');
const orderButton = document.getElementById('order-button');
const produtoInputs = document.querySelectorAll('.produto-input');
const bebidaInputs = document.querySelectorAll('.bebida-input');
const tamanhoSelect = document.querySelectorAll('.tamanho');
const tamanhoquantidade = document.querySelectorAll('.quantidade');

// Declare um array para manter os itens selecionados no carrinho:
const carrinhoItems = [];

// Itera sobre as caixas de seleção 'adicionar-ao-carrinho':
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        const nome = checkbox.getAttribute('data-nome');
        const preco = parseFloat(checkbox.getAttribute('data-preco'));
        const quantidade = (''); // Defina a quantidade desejada (você pode ajustar isso conforme necessário).
        const size = (''); // Defina o tamanho desejado (ajuste conforme necessário).

        if (checkbox.checked) {
            // Adiciona o item ao array de carrinhoItems.
            carrinhoItems.push({ nome, preco, quantidade, size });
            // Atualiza a exibição do carrinho.
            updateCarrinho();
        } else {
            // Remove o item do array de carrinhoItems se estiver desmarcado.
            const index = carrinhoItems.findIndex(item => item.nome === nome);
            if (index !== -1) {
                carrinhoItems.splice(index, 1);
            }
            // Atualiza a exibição do carrinho.
            updateCarrinho();
        }
    });
});

// Função para atualizar a exibição do carrinho:
function updateCarrinho() {
    // Limpa o carrinho atual.
    carrinhoItens.innerHTML = '';

    // Adiciona os itens do carrinho atualizados.
    carrinhoItems.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.nome} ${item.quantidade} ${item.size} - R$ ${item.preco.toFixed(2)}`;
        carrinhoItens.appendChild(listItem);
    });

    // Recalcula o total do carrinho somando os preços dos itens.
    const total = carrinhoItems.reduce((acc, item) => acc + item.preco, 0);
    carrinhoTotal.textContent = ` $${total.toFixed(2)}`; // Atualiza o total exibido no carrinho.
}

// Adicione um evento de clique ao botão 'order-button' para redirecionar para o WhatsApp:
orderButton.addEventListener('click', () => {
    // Recalcula o total do carrinho antes de criar o link do WhatsApp.
    const totalValue = carrinhoItems.reduce((acc, item) => acc + item.preco, 0);
    // Crie uma mensagem de pedido que inclua os itens selecionados no carrinho e o total.
    const itensSelecionados = carrinhoItems.map(item => `${item.nome}, ${item.quantidade} ${item.size}`).join('\n');
    // Atualize a variável global 'pedido' com os itens selecionados e o valor total.
    const pedido = `Gostaria de pedir o seguinte:\n${itensSelecionados}`;
    const total = `Total:$ ${totalValue.toFixed(2)}`;
    const mensagem = '. Obrigado(a)!';
    // Crie um link do WhatsApp com o pedido e a mensagem de agradecimento.
    const whatsappLink = `https://wa.me/+5522998553415?text=${encodeURIComponent(pedido + '\n' + total + mensagem)}`;

    // Redirecione a página para o link do WhatsApp, abrindo o aplicativo com a mensagem pré-preenchida.
    window.location.href = whatsappLink;
});
const scrollingList = document.querySelector('barrafixa');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  // Altura da janela do navegador
  const windowHeight = window.innerHeight;

  // Posição superior da lista em relação ao topo do documento
  const listOffset = scrollingList.offsetTop;

  // Verifique se o usuário rolou além do topo da lista
  if (scrollY > listOffset) {
    // Fixe a lista no topo da janela
    scrollingList.style.position = 'fixed';
    scrollingList.style.top = '0';
  } else {
    // Restaure a posição padrão da lista
    scrollingList.style.position = 'static';
  }

  // Verifique se o usuário rolou além do final da lista
  const listHeight = scrollingList.clientHeight;
  if (scrollY + windowHeight > listOffset + listHeight) {
    // Libere a lista no final da janela
    scrollingList.style.position = 'static';
  }
});
