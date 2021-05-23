import images from './gallery-items.js';

const galleryEl = document.querySelector('.js-gallery');
const imagesGalleryEl = createImagesGallery(images);
const openModalLinkEl = document.querySelector('.js-lightbox');
const openImageInModalEl = document.querySelector('.lightbox__image');
const closeModalBtnEl = document.querySelector('[data-action = "close-lightbox"]');
const overlayEl = document.querySelector('.lightbox__overlay');

galleryEl.insertAdjacentHTML('beforeend', imagesGalleryEl);

galleryEl.addEventListener('click', onGalleryElClick);
closeModalBtnEl.addEventListener('click', onCloseModalClick);
overlayEl.addEventListener('click', onOverlayCloseModalClick);

// 1.Создание и рендер разметки по массиву данных и предоставленному шаблону.
function createImagesGallery(images) {
    return images.map(({ preview, original, description }) => {
        return `
                <li class="gallery__item">
                    <a class="gallery__link"
                        href="${original}"
                    >
                        <img
                            class="gallery__image"
                            src="${preview}"
                            data-source="${original}"
                            alt="${description}"
                        />
                    </a>
                </li>`
    }).join('');   
}

//2.Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
function onGalleryElClick(event) {

    const isImageLinkEl = event.target.classList.contains('gallery__image');

    if (!isImageLinkEl) {
        return;
    }
    event.preventDefault();
    // 3.Открытие модального окна по клику на элементе галереи.
    openModalLinkEl.classList.add('is-open');
    // 4.Подмена значения атрибута src элемента img.lightbox__image.
    openImageInModalEl.src = event.target.dataset.source;
    openImageInModalEl.alt = event.target.alt
    // Закрытие модального окна по нажатию клавиши ESC.
    window.addEventListener('keydown', onEscCloseModalClick);
    // Пролистывание изображений галереи
    window.addEventListener('keydown', onFlippingImageClick);
    
}
 
//5.Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
 function onCloseModalClick() {
     openModalLinkEl.classList.remove('is-open');
    // 6.Очистка значения атрибута src элемента img.lightbox__image.
     openImageInModalEl.src ='';
     openImageInModalEl.alt ='';
     // Закрытие модального окна по нажатию клавиши ESC.
     window.removeEventListener('keydown', onEscCloseModalClick);
    // Пролистывание изображений галереи
     window.removeEventListener('keydown', onFlippingImageClick);
}

//  Закрытие модального окна по клику на div.lightbox__overlay.
function onOverlayCloseModalClick () {
    onCloseModalClick();
}

// Закрытие модального окна по нажатию клавиши ESC.
function onEscCloseModalClick(event) {
    if (event.code === 'Escape') {
        onCloseModalClick();
    }
  
}

// Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо".
function onFlippingImageClick(event) {
    let currentIndexImageEl = images.map(image => image.description).findIndex(alt => alt === openImageInModalEl.alt);
    const lengthGalleryEl = images.length-1;
    
    if (event.code === 'ArrowRight') {
    
        if (currentIndexImageEl < lengthGalleryEl) {
            currentIndexImageEl += 1;
            
        } else currentIndexImageEl = 0;

        openImageInModalEl.src =images[currentIndexImageEl].original;
        openImageInModalEl.alt =images[currentIndexImageEl].description;
    }

    if (event.code === 'ArrowLeft') {
    
        if (currentIndexImageEl > 0) {
            currentIndexImageEl -= 1;
            
        } else currentIndexImageEl = lengthGalleryEl;

        openImageInModalEl.src =images[currentIndexImageEl].original;
        openImageInModalEl.alt =images[currentIndexImageEl].description;
    }
}

