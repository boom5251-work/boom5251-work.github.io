$(window).on('load', function () {
  $('.title-cursor').text('|')
  $('#title-occupation').text('')
  $('#title-occupation').show()
  startWriting()
})


var occupationCounter = 0
var letterCounter = 0
var blinkCounter = 0

const speed = 80
const clearSpeed = 35
const blinkSpeed = 800


function startWriting () {
  if (pageData) {
    const stringLength = pageData.hello.title.occupations[occupationCounter].length

    if (letterCounter < stringLength) {
      let currentText = $('#title-occupation').text()
      currentText += pageData.hello.title.occupations[occupationCounter].charAt(letterCounter)
      $('#title-occupation').text(currentText)

      letterCounter++

      if (letterCounter === stringLength) {
        setTimeout(startWriting, blinkSpeed * 2)
        blinkCursor()
      } else {
        let additionalTime = Math.round(Math.random() * 30)
        additionalTime = Math.random() > .5 ? -additionalTime : additionalTime
        setTimeout(startWriting, speed + additionalTime)
      }
    } else {
      const currentText = $('#title-occupation').text()
      $('#title-occupation').text(currentText.slice(0, -1))

      if (currentText.length === 0) {
        occupationCounter += 1
        occupationCounter = occupationCounter % pageData.hello.title.occupations.length
        letterCounter = 0
      }
      
      setTimeout(startWriting, clearSpeed)
    }
  } else {
    setTimeout(startWriting, 100)
  }
}


function blinkCursor () {
  $('.title-cursor').fadeOut(blinkSpeed / 2, function () {
    $('.title-cursor').fadeIn(blinkSpeed / 2, function () {
      if (blinkCounter === 0) {
        blinkCursor()
      }

      blinkCounter++
      blinkCounter %= 2
    })
  })
}