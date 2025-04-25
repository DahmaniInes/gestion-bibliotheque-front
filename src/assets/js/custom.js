(function ($) {
  "use strict";

  // Vérification de jQuery
  if (typeof $ === 'undefined') {
    console.error('jQuery is not loaded');
    return;
  } else {
    console.log('jQuery is loaded, version:', $.fn.jquery);
  }

  // Vérification de Owl Carousel
  if (typeof $.fn.owlCarousel === 'undefined') {
    console.error('Owl Carousel is not loaded');
  } else {
    console.log('Owl Carousel is loaded');
  }

  // Vérification de leanModal
  if (typeof $.fn.leanModal === 'undefined') {
    console.error('leanModal is not loaded');
  } else {
    console.log('leanModal is loaded');
  }

  // Header Type = Fixed
  $(window).scroll(function () {
    var scroll = $(window).scrollTop();
    var box = $('.header-text').height();
    var header = $('header').height();

    if (scroll >= box - header) {
      $("header").addClass("background-header");
    } else {
      $("header").removeClass("background-header");
    }
  });

  // Initialisation du carrousel Owl Carousel
  if (typeof $.fn.owlCarousel !== 'undefined') {
    $('.loop').owlCarousel({
      center: true,
      items: 1,
      loop: true,
      autoplay: true,
      nav: true,
      margin: 0,
      responsive: {
        1200: { items: 5 },
        992:  { items: 3 },
        760:  { items: 2 }
      }
    });
  }

  // Initialisation de leanModal
  if (typeof $.fn.leanModal !== 'undefined') {
    $("#modal_trigger").leanModal({
      top: 100,
      overlay: 0.6,
      closeButton: ".modal_close"
    });
  }

  // Gestion des formulaires de connexion/inscription
  $(function () {
    $("#login_form").click(function () {
      $(".social_login").hide();
      $(".user_login").show();
      return false;
    });
    $("#register_form").click(function () {
      $(".social_login").hide();
      $(".user_register").show();
      $(".header_title").text('Register');
      return false;
    });
    $(".back_btn").click(function () {
      $(".user_login, .user_register").hide();
      $(".social_login").show();
      $(".header_title").text('Login');
      return false;
    });
  });

  // Accordeon (naccs)
  $(document).on("click", ".naccs .menu div", function () {
    var idx = $(this).index();
    if (!$(this).hasClass("active")) {
      $(".naccs .menu div, .naccs ul li").removeClass("active");
      $(this).addClass("active");
      $(".naccs ul")
        .find("li:eq(" + idx + ")")
        .addClass("active")
        .end()
        .height($(".naccs ul li:eq(" + idx + ")").innerHeight());
    }
  });

  // Menu Dropdown Toggle (mobile)
  if ($('.menu-trigger').length) {
    $(".menu-trigger").on('click', function () {
      $(this).toggleClass('active');
      $('.header-area .nav').slideToggle(200);
    });
  }

  // Menu elevator animation (click)
  $('.scroll-to-section a[href*="#"]:not([href="#"])').on('click', function (e) {
    var hash = this.hash;
    if (!hash || !hash.startsWith('#')) return;

    var $target = $(hash);
    if (!$target.length) return;

    e.preventDefault();
    if ($(window).width() < 991) {
      $('.menu-trigger').removeClass('active');
      $('.header-area .nav').slideUp(200);
    }
    $('html, body').animate({
      scrollTop: $target.offset().top + 1
    }, 700);
  });

  // Smoothscroll + activation onglet
  $(document).ready(function () {
    $(document).on("scroll", onScroll);

    $('.scroll-to-section a[href^="#"]').on('click', function (e) {
      var hash = this.hash;
      if (!hash || !hash.startsWith('#')) return;

      var $target = $(hash);
      if (!$target.length) return;

      e.preventDefault();
      $(document).off("scroll");
      $('.scroll-to-section a').removeClass('active');
      $(this).addClass('active');

      $('html, body').stop().animate({
        scrollTop: $target.offset().top + 1
      }, 500, 'swing', function () {
        window.location.hash = hash;
        $(document).on("scroll", onScroll);
      });
    });
  });

  // Fonction de détection du scroll pour activer les liens
  function onScroll() {
    var scrollPos = $(document).scrollTop();
    $('.scroll-to-section a[href^="#"]').each(function () {
      var currLink = $(this);
      var hash = this.hash;
      if (!hash) return;

      var $ref = $(hash);
      if (!$ref.length) return;

      if ($ref.offset().top <= scrollPos && $ref.offset().top + $ref.height() > scrollPos) {
        $('.scroll-to-section a').removeClass("active");
        currLink.addClass("active");
      } else {
        currLink.removeClass("active");
      }
    });
  }

  // Page loading animation (préloader)
  $(window).on('load', function () {
    $('#js-preloader').addClass('loaded');
  });

  // Window Resize Mobile Menu Fix
  function mobileNav() {
    var width = $(window).width();
    $('.submenu').on('click', function () {
      if (width < 767) {
        $('.submenu ul').removeClass('active');
        $(this).find('ul').toggleClass('active');
      }
    });
  }
  mobileNav();

})(window.jQuery);
