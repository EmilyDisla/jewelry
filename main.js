// main.js - Funcionalidad principal para Mariel Jewelry
// Aquí se agregará la lógica JS para navbar, carrito, modo oscuro, formularios, etc.

// Menú hamburguesa y navegación (Bootstrap maneja el colapso)

// Carrito de compras (estructura básica, puedes expandirla)
class ShoppingCart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
        this.cartCount = document.querySelector('.cart-count');
        this.updateCart();
    }
    addItem(item) {
        const existing = this.items.find(i => i.id === item.id);
        if (existing) {
            existing.quantity++;
        } else {
            this.items.push({...item, quantity: 1});
        }
        this.updateCart();
        this.showNotification('Producto añadido al carrito');
    }
    updateCart() {
        const total = this.items.reduce((sum, i) => sum + i.quantity, 0);
        this.cartCount.textContent = total;
        localStorage.setItem('cart', JSON.stringify(this.items));
    }
    showNotification(msg) {
        const notif = document.createElement('div');
        notif.className = 'notification alert alert-success position-fixed top-0 end-0 m-4';
        notif.textContent = msg;
        document.body.appendChild(notif);
        setTimeout(() => notif.remove(), 2500);
    }
}
const cart = new ShoppingCart();
document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', function() {
        cart.addItem({
            id: this.dataset.id,
            name: this.dataset.name,
            price: parseFloat(this.dataset.price)
        });
    });
});

// Modo oscuro
document.querySelector('.theme-toggle').addEventListener('click', function() {
    const html = document.documentElement;
    const icon = this.querySelector('i');
    const dark = html.getAttribute('data-theme') === 'dark';
    html.setAttribute('data-theme', dark ? 'light' : 'dark');
    localStorage.setItem('theme', dark ? 'light' : 'dark');
    icon.classList.toggle('bi-moon', dark);
    icon.classList.toggle('bi-sun', !dark);
});
if(localStorage.getItem('theme') === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.querySelector('.theme-toggle i').classList.replace('bi-moon','bi-sun');
}

// Popup de mensaje para formularios
function showMessagePopup() {
    document.getElementById('messagePopup').classList.add('active');
    document.getElementById('overlay').classList.add('active');
}
function closeMessagePopup() {
    document.getElementById('messagePopup').classList.remove('active');
    document.getElementById('overlay').classList.remove('active');
}
window.closeMessagePopup = closeMessagePopup;
document.getElementById('overlay').addEventListener('click', closeMessagePopup);

document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    showMessagePopup();
    this.reset();
});
document.querySelector('.newsletter-form').addEventListener('submit', function(e) {
    e.preventDefault();
    showMessagePopup();
    this.reset();
});
