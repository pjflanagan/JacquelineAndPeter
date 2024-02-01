
const BREAKPOINT = 780;

function scrollToId(id) {
  const pageCenterY = $(window).innerHeight() / 2;
  const pageWidth = $(window).innerWidth();
  const elementOffsetTop = $(`#${id}`).offset().top;

  if (pageWidth <= BREAKPOINT) {
    const currentBodyScrollDistance = $('.content').scrollTop();
    $('body').animate({
      scrollTop: currentBodyScrollDistance + elementOffsetTop - 80
    }, 800);
  } else {
    const currentSidebarScrollDistance = $('.sidebar').scrollTop();
    $('.sidebar').animate({
      scrollTop: currentSidebarScrollDistance + elementOffsetTop - pageCenterY + 80
    }, 800);
  }
}

function seeMore(date) {
  $(`#see-more_${date}`).css({
    height: 'auto',
    maxHeight: '2000px', // if there is ever a cut off, then increase this
  });
  $(`#see-more-link_${date}`).css({
    opacity: 0,
    pointerEvents: 'none'
  });
}

let slideshowType;

let autoSlideshowInterval;
function setAutoSlideshow() {
  clearInterval(autoSlideshowInterval);
  let i = 1;
  const allSlides = $('.slideshow-image');
  autoSlideshowInterval = setInterval(() => {
    $('.slideshow-image').css({
      filter: `opacity(0)`,
      transition: `filter 1.2s`,
      webkitTransition: `filter 1.2s`
    });
    $(allSlides[i % allSlides.length]).css({
      filter: `opacity(1)`
    });
    ++i;
  }, 4800);
}

function setScrollingSlideshow() {
  $('.sidebar').on('scroll', () => {

    const pageCenterY = $(window).innerHeight() / 2;

    let closestElementScrollDistance = Infinity;
    let closestElement;

    $('.slideshow-marker').each(function () {
      const scrollDistance = $(this).offset().top - pageCenterY;

      // if we haven't reached there yet, ignore
      if (scrollDistance > 0) {
        return;
      }

      // otherwise see if this is the closest scroll point
      if (Math.abs(scrollDistance) < closestElementScrollDistance) {
        closestElementScrollDistance = Math.abs(scrollDistance);
        closestElement = this;
      }

    });

    // if we found a closest element, then set the background to what it says
    if (closestElement) {
      const activeSlide = $(closestElement).attr('data-slide');
      $('.slideshow-image').css({
        filter: `opacity(0)`,
        transition: `filter 0.4s`,
        webkitTransition: `filter 0.4s`
      });
      $(`.slideshow-image#${activeSlide}`).css({
        filter: `opacity(1)`
      });
    }
  });
}

function setSlideshowTypeFromScreenSize() {
  const pageWidth = $(window).innerWidth();
  if (pageWidth <= BREAKPOINT && slideshowType !== 'auto') {
    slideshowType = 'auto';
    $('.sidebar').on('scroll', null);
    setAutoSlideshow();
  } else if (pageWidth > BREAKPOINT && slideshowType !== 'scroll') {
    slideshowType = 'scroll';
    clearInterval(autoSlideshowInterval);  
    setScrollingSlideshow();
  }
}

(function () {
  setSlideshowTypeFromScreenSize();
  $(window).on('resize', () => {
    setSlideshowTypeFromScreenSize();
  });
})();
