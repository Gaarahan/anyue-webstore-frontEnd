$(function () {
  let liEle = $("#contentList li");
  $("#all").on('click',function () {
    liEle.slideDown(1000);

  });
  $("#good").on('click',function () {
    liEle.slideUp(500);
    $(".good").slideDown(1000);
  });
  $("#mid").on('click',function () {
    liEle.slideUp(500);
    $(".mid").slideDown(1000);
  });
  $("#low").on('click',function () {
    liEle.slideUp(500);
    $(".low").slideDown(1000);
  });
  $("#add").on('click',function () {
    liEle.slideUp(500);
    $(".add").slideDown(1000);
  })
});
