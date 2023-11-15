const iframe = document.getElementById('miiframe');

// Escuchar el evento de carga del iframe
iframe.onload = () => {

  // Escuchar cuando el player de YouTube esté listo
  iframe.contentWindow.onYouTubeIframeAPIReady = () => {

    // Obtener el player de YouTube
    const player = iframe.contentWindow.YT.Player('miiframe');
    
    // Escuchar el evento ready del player
    player.on('ready', (event) => {

      // Obtener elemento video
      const video = event.target.getIframe().querySelector('video');
      
      // Reproducir
      video.play();

    });

  }

};