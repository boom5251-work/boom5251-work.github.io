var pageData = null


$(window).on('load', function () {
  const userLanguage = navigator.language || navigator.userLanguage;
  const language = languages.find(lang => lang.code === userLanguage || lang.code4 === userLanguage)
  currentLanguage ??= language.code ?? 'en'

  fetch(`/lang/${currentLanguage}.json`)
    .then(res => res.json())
    .then((data) => {
      pageData = data
      setLocalText()
    })
})


function setLocalText () {
  setHeaderText()
  setHelloText()
  setWhyMeText()
  setEducationExperienseText()
  setToolsAndSkillsText()
  setFooterText()
}


function setHeaderText () {
  $('#header-name').text(pageData.header.name)
  $('.home-button').children('span').text(pageData.header.homeButton)
  $('.about-button').children('span').text(pageData.header.aboutMeButton)
  $('.language-select-button').children('span').text(pageData.header.languageSelectButton)
  $('.language-select-button-mobile').children('span').text(pageData.header.languageSelectButton)
}


function setHelloText () {
  $('#title-hello').text(pageData.hello.title.hello)
  $('#title-hello-name').text(pageData.hello.title.helloName)
  $('#title-occupation-prefix').text(pageData.hello.title.occupationPrefix)
  $('#title-additional').text(pageData.hello.title.additional)
  $('#title-additional-highlighted').text(pageData.hello.title.additionalHighlighted)
  $('#show-more-link').text(pageData.hello.showMoreButton)
}


function setWhyMeText () {
  $('#why-me-title').text(pageData.whyMe.title.common)
  $('#why-me-title-highlighted').text(pageData.whyMe.title.project)

  const startDate = new Date(pageData.whyMe.experience.years.startDate)
  const years = new Date().getFullYear() - startDate.getFullYear()
  const getYearsWord = new Function(pageData.whyMe.experience.years.getYearsWord.arguments, pageData.whyMe.experience.years.getYearsWord.body)
  $('#experience-item-years').text(`${years} ${getYearsWord(years)}`)
  $('#experience-item-years-highlighted').text(pageData.whyMe.experience.years.label)

  $('#experience-item-education').text(pageData.whyMe.experience.education.info)
  $('#experience-item-education-highlighted').text(pageData.whyMe.experience.education.label)
}


function setEducationExperienseText () {
  $('#education-experience-title').text(pageData.educationExperience.title)
  $('.education-title').text(pageData.educationExperience.education.title)
  $('.experience-title').text(pageData.educationExperience.experience.title)

  $('.education-list').empty()
  $('.experience-list').empty()

  pageData.educationExperience.education.items.forEach((item) => {
    const itemClass = item.isRed ? 'list-item red' : 'list-item'

    const itemBlock = `<li class="${itemClass} clickable">
        <span class="date-container">
          <span class="date highlighted">${item.date}</span>
          <span class="highlight"></span>
        </span>
        <h4 class="header">${item.header}</h4>
        <p class="additional">${item.additional}</p>
      </li>`

    $('.education-list').append(itemBlock)
  })
  
  pageData.educationExperience.experience.items.forEach((item) => {
    const itemBlock = `<li class="list-item">
        <span class="date-container">
          <span class="date highlighted">${item.date}</span>
        </span>
        <h4 class="header">${item.header}</h4>
        <p class="additional">${item.additional}</p>
      </li>`

    $('.experience-list').append(itemBlock)
  })
}


function setToolsAndSkillsText () {
  const titleData = pageData.toolsSkills.title
  $('#tools-skills-title').text(`${titleData.tools} ${titleData.and} ${titleData.skills}`)
  $('#title-skills').text(titleData.skills)
  $('#tools-subtitle').text(titleData.tools)

  const skillsSubtitle = pageData.toolsSkills.title.skills
  $('#skills-subtitle').text(skillsSubtitle.charAt(0).toUpperCase() + skillsSubtitle.slice(1))

  addTabsButtons()
}


function setFooterText () {
  $('#footer-rights').text(`© ${new Date().getFullYear()} ${pageData.footer.rights}`)
}