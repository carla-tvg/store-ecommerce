document.addEventListener('DOMContentLoaded', () => {
    const carrito = [];
    const carritoItems = document.getElementById('carrito-items');
    const carritoVacio = document.getElementById('carrito-vacio');
    const totalCarrito = document.getElementById('total-carrito');

    function actualizarCarrito() {
        carritoItems.innerHTML = '';
        let total = 0;

        if (carrito.length === 0) {
            carritoVacio.style.display = 'block';
            totalCarrito.style.display = 'none';
        } else {
            carritoVacio.style.display = 'none';
            totalCarrito.style.display = 'block';

            carrito.forEach(item => {
                const li = document.createElement('li');
                li.className = 'carrito-item';
                li.innerHTML = `
                    <img src="${item.image}" class="product-thumbnail" alt="${item.name}">
                    <div class="product-details">
                        <span class="product-name">${item.name}</span>
                        <span class="product-price">${item.price.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</span>
                        <span class="product-quantity">Cantidad: ${item.quantity}</span>
                        <span class="product-subtotal">Subtotal: ${ (item.price * item.quantity).toLocaleString('es-CO', { style: 'currency', currency: 'COP' }) }</span>
                        <button class="remove-item-btn" data-name="${item.name}">Eliminar</button>
                    </div>
                `;
                carritoItems.appendChild(li);
                total += item.price * item.quantity;
            });

            totalCarrito.textContent = `Total: ${total.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}`;
        }
    }

    function agregarAlCarrito(name, price, image) {
        const itemExistente = carrito.find(item => item.name === name);
        if (itemExistente) {
            itemExistente.quantity += 1;
        } else {
            carrito.push({ name, price, image, quantity: 1 });
        }
        actualizarCarrito();
    }

    function vaciarCarrito() {
        carrito.length = 0;
        actualizarCarrito();
    }

    function eliminarDelCarrito(name) {
        const index = carrito.findIndex(item => item.name === name);
        if (index !== -1) {
            carrito.splice(index, 1);
            actualizarCarrito();
        }
    }

    document.getElementById('carrito-items').addEventListener('click', e => {
        if (e.target.classList.contains('remove-item-btn')) {
            const name = e.target.getAttribute('data-name');
            eliminarDelCarrito(name);
        }
    });

    document.getElementById('vaciar-carrito').addEventListener('click', vaciarCarrito);

    document.getElementById('continuar-compra').addEventListener('click', () => {
        alert('Proceder con la compra.');
    });

    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', e => {
            const name = e.target.getAttribute('data-name');
            const price = parseFloat(e.target.getAttribute('data-price'));
            const image = e.target.closest('.product-card').querySelector('img').src;
            agregarAlCarrito(name, price, image);
        });
    });
});

