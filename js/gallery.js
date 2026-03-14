document.addEventListener('DOMContentLoaded', function () {

  const galleryModal = document.getElementById('galleryModal');
  const carouselContent = document.getElementById('carouselContent');
  const carousel = document.getElementById('dynamicCarousel');

  let currentGallerySource = null;

// pause video func (called at end)

  function pauseAllVideos() {
    document.querySelectorAll('#dynamicCarousel video').forEach(video => {
      video.pause();
      video.currentTime = 0;
    });

    document.querySelectorAll('#dynamicCarousel iframe').forEach(frame => {
      frame.contentWindow.postMessage(
        '{"event":"command","func":"pauseVideo","args":""}',
        '*'
      );
    });

  }

// build the gallery slides

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

      else if (item.type === 'youtube') {

      slide.innerHTML = `
        <div class="embed-responsive embed-responsive-16by9">
          <iframe
            class="embed-responsive-item"
            src="${item.src}?enablejsapi=1&origin=${location.origin}"
            title="YouTube video"
            allowfullscreen
            loading="lazy"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture">
          </iframe>
        </div>
      `;
      }


      carouselContent.appendChild(slide);
    });
  }

// populate with current images
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

// pause videos to prevent ongoing playback issues
  galleryModal.addEventListener('hidden.bs.modal', pauseAllVideos);
  carousel.addEventListener('slide.bs.carousel', pauseAllVideos);

});
