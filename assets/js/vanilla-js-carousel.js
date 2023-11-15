var carousel = new Carousel({
    elem: 'carousel',    // id of the carousel container
    autoplay: false,     // starts the rotation automatically
    infinite: true,      // enables the infinite mode
    interval: 3500,      // interval between slide changes
    initial: 0,          // slide to start with
    dots: true,          // show navigation dots
    arrows: true,        // show navigation arrows
    buttons: true,      // hide play/stop buttons,
    btnStopText: 'Pause' // STOP button text
});



// Show slide number 3 (Numeration of slides starts at 0)
carousel.show(0);

// Move to the next slide
carousel.next();