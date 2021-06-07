let API_URL = "http://localhost:8000";
let activities;
let $logTxt = document.querySelector("#log-txt");

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
        activities.push(data.activity);
    })
    .catch(err => { console.log(err); })
}
