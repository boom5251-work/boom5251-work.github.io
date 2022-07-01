$(function () {
    $(document).on('scroll', function () {
        let scrolled = $(window).scrollTop();
        let top = 0 - (scrolled * .25);

        $('.main-image').css('top', `${top}px`);
    });
})