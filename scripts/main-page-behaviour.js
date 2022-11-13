document.addEventListener("DOMContentLoaded", ready);


function ready() {
    countAge();
    countStudyYears();
}


function countAge() {
    let ageSpan = document.getElementById("age-span");

    let now = new Date();
    let dateOfBirth = new Date(2001, 11-1, 3);
    let dateOfBirthThisYear = new Date(now.getFullYear(), dateOfBirth.getMonth(), dateOfBirth.getDate());

    let age = now.getFullYear() - dateOfBirth.getFullYear();

    if (now < dateOfBirthThisYear) {
        age--;
    }

    let ageStr = age.toString()

    switch (ageStr[ageStr.length - 1]) {
        case '1':
            ageStr += " год";
            break;
        case '2' | '3' | '4':
            ageStr += " года"
            break;
        default:
            ageStr += " лет"
    }

    ageSpan.innerText = ageStr;
}


function countStudyYears() {
    let studyYearsSpan = document.getElementById("study-years-span");

    let now = new Date();
    let startedAt = new Date(2017, 1, 1);

    studyYearsSpan.innerText = (now.getFullYear() - startedAt.getFullYear()).toString();
}


function goToPage(page) {
    document.location.href = page;
}