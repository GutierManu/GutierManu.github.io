const cards = document.querySelectorAll('.card2');
const select = document.getElementById('categories');
select.value = 'All'

// Esta función se encarga de filtrar las tarjetas
function filterCards() {
    const selectedCategory = select.value;

    cards.forEach(card => {
        const badge = card.querySelector('.badge');
        
        if (selectedCategory === 'All' || badge.getAttribute('value') === selectedCategory) {
            card.removeAttribute('hidden');
        } else {
            card.setAttribute('hidden', true);
        }
    });
}

// Agregar un event listener para el evento "change" en el select
select.addEventListener('change', filterCards);

// Llamar a la función filterCards para aplicar el filtro inicial
filterCards();