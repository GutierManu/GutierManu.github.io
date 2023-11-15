const carousel = document.querySelector(".carousel"),
firstImg = carousel.querySelectorAll("img")[0],
arrowIcons = document.querySelectorAll(".wrapper i");
carouselImages = carousel.querySelectorAll("img"); // Add this line
carouselVideos = carousel.querySelectorAll("iframe");


let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;

const showHideIcons = () => {
    // showing and hiding prev/next icon according to carousel scroll left value
    let scrollWidth = (carousel.scrollWidth - carousel.clientWidth) ; // getting max scrollable width
    arrowIcons[0].style.display = (carousel.scrollLeft) == 0 ? "none" : "block";
    arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
}

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        let firstImgWidth = firstImg.clientWidth + 17; // getting first img width & adding 14 margin value
        // if clicked icon is left, reduce width value from the carousel scroll left else add to it
        carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
        setTimeout(() => showHideIcons(), 100); // calling showHideIcons after 60ms
    });
});

const autoSlide = () => {
    // if there is no image left to scroll then return from here
    if(carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth) > -1 || carousel.scrollLeft <= 0) return;

    positionDiff = Math.abs(positionDiff); // making positionDiff value to positive
    let firstImgWidth = firstImg.clientWidth + 14;
    // getting difference value that needs to add or reduce from carousel left to take middle img center
    let valDifference = firstImgWidth - positionDiff;

    if(carousel.scrollLeft > prevScrollLeft) { // if user is scrolling to the right
        return carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
    }
    // if user is scrolling to the left
    carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
}

const dragStart = (e) => {
    // updatating global variables value on mouse down event
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    // scrolling images/carousel to left according to mouse pointer
    if(!isDragStart) return;
    e.preventDefault();
    isDragging = true;
    carousel.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons();
}

const dragStop = () => {
    isDragStart = false;
    carousel.classList.remove("dragging");

    if(!isDragging) return;
    isDragging = false;
    autoSlide();
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

document.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

document.addEventListener("mouseup", dragStop);
carousel.addEventListener("touchend", dragStop);



// Get the preview div
let currentContent = carouselVideos[0];

updatePreview(currentContent);

carousel.addEventListener("scroll", () => {
    // Calcula el centro del carrusel
    const center = carousel.scrollLeft + carousel.offsetWidth / 2;
    let noImagesVisible = true; // Asume que no hay imágenes visibles inicialmente

    // Encuentra la imagen que está más cerca del centro
    let closestImage = carouselImages[0];
    carouselImages.forEach((img) => {
        const imgCenter = img.offsetLeft + img.offsetWidth / 2;
        if (
            Math.abs(imgCenter - center) <
            Math.abs(closestImage.offsetLeft + closestImage.offsetWidth / 2 - center)
        ) {
            closestImage = img;
            noImagesVisible = false; // Hay imágenes visibles
        }
    });

    // Si no hay imágenes visibles, muestra el iframe en el preview
    if (noImagesVisible) {
        currentContent = carouselVideos[0];
    } else {
        // Si hay imágenes visibles, muestra la imagen en el preview
        currentContent = closestImage;
    }

    // Actualiza el contenido del preview
    updatePreview(currentContent);
});

// Función para actualizar el contenido del preview
function updatePreview(content) {
    const previewContainer = document.getElementById("previewContainer");

    // Limpia el contenido existente
    previewContainer.innerHTML = "";

    // Agrega el nuevo contenido
    if (content.tagName === "IMG") {
        // Si es una imagen, agrega la imagen al contenedor
        const imgElement = document.createElement("img");
        imgElement.src = content.src;
        imgElement.alt = "Preview Image";
        previewContainer.appendChild(imgElement);
    } else if (content.tagName === "IFRAME") {
        // Si es un iframe, agrega el iframe al contenedor
        const iframeElement = content.cloneNode(true); // Clona el iframe para evitar problemas con el mismo nodo en múltiples lugares
        
        iframeElement.style.width = "1280px"; // Establece el ancho del iframe a 1280px
        iframeElement.style.height = "535px"; // Establece la altura del iframe a 720px
        iframeElement.style.zIndex = "900";
        iframeElement.style.pointerEvents = "auto";
        previewContainer.appendChild(iframeElement);
    }
}