$(window).on('load', function () {
  var scrollPosition = 0
  const scrollDistance = 200
  
  $(document).scroll(function () {
    scrollPosition = $(this).scrollTop()
    $(".header-section").css({ "background-color": `rgba(255, 255, 255, ${ Math.min(scrollPosition, scrollDistance) / scrollDistance * .1 })` })
  })
})