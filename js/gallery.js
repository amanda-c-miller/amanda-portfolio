document.addEventListener('DOMContentLoaded', function () {

  const galleryModal = document.getElementById('galleryModal');
  const carouselContent = document.getElementById('carouselContent');
  const carousel = document.getElementById('dynamicCarousel');

  let currentGallerySource = null;

  /* ----------------------------------
     Pause All Videos Helper
  ---------------------------------- */

  function pauseAllVideos() {
    document.querySelectorAll('#dynamicCarousel video').forEach(video => {
      video.pause();
      video.currentTime = 0;
    });
  }

  /* ----------------------------------
     Render Gallery Slides (Optimized)
  ---------------------------------- */

  function renderGallerySlides(galleryData) {

    // Avoid re-rendering if same gallery clicked again
    if (currentGallerySource === galleryData) return;

    currentGallerySource = galleryData;

    carouselContent.innerHTML = '';

    galleryData.forEach((item, index) => {

      const slide = document.createElement('div');
      slide.className = 'carousel-item' + (index === 0 ? ' active' : '');

      if (item.type === 'image') {

        slide.innerHTML = `
          <img src="${item.src}"
               class="d-block w-100"
               loading="lazy"
               decoding="async">
        `;

      } else if (item.type === 'video') {

        slide.innerHTML = `
          <div class="ratio ratio-16x9">
            <video controls preload="metadata">
              <source src="${item.src}" type="video/mp4">
            </video>
          </div>
        `;
      }

      carouselContent.appendChild(slide);
    });
  }

  /* ----------------------------------
     Bind Click Events Once
  ---------------------------------- */

  document.querySelectorAll('.project-img-wrapper').forEach(wrapper => {

    wrapper.addEventListener('click', function () {

      try {
        const galleryData = JSON.parse(this.dataset.gallery);
        renderGallerySlides(galleryData);
      }
      catch (e) {
        console.error("Gallery parsing error:", e);
      }

    });

  });

  /* ----------------------------------
     Lifecycle Video Control
  ---------------------------------- */

  galleryModal.addEventListener('hidden.bs.modal', pauseAllVideos);
  carousel.addEventListener('slide.bs.carousel', pauseAllVideos);

});
