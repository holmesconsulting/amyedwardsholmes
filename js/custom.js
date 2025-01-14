
  (function ($) {
  
  "use strict";

    // AOS ANIMATIONS
    AOS.init();

    // NAVBAR
    $('.navbar-nav .nav-link').click(function(){
        $(".navbar-collapse").collapse('hide');
    });

    // NEWS IMAGE RESIZE
    function NewsImageResize(){
      $(".navbar").scrollspy({ offset: -76 });
      
      var LargeImage = $('.large-news-image').height();

      var MinusHeight = LargeImage - 6;

      $('.news-two-column').css({'height' : (MinusHeight - LargeImage / 2) + 'px'});
    }

    $(window).on("resize", NewsImageResize);
    $(document).on("ready", NewsImageResize);

    $('a[href*="#"]').click(function (event) {
      if (
        location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          event.preventDefault();
          $('html, body').animate({
            scrollTop: target.offset().top - 66
          }, 1000);
        }
      }
    });
    
  })(window.jQuery);

  

  const form = document.getElementById('dataForm');
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const recaptchaResponse = grecaptcha.getResponse();

    if (!recaptchaResponse) {
      alert('Please complete the CAPTCHA.');
      return;
    }

    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      message: document.getElementById('message').value,
      recaptcha: recaptchaResponse
    };

    const response = await fetch('https://script.google.com/macros/s/AKfycbx3v2iiv6Ga3FVyetile4nLoYgMz6aAwPusJmRXeCTs4YgqhoZn5qogMk4mlDlQwYw/exec', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    const result = await response.json();
    if (result.status === 'success') {
      alert('Form submitted successfully!');
      form.reset();
    } else {
      alert('Error submitting form.');
    }
  });
