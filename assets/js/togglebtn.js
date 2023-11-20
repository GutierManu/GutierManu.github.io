// Función para cambiar el estilo de las cartas ocultas
function toggleHiddenCards() {
    var hiddenCards = document.querySelectorAll('.card2#hiddenCard');
    var toggleButton = document.getElementById('toggleButton');
  
    hiddenCards.forEach(function(card) {
      card.style.position = (card.style.position === 'absolute') ? 'absolute' : 'static';
      card.style.visibility = (card.style.visibility === 'hidden') ? 'hidden' : 'visible';
    });

    toggleButton.style.visibility = 'hidden';
  }
  
  // Evento para activar la función cuando se hace clic en el botón
  document.getElementById('toggleButton').addEventListener('click', toggleHiddenCards);
  