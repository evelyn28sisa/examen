let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
const listaCarrito = document.getElementById('lista-carrito');
const totalSpan = document.getElementById('total');
const carritoVacio = document.getElementById('carrito-vacio');

function guardarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

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
    guardarCarrito();
    actualizarCarrito();
    alert(`${nombre} agregado al carrito`);
  });
});

document.getElementById('vaciar-carrito').addEventListener('click', () => {
  carrito = [];
  actualizarCarrito();
});

// Slider Hero
const slides = document.querySelector('.slides');
const prevBtn = document.querySelector('.slider-btn.prev');
const nextBtn = document.querySelector('.slider-btn.next');
const dotsContainer = document.querySelector('.slider-dots');
let currentSlide = 0;
let slideInterval;

function createDots() {
  const slideCount = document.querySelectorAll('.slide').length;
  dotsContainer.innerHTML = '';
  for (let i = 0; i < slideCount; i++) {
    const btn = document.createElement('button');
    btn.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(btn);
  }
  updateDots();
}

function updateDots() {
  document.querySelectorAll('.slider-dots button').forEach((dot, i) => {
    dot.classList.toggle('active', i === currentSlide);
  });
}

function goToSlide(index) {
  const slideCount = document.querySelectorAll('.slide').length;
  currentSlide = (index + slideCount) % slideCount;
  slides.style.transform = `translateX(-${currentSlide * 100 / slideCount}%)`;
  updateDots();
  resetInterval();
}

function nextSlide() { goToSlide(currentSlide + 1); }
function prevSlide() { goToSlide(currentSlide - 1); }

function startInterval() {
  slideInterval = setInterval(nextSlide, 5000);
}

function resetInterval() {
  clearInterval(slideInterval);
  startInterval();
}

if (slides) {
  createDots();
  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);
  startInterval();

  // Pausar en hover
  const hero = document.querySelector('.hero');
  hero.addEventListener('mouseenter', () => clearInterval(slideInterval));
  hero.addEventListener('mouseleave', startInterval);

  // Touch/swipe support
  let startX = 0;
  hero.addEventListener('touchstart', e => startX = e.touches[0].clientX);
  hero.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? nextSlide() : prevSlide();
  });
}
