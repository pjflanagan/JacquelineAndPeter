
function scrollToStory() {
  $('.sidebar').animate({
    scrollTop: $('#our-story').offset().top - 80
  }, 800);
}

function seeMore(date) {
  $(`#see-more_${date}`).css({
    height: 'auto',
    maxHeight: '800px',
  });
  $(`#see-more-link_${date}`).css({
    opacity: 0,
    pointerEvents: 'none'
  });
}

(function () {

  // Slideshow

  const PAGE_CENTER = $(window).innerHeight() / 2;

  $('.sidebar').on('scroll', () => {
    let closestElementScrollDistance = Infinity;
    let closestElement;

    $('.slideshow-marker').each(function () {
      const scrollDistance = $(this).offset().top - PAGE_CENTER;

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
      const slide = $(closestElement).attr('data-slide');
      $('.slideshow-image').css({
        filter: `opacity(0)`
      });
      $(`.slideshow-image#${slide}`).css({
        filter: `opacity(1)`
      });
    }

  });
})();