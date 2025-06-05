var skillsTabsData = null


$(window).on('load', function () {
  fetch('/data/skillsTabs.json')
    .then(res => res.json())
    .then((data) => {
      skillsTabsData = data
      createSkillsTabs()
  })
})


$(document).on('click', '.skills-tabs-button', function (e) {
  const $currentTarget = $(e.currentTarget)

  if (!$currentTarget.hasClass('active')) {
    $('.skills-tabs-button.active').removeClass('active')
    $currentTarget.addClass('active')
    changeSkillsTab($currentTarget.index())
  }
})


function createSkillsTabs () {
  if (pageData) {
    addTabsButtons()
    changeSkillsTab(0)
  } else {
    setTimeout(createSkillsTabs, 100)
  }
}


function addTabsButtons () {
  $('.skills-tabs-buttons').empty()

  const skillTabsButtons = pageData.toolsSkills.skills.tabButtons

  for (index in skillTabsButtons) {
    const buttonClass = parseInt(index) === 0 ? 'skills-tabs-button active' : 'skills-tabs-button'
    $('.skills-tabs-buttons').append(`<button class="${buttonClass}"><h3 class="highlighted">${skillTabsButtons[index].name}</h3></button>`)
  }
}


function changeSkillsTab (index) {
  if (index < skillsTabsData.length) {
    const tabData = skillsTabsData[index]
    let existingItemsCount = $('.skills-tabs-items').children().length

    while (tabData.items.length < existingItemsCount) {
      $('.skills-tabs-items').find("div:last").remove()
      existingItemsCount = $('.skills-tabs-items').children().length
    }

    while (tabData.items.length > existingItemsCount) {
      const tabItemHtml = `<div class="skills-tabs-item">
          <div class="label-container"><div class="icon"></div><span class="label"></span></div>
          <div class="progress-bar-outer"><div class="progress-bar-inner"></div></div>
          <div class="progress-text-container"><span class="progress-text highlighted"></span></div>
        </div>`

      $('.skills-tabs-items').append(tabItemHtml)
      existingItemsCount = $('.skills-tabs-items').children().length
    }

    for (const itemIndex in tabData.items) {
      const tabItemData = tabData.items[itemIndex]
      const $tabItem = $('.skills-tabs-item').eq(itemIndex)
      
      $tabItem.find('.icon').css({ 'background-image': `url(/icons/${tabItemData.icon})` })
      $tabItem.find('.label').text(tabItemData.name)
      $tabItem.find('.progress-bar-inner').css({ "width": tabItemData.level + "%" })
      $tabItem.find('.progress-text').text(tabItemData.level + "%")
    }
  }
}