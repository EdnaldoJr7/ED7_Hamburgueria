let cart = [];

// Adiciona item ao carrinho
function addToCart(name, price) {
  cart.push({ name, price });
  renderCart()`\n`;
  localStorage.setItem('cart', JSON.stringify(cart));
  ;
}

// Remove item do carrinho pelo índice
function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Atualiza exibição do carrinho
function renderCart() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');

  if (!cartItems || !cartTotal) return;

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - R$ ${item.price.toFixed(2)} `;

    // Botão de remover
    const removeBtn = document.createElement('button');
    removeBtn.textContent = "❌";
    removeBtn.style.marginLeft = "10px";
    removeBtn.onclick = () => removeFromCart(index);

    li.appendChild(removeBtn);
    cartItems.appendChild(li);

    total += item.price;
  });

  cartTotal.textContent = total.toFixed(2);
}

// Finalizar pedido
function fazerPedido() {
  if (cart.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }

  let resumo = "📋 Seu pedido:\n";
  cart.forEach(item => {
    resumo += `- ${item.name} - R$ ${item.price.toFixed(2)}\n`;
  });
  resumo += `\n💰 Total: R$ ${cart.reduce((acc, item) => acc + item.price, 0).toFixed(2)}`;

  alert(resumo);

  // Aqui você pode:
  // - Enviar via backend/PHP
  // - Redirecionar para WhatsApp
  // - Limpar carrinho após pedido
  cart = [];
  localStorage.removeItem('cart');
  renderCart();
}

// Alternar exibição do carrinho
function toggleCart() {
  const cartDiv = document.getElementById('cart');
  if (cartDiv.style.display === "none" || cartDiv.style.display === "") {
    cartDiv.style.display = "block";
  } else {
    cartDiv.style.display = "none";
  }
}

// Recupera carrinho salvo ao carregar a página
window.onload = function() {
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
    renderCart();
  }
}
