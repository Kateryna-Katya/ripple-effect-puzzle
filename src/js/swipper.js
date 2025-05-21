import Swiper from 'swiper';
import 'swiper/css';

const swiperConfigs = [
  {
    selector: '.advantages-swiper',
    slideClass: 'advantages-swiper-slide',
    wrapperClass: 'advantages-swiper-wrapper',
    paginationItemSelector: '.pagination-item',
  },
  {
    selector: '.play-swiper',
    slideClass: 'play-swiper-slide',
    wrapperClass: 'play-swiper-wrapper',
    paginationItemSelector: '.play-pagination-item',
  },
  {
    selector: '.user-swiper',
    slideClass: 'user-swiper-slide',
    wrapperClass: 'user-swiper-wrapper',
    paginationItemSelector: '.user-pagination-item',
  },
  {
    selector: '.gameplay-swiper',
    slideClass: 'gameplay-swiper-slide',
    wrapperClass: 'gameplay-swiper-wrapper',
    paginationItemSelector: '.gameplay-pagination-item',
  }
];

const swiperInstances = {};

function initSwipers() {
  const screenWidth = window.innerWidth;

  swiperConfigs.forEach(config => {
    const container = document.querySelector(config.selector);
    if (!container) return;

    const id = config.selector;

    // Destroy existing swiper if exists
    if (swiperInstances[id]) {
      swiperInstances[id].destroy(true, true);
      delete swiperInstances[id];
      clearPagination(config.paginationItemSelector);
    }

    const isProgressSwiper = config.selector === '.user-swiper';

    if (isProgressSwiper) {
      // Progress bar swiper (user-swiper)
      if (screenWidth < 1439) {
        const swiper = new Swiper(id, {
          slidesPerView: 1,
          spaceBetween: 10,
          loop: true,
          slideClass: config.slideClass,
          wrapperClass: config.wrapperClass,
          direction: 'horizontal',
          on: {
            init: function () {
              updatePagination(config.paginationItemSelector, this.realIndex);
            },
            slideChange: function () {
              updatePagination(config.paginationItemSelector, this.realIndex);
            },
          },
        });

        swiperInstances[id] = swiper;

        const paginationItems = document.querySelectorAll(config.paginationItemSelector);
        paginationItems.forEach((item, index) => {
          item.addEventListener('click', () => {
            swiper.slideToLoop(index);
          });
        });
      } else {
        const swiper = new Swiper(id, {
          slidesPerView: 3,
          spaceBetween: 20,
          loop: true,
          slideClass: config.slideClass,
          wrapperClass: config.wrapperClass,
          direction: 'horizontal',
          allowTouchMove: true,
          on: {
            init: function () {
              updateProgressBar(this);
            },
            slideChange: function () {
              updateProgressBar(this);
            },
          },
        });

        swiperInstances[id] = swiper;
      }
    } else {
      // Other swipers (advantages, play, gameplay)
      if (screenWidth < 1439) {
        const swiper = new Swiper(id, {
          slidesPerView: 1,
          spaceBetween: 10,
          loop: true,
          slideClass: config.slideClass,
          wrapperClass: config.wrapperClass,
          direction: 'horizontal',
          on: {
            init: function () {
              updatePagination(config.paginationItemSelector, this.realIndex);
            },
            slideChange: function () {
              updatePagination(config.paginationItemSelector, this.realIndex);
            },
          },
        });

        swiperInstances[id] = swiper;

        const paginationItems = document.querySelectorAll(config.paginationItemSelector);
        paginationItems.forEach((item, index) => {
          item.addEventListener('click', () => {
            swiper.slideToLoop(index);
          });
        });
      } else {
        // Destroy swiper on desktop for non-progress ones
        if (swiperInstances[id]) {
          swiperInstances[id].destroy(true, true);
          delete swiperInstances[id];
          clearPagination(config.paginationItemSelector);
        }
      }
    }
  });
}

function updatePagination(paginationSelector, activeIndex) {
  const items = document.querySelectorAll(paginationSelector);
  items.forEach((item, index) => {
    item.classList.toggle('active', index === activeIndex);
  });
}

function clearPagination(paginationSelector) {
  const items = document.querySelectorAll(paginationSelector);
  items.forEach(item => item.classList.remove('active'));
}

function updateProgressBar(swiper) {
  if (!swiper) return;

  let progressBar;
  if (swiper.el.classList.contains('user-swiper')) {
    progressBar = document.querySelector('.pag_bar');
  }

  if (!progressBar) return;

  const total = swiper.slides.length - (swiper.loopedSlides * 0.1);
  const currentIndex = swiper.realIndex;
  const percent = ((currentIndex + 1) / total) * 100;
  progressBar.style.width = `${percent}%`;
}

// Init
document.addEventListener('DOMContentLoaded', initSwipers);
window.addEventListener('resize', initSwipers);