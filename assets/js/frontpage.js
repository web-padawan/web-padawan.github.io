(function($){

  $(window).load(function () {
    $("img").keepTheRhythm();
  });

  $(document).ready(function () {

    var $p = $('.portfolio-cards');

    $p.on('init', function(slick) {
      $('.portfolio').fadeIn(1000);
    });

    $p.slick({
      focusOnSelect: true,
      lazyLoad: 'ondemand',
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });
  });

  $('#short').css('display', 'none');

  $('.skills__tab').on('click', function(event) {
    event.preventDefault();

    var $this = $(this),
        n = $this.attr('href')
        o = (n === '#full') ? '#short' : '#full';

    if (!$this.hasClass('skills__tab--active')) {

      $(n).css('display', 'block');
      $(o).css('display', 'none');

      $this.addClass('skills__tab--active');
      $('a[href="' + o + '"]').removeClass('skills__tab--active');
    }
  });

})(jQuery);
