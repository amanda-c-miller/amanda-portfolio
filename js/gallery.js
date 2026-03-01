document.addEventListener('DOMContentLoaded', function () {

  const galleryModal = document.getElementById('galleryModal');
  const carouselContent = document.getElementById('carouselContent');
  const carousel = document.getElementById('dynamicCarousel');


    function pauseAllVideos() {
    const videos = document.querySelectorAll('#dynamicCarousel video');
    videos.forEach(video => {
        video.pause();
        video.currentTime = 0; 
    });
    }

    galleryModal.addEventListener('hidden.bs.modal', pauseAllVideos);
    carousel.addEventListener('slide.bs.carousel', pauseAllVideos);

document.querySelectorAll('.project-img-wrapper').forEach(wrapper => {

  wrapper.addEventListener('click', function () {

    const galleryData = JSON.parse(this.dataset.gallery);
    carouselContent.innerHTML = '';

    galleryData.forEach((item, index) => {

      const slide = document.createElement('div');
      slide.className = 'carousel-item' + (index === 0 ? ' active' : '');

      if (item.type === 'image') {
        slide.innerHTML = `
          <img src="${item.src}" class="d-block w-100">
        `;
      }

      if (item.type === 'video') {
        slide.innerHTML = `
          <div class="ratio ratio-16x9">
            <video controls>
              <source src="${item.src}" type="video/mp4">
            </video>
          </div>
        `;
      }

      carouselContent.appendChild(slide);
    });

  });

});

  // Pause videos when modal closes
  galleryModal.addEventListener('hidden.bs.modal', function () {
    const videos = galleryModal.querySelectorAll('video');
    videos.forEach(video => video.pause());
  });

});