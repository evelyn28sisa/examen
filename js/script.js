let carrito = [];
const listaCarrito = document.getElementById('lista-carrito');
const totalSpan = document.getElementById('total');
const carritoVacio = document.getElementById('carrito-vacio');

function actualizarCarrito() {
  listaCarrito.innerHTML = '';
  if (carrito.length === 0) {
    carritoVacio.style.display = 'block';
    totalSpan.textContent = '0';
    return;
  }
  carritoVacio.style.display = 'none';
  let total = 0;
  carrito.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `${item.nombre} x${item.cantidad} - $${item.precio * item.cantidad}
      <button data-index="${index}">Eliminar</button>`;
    listaCarrito.appendChild(li);
    total += item.precio * item.cantidad;
  });
  totalSpan.textContent = total.toLocaleString();
  document.querySelectorAll('#lista-carrito li button').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.index);
      carrito.splice(idx, 1);
      actualizarCarrito();
    });
  });
}

document.querySelectorAll('.agregar').forEach(boton => {
  boton.addEventListener('click', () => {
    const card = boton.closest('.card');
    const nombre = card.dataset.name;
    const precio = parseInt(card.dataset.price);
    const existente = carrito.find(item => item.nombre === nombre);
    if (existente) {
      existente.cantidad++;
    } else {
      carrito.push({ nombre, precio, cantidad: 1 });
    }
    actualizarCarrito();
    alert(`${nombre} agregado al carrito`);
  });
});

document.getElementById('vaciar-carrito').addEventListener('click', () => {
  carrito = [];
  actualizarCarrito();
});
