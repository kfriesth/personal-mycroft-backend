function message(status, shake=false, id="") {
  if (shake) {
    $("#"+id).effect("shake", {direction: "right", times: 2, distance: 8}, 250)
  } 
  document.getElementById('feedback').innerHTML = status
  $("#feedback").show().delay(2000).fadeOut()
}

function error(type) {
  $("."+type).css("border-color", "#E14448")
}

var login = function() {
  $.post({
    type: "POST",
    url: "/",
    data: {"username": $("#login-user").val(), 
           "password": $("#login-pass").val()},
    success: function(response){
      var status = JSON.parse(response)['status']
      if (status === 'Login successful') {location.reload()}
      else {error('login-input')}}
  })
}

$(document).ready(function() {
  
  $(document).on("click", "#login-button", login)
  $(document).keypress(function(e) {if(e.which === 13) {login()}})
  
  $(document).on("click", "#signup-button", function() {
    $.post({
      type: "POST",
      url: "/signup",
      data: {"username": $("#signup-user").val(), 
             "password": $("#signup-pass").val(), 
             "email": $("#signup-mail").val()},
      success: function(response) {
        var status = JSON.parse(response)['status']
        if (status === 'Signup successful') {location.reload()}
        else {message(status, shake=true, id="signup-box")}
      }
    })
  })

  $(document).on("click", "#save", function() {
    $.post({
      type: "POST",
      url: "/settings",
      data: {"username": $("#settings-user").val(), 
             "password": $("#settings-pass").val(), 
             "email": $("#settings-mail").val()},
      success: function(response){
        message(JSON.parse(response)['status'])
      }
    })
  })

  $(document).on("click", "#devices-save", function() {
    $.post({
      type: "POST",
      url: "/devices",
      data: {"name": $("#devices-name").val(),
             "uuid": $("#devices-uuid").val(),
      success: function(response){
        message(JSON.parse(response)['status'])
      }
    })
  })


  $(document).on("click", "#pair", function() {
    $.post({
      type: "POST",
      url: "/pair",
      data: {"code": $("#devices-code").val(),
             "name": $("#devices-name").val()},
      success: function(response){
        message(JSON.parse(response)['status'])
      }
    })
  })
})