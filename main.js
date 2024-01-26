
(function () {
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
      const slideshowImage = $(closestElement).attr('data-slideshowImage');
      $('#slideshow').css({
        backgroundImage: `url(${slideshowImage})`,
        // backgroundSize: 'cover',
        // backgroundPosition: 'center'
      })
    }

  });
})();