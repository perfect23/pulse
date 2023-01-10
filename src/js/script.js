     // slick slider

$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 500,
        fade: true,
        autoplay: true,
        autoplaySpeed: 800,
        cssEase: 'linear',
        prevArrow: '<button type="button" class="slick-prev"><img src="img/icons/arr_1.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="img/icons/arr_2.svg"></button>',

        responsive: [
            {
            dots: true,
            arrows: false,
      }
        ]

        // responsive: [
        //     {
        //     breakpoint: 1024,
        //     settings: {
        //         slidesToShow: 3,
        //         slidesToScroll: 3,
        //         infinite: true,
        //         dots: true
        //     }
        //     },
        //     {
        //     breakpoint: 600,
        //     settings: {
        //         slidesToShow: 2,
        //         slidesToScroll: 2
        //     }
        //     },
        //     {
        //     breakpoint: 480,
        //     settings: {
        //         slidesToShow: 1,
        //         slidesToScroll: 1
        //     }
        //     }
//         //     // You can unslick at a given breakpoint now by adding:
//         //     // settings: "unslick"
//         //     // instead of a settings object
//         // ]
    

        
    });

    // tabs
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
      $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });



    function toggleSlide(item) {
      $(item).each(function(i) {
        $(this).on('click', function(e) {
          e.preventDefault();
          $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
          $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
        });
      });
    }
    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    
// modal

    $('[data-modal=consultation]').on('click', function() {
      $('.overlay, #consultation').fadeIn('slow');
    });
    $('.modal-dialog__close, .modal__close').on('click', function() {
      $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
    });
   
    $('.button_mini').each(function(i) {
      $(this).on( 'click', function() { 
        $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
        $('.overlay, #order').fadeIn('slow');
      });
    });
    const overlay = document.querySelector('.overlay');
 
    $('.overlay').on('click', function(e) {
        if (e.target === overlay) {
            $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
        }
    });


    // validate


    function validateForms(form) {
      $(form).validate({
        rules: {
          name: "required",
          phone: "required",
          email: {
            required: true,
            email: true
          }
        },
        messages: {
          name: "Please specify your name",
          email: {
            required: "We need your email address to contact you",
            email: "Your email address must be in the format of name@domain.com"
          }
        }
      });
    };

    validateForms('#consultation-form');
    validateForms('#order form');
    validateForms('#consultation form');

    $('input[name=phone]').mask("+375(99)999-99-99");


    // отправка писем на почту
    $('form').submit(function(e) {
      e.preventDefault();

      if(!$(this).valid()) {
        return;
      }

      $.ajax({
        type: "POST",
        url:"mailer/smart.php",
        data: $(this).serialize()
      }).done(function() {
        $(this).find("input").val("");


        $('#consultation, #order').fadeOut();
        $('overlay, #thanks').fadeIn('slow');


        $('form').trigger('reset');
      });
      return false;
    });

    // smooth scroll

    $(window).scroll(function() {
      if ($(this).scrollTop() > 1600) {
          $('.pageup').fadeIn();
      } else {
          $('.pageup').fadeOut();
      }
  });

  $("a[href^='#up']").click(function(){
      const _href = $(this).attr("href");
      $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
      return false;
  });


  new WOW().init();

  });



// tiny-slider

// const slider = tns({
//   container: '.carousel__inner',
//   items: 1,
//   slideBy: 'page',
//   autoplay: false,
//   controls: false,
//   nav: false,
  
  

// });

// document.querySelector('.prev').addEventListener('click', function () {
//   slider.goTo('prev');
// });
// document.querySelector('.next').addEventListener('click', function () {
//   slider.goTo('next');
// });



// owlCarousel

// $('.owl-carousel').owlCarousel({
//   loop:true,
//   items: 1,
//   margin:10,
//   nav:true,
//   responsive:{
//       0:{
//           items:1
//       },
//       600:{
//           items:3
//       },
//       1000:{
//           items:5
//       }
//   }
// })



