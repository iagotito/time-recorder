let API_URL = "http://localhost:8000";
let activities;
let $logTxt = document.querySelector("#log-txt");
let $activities = document.getElementById("data-div");

$logTxt.addEventListener("keypress", (event) => {
    if (event.keyCode == 13) logActivity();
});

(function init() {
    loadStoredActivities();
})();

function loadStoredActivities() {
    fetch(API_URL + "/activities" + `?date=${getDate()}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    })
    .then(res => { return res.json(); })
    .then(data => {
        activities = data.activities;
        displayActivities();
    })
    .catch(err => { console.log(err); })
}

function logActivity() {
    logTxt = $logTxt.value;
    if (logTxt === "") return;
    $logTxt.value = ""

    activity = {
        "name": logTxt,
        "date": getDate(),
        "begginning": getHours()
    }

    fetch(API_URL + "/activities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(activity)
    })
    .then(res => { return res.json(); })
    .then(data => {
        let activity = data.activity;
        activities.push(activity);
        appendActivity(activity);
    })
    .catch(err => { console.log(err); })
}

function displayActivities() {
    $activities.innerHTML = `
        <p>ID Name Description Begginning End Date</p>
    `;
    activities.forEach((activity) => { appendActivity(activity); });
}

function appendActivity(activity) {
    let activityArticle = makeActivityArticle(activity);
    $activities.appendChild(activityArticle);
}

function makeActivityArticle(activity) {
    let article = document.createElement("article");
    article.id = `activity${activity.id}`;
    /*
    article.innerHTML = `
        <input id="id${activity.id}" type="text" value="${activity.id}">
        <input id="name${activity.id}" type="text" value="${activity.name}">
        <input id="description${activity.id}" type="text" value="${activity.description ? activity.description : ""}">
        <input id="begginning${activity.id}" type="text" value="${activity.begginning}">
        <input id="end${activity.id}" type="text" value="${activity.end ? activity.end : ""}">
        <input id="date${activity.id}" type="text" value="${activity.date}">
    `;
    */
    article.innerHTML = `
        ${activity.id} |
        ${activity.name} |
        ${activity.description ? activity.description : "no description"} |
        ${activity.begginning} |
        ${activity.end ? activity.end : "in progress"} |
        ${activity.date}
    `;
    return article;
}
