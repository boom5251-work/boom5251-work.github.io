const languages = [
  { code: 'ru', code4: 'ru-RU', name: 'Русский' },
  { code: 'en', code4: null, name: 'English' },
  { code: 'sr', code4: 'sr-SR', name: 'Srbski' }
]

const languageFromQuery = new URLSearchParams(location.search).get('lang')

var currentLanguage = languages.map(({ code }) => code).includes(languageFromQuery) 
  ? languageFromQuery
  : cookie.get('currentLanguage') ?? null


$(window).on('load', function () {
  $('.language-select-button').on('click', function () {
    if ($('.language-select-items').length === 0) {
      openLanguageSelect()
    } else {
      closeLanguageSelect()
    }
  })


  $(document).on('click', '.language-select-item', function (e) {
    const selectedLanguage = $(e.target).attr('lang')

    if (selectedLanguage !== currentLanguage && languages.map(({ code }) => code).includes(selectedLanguage)) {
      loadLanguageData(selectedLanguage)
    }
  })


  $('.language-select-button-mobile').on('click', switchLanguage)
})


function openLanguageSelect () {
  $('.language-select').append('<div class="language-select-items"></div>')
  const $itemsContainer = $('.language-select').find('.language-select-items')
  languages.forEach(language => $itemsContainer.append(`<a class="language-select-item" lang="${language.code}">${language.name}</a>`))
}


function closeLanguageSelect () {
  $('.language-select').find('.language-select-items').remove()
}


function loadLanguageData (selectedLanguage) {
  fetch(`/lang/${selectedLanguage}.json`)
    .then(res => res.json())
    .then((data) => {
      cookie.set('currentLanguage', selectedLanguage);
      currentLanguage = selectedLanguage
      pageData = data

      $('#title-occupation').text('')
      letterCounter = 0
      occupationCounter = 0

      closeLanguageSelect()
      changeMetadata()
      setLocalText()
    })
}


function switchLanguage () {
  const languageCodes = languages.map(({ code }) => code)

  let currentLanguageIndex = languageCodes.indexOf(currentLanguage)
  currentLanguageIndex++

  const nextLanguageIndex = currentLanguageIndex < languages.length ? currentLanguageIndex : 0
  const selectedLanguage = languageCodes[nextLanguageIndex]
  loadLanguageData(selectedLanguage)
}