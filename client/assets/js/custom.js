


$('form.form-register').submit(eventHandler=>{
  eventHandler.preventDefault()
  $.ajax({
    url: 'http://localhost:3000/users/signup',
    type: 'POST',
    data: {
      username: $('#register-username').val(),
      password: $('#register-password').val(),
      email: $('#register-email').val()
    },
    success: function(response){
      $('#register-status').empty()
      $('#register-status').append(`${response.message}`)
    }
  })
})

$('form.form-signin').submit(eventHandler=>{
  eventHandler.preventDefault()
  $.ajax({
    url: 'http://localhost:3000/users/signin',
    type: 'POST',
    data: {
      username: $('#signin-username').val(),
      password: $('#signin-password').val()
    },
    success: function(response){
      console.log(response);
      if (response.hasOwnProperty('errors')) {
        $('#signin-status').fadeOut('fast')
        $('#signin-status').empty()
        $('#signin-status').append(`${response.message}`)
        $('#signin-status').fadeIn('slow')
      } else {
        alert('Login success')
        localStorage.setItem('adatodotoken', response.token)
        window.location.href = "/todo.html"
      }
    }
  })
})


// Smooth scrolling using jQuery easing
$('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
  if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    if (target.length) {
      $('html, body').animate({
        scrollTop: target.offset().top
      }, 1000, "easeInOutExpo");
      return false;
    }
  }
});
