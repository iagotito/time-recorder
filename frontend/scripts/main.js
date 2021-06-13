let API_URL = "http://localhost:8000";
let activities;
let $logTxt = document.querySelector("#log-txt");
let $activities = document.getElementById("activities-div");

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
        updateActivity(data.previous);
    })
    .catch(err => { console.log(err); })
}

function displayActivities() {
    $activities.innerHTML = `
        <div class="activity-div">
        <div class="name-span name-div">Name</div>
        <div class="desc-span desc-div">Description</div>
        <div class="date-span date-div">Date</div>
        <div class="beg-span beg-div">Begin</div>
        <div class="end-span end-div">End</div>
        <div class="total-span total-div">Total</div>
        </div>
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
    article.innerHTML = `
        <div id="activity-${activity.id}" class="activity-div" >
          <div id="name-${activity.id}" class="name-div">
            <span id="text-${activity.id}" class="textarea name-span" role="textbox" contenteditable
            onmouseover="showFullText('name', '${activity.id}')"
            onmouseout="hideText('name', '${activity.id}')"
            >
                ${activity.name}
            </span>
          </div>
          <div id="desc-${activity.id}-div" class="desc-div">
            <span id="desc-${activity.id}" class="textarea desc-span" role="textbox" contenteditable>
                ${activity.description !== null ? activity.description : ""}
            </span>
          </div>
          <div id="date-${activity.id}-div" class="date-div">
            <span id="date-${activity.id}" class="textarea date-span" role="textbox" contenteditable>
                ${activity.date}
            </span>
          </div>
          <div id="begginning-${activity.id}-div" class="beg-div">
            <span id="begginning-${activity.id}" class="textarea beg-span" role="textbox" contenteditable>
                ${activity.begginning}
            </span>
          </div>
          <div id="end-${activity.id}-div" class="end-div">
            <span id="end-${activity.id}" class="textarea end-span" role="textbox" contenteditable>
                ${activity.end !== null ? activity.end : ""}
            </span>
          </div>
          <div id="total-${activity.id}-div" class="total-div">
            <span id="total-${activity.id}" class="textarea total-span" role="textbox" contenteditable>
                ${activity.total !== null ? activity.total : ""}
            </span>
          </div>
        </div>
    `;
    return article;
}

function updateActivity(activity) {
    let $end = document.getElementById(`end-${activity.id}`);
    let $total = document.getElementById(`total-${activity.id}`);
    $end.innerHTML = activity.end;
    $total.innerHTML = activity.total;
}

function showFullText(field, id) {
    let $field = document.getElementById(`${field}-${id}`);
    let $div = document.getElementById(`activity-${id}`);
    $field.style.overflowY = "visible";
    $div.style.zIndex = 1;
}

function hideText(field, id) {
    let $field = document.getElementById(`${field}-${id}`);
    let $div = document.getElementById(`activity-${id}`);
    $field.style.overflowY = "hidden";
    $div.style.zIndex = 0;
}
