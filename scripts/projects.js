function showProjectDescription (projectId) {
  const project = pageData.portfolio.projects.find(project => project.id === projectId)

  const popupData = `<button class="popup-close-button" onclick="onCloseProjectButtonClicked()">
    <i class="bxr bx-x"></i>
  </button>
  <img src="/images/projects/${project.thumbnailFileName}" alt="${project.title}" class="preview-image">
  <div class="popup-title-container">
    <h3 class="title highlighted">${project.title}</h3>
  </div>
  <p class="description">${project.description}</p>
  ${getUsedSkillsHtml(project)}
  ${getPopupButtonsHtml(project)}`

  $('.popup').empty()
  $('.popup').append(`<div class="popup-content">${popupData}</div>`)

  $('.popup-background').show()
  $('.popup-background').css('display', 'flex')
}


function hideProjectDescription (e) {
  if ($(e.target).hasClass('popup-background')) {
    $('.popup-background').hide()
  }
}


function onCloseProjectButtonClicked () {
  $('.popup-background').hide()
}


function getUsedSkillsHtml (project) {
  if (project.usedSkills.length > 0) {
    return `<div class="used-skill-container">
      ${project.usedSkills.map(skill => `<span class="used-skill">${skill}</span>`).join('\n')}
    </div>`
  } else {
    return ''
  }
}


function getPopupButtonsHtml (project) {
  if (project.buttons.length > 0) {
    let buttonsHtml = ''

    project.buttons.forEach((button) => {
      buttonsHtml += `<a class="link-button ${button.type}" href="${button.url}" target="_blank">
          <i class='bxr ${button.icon}'></i>
          ${button.text}
        </a>`
    });

    return `<div class="buttons-container">${buttonsHtml}</div>`
  } else {
    return ''
  }
}