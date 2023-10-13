const productButtons = document.querySelectorAll('.add-to-cart');
const cart = document.getElementById('cart');
const cartSubtotal = document.getElementById('cart-subtotal');
const cartTotal = document.getElementById('cart-total');
const inputPromoCode = document.getElementById('promo-code');
const discountElement = document.getElementById('discount');
const cartItems = [];

// promo
const promo = [
  {
    label: 'DISC10',
    value: 0.1,
  },
  {
    label: 'DISC50',
    value: 0.5,
  },
  {
    label: 'DISC75',
    value: 0.75,
  },
];

productButtons.forEach((button) => {
  button.addEventListener('click', addToCart);
});

function addToCart(event) {
  const product = event.target.closest('.product');
  const productName = product.querySelector('h3').textContent;
  const productPrice = parseFloat(product.querySelector('p').textContent.replace('Price: Rp ', ''));

  cartItems.push({ name: productName, price: productPrice });
  displayCart();
}

function displayCart() {
  cart.innerHTML = '';
  let total = 0;

  cartItems.forEach((item) => {
    const cartItem = document.createElement('div');
    cartItem.textContent = item.name + ' - Rp ' + item.price;
    cart.appendChild(cartItem);

    total += item.price;
  });

  cartSubtotal.textContent = 'Sub Total: Rp ' + total.toFixed(0);

  applyPromoCode();
}

inputPromoCode.addEventListener('input', applyPromoCode);

function applyPromoCode() {
  const code = inputPromoCode.value;
  const appliedPromo = promo.find((p) => p.label === code);

  if (appliedPromo) {
    const discount = appliedPromo.value;
    const total = cartItems.reduce((acc, item) => acc + item.price, 0);
    const discountedTotal = total * (1 - discount);
    const discountAmount = total - discountedTotal;
    discountElement.textContent = 'Discount: Rp ' + discountAmount.toFixed(0);
    cartTotal.textContent = 'Total: Rp ' + discountedTotal.toFixed(0);
  } else {
    discountElement.textContent = '-';
    cartTotal.textContent = 'Total: Rp ' + cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(0);
  }
}
