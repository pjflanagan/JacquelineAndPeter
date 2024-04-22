
const BREAKPOINT = 788;

// Scroll To

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

// See More

function seeMore(date) {
  $(`#see-more_${date}`).addClass('open');
  $(`#see-more-link_${date}`).css({
    opacity: 0,
    pointerEvents: 'none'
  });
}

// Translate 

function translateSection(date, [defaultLang, secondaryLang]) {
  const isCurrentlyDefault = !$(`.translatable.t-${date}-${defaultLang}`).first().hasClass('hidden');
  const [addLang, removeLang] = isCurrentlyDefault ? [secondaryLang, defaultLang] : [defaultLang, secondaryLang];
  $(`.translatable.t-${date}-${addLang}`).removeClass('hidden').addClass('visible');
  $(`.translatable.t-${date}-${removeLang}`).removeClass('visible').addClass('hidden');
}

// Slideshow

let autoSlideshowInterval;
function setAutoSlideshow() {
  clearInterval(autoSlideshowInterval);
  let i = 1;
  const allSlides = $('.slideshow-image');
  autoSlideshowInterval = setInterval(() => {
    $('.slideshow-image').css({
      opacity: 0,
      transition: `opacity 1.2s`,
      webkitTransition: `opacity 1.2s`
    });
    $(allSlides[i % allSlides.length]).css({
      opacity: `1`
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
        opacity: 0,
        transition: `opacity 0.4s`,
        webkitTransition: `opacity 0.4s`
      });
      $(`.slideshow-image#${activeSlide}`).css({
        opacity: 1
      });
    }
  });
}

let slideshowType;
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

// Main

(function () {
  setSlideshowTypeFromScreenSize();
  $(window).on('resize', () => {
    setSlideshowTypeFromScreenSize();
  });
})();
