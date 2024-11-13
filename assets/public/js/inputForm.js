$(function() {
  function pswd_toggle($btn) {
    let shown = $btn.hasClass("password-show");
    let $inputBtn = $btn.parent().find(`input[type='${shown ? 'text' : 'password'}']`);
    $btn.find('i').toggleClass("bi-eye-fill");
    $btn.find('i').toggleClass("bi-eye-slash-fill");
    $btn.toggleClass("password-show");
    $inputBtn.attr('type', shown ? 'password' : 'text');
  }
  $(".password-toggle").each(function() {
    const button = $(this).find(".password-toggle-btn");
    button.each(function() {
      $(this).on('click', function() {
        pswd_toggle($(this));
      });
    });
  });
})