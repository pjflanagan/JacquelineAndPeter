
(function() {
  $('.sidebar').on('scroll', () => {
    $('.slideshow-marker').each(() => {
      const top = $(this).offset().top;
      console.log(top);
    })
  });
})();