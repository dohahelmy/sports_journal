$(function () {
  $("#modal-btn, .modal-close").click(function () {
    $("body, .modal-dialog, .modal").toggleClass("active");
  });
});

$('.main-slider').owlCarousel({
  loop: true,
  rtl: true,
  dots: true,
  items: 1,
})


for (let i = 0; i < $(".collapsible").length; i++) {
  $(".collapsible")[i].addEventListener("click", function () {
    $(this).toggleClass("active");
    let content = $(this).next();
    if (content.height()) {
      content.css('max-height', '0')
      content.css('padding', '0')
    } else {
      content.css('max-height', '100%')
      content.css('padding', '3rem')
    }
  });
}