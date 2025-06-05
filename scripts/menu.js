$(window).on('load', function () {
  $('.menu-button').on('click', function (e) {
    if ($(e.currentTarget).hasClass('menu-open-button'))
      openMobileMenu()
    else if ($(e.currentTarget).hasClass('menu-close-button'))
      closeMobileMenu()
  })
})


function openMobileMenu () {
  $('.mobile-menu-container').toggleClass('active')
  toggleMobileMenuButton()
}


function closeMobileMenu () {
  $('.mobile-menu-container').toggleClass('active')
  toggleMobileMenuButton()
}


function toggleMobileMenuButton () {
  $('.menu-open-button').toggleClass('active')
  $('.menu-close-button').toggleClass('active')
}