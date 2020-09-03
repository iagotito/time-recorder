let $authorizeButton = document.querySelector('#authorize-button');
let $signoutButton = document.querySelector('#signout-button');
let $loadingDiv = document.querySelector("#loading-div");

let $logTxt = document.querySelector("#log-txt");
let $logBtn = document.querySelector("#log-btn");
let $getDataBtn = document.querySelector("#get-data-btn");

let $getTimesBtn = document.querySelector("#get-times-btn");

let $dataPre = document.querySelector("#data-pre");

function init () {
  createTodaysSheet();
}

$authorizeButton.addEventListener("click", () => {
  handleAuthClick();
});

$signoutButton.addEventListener("click", () => {
  handleSignoutClick();
});

$logBtn.addEventListener("click", () => {
  let logTxt = $logTxt.value;
  $logTxt.value = "";

  let logTime = getTime();
  let today = getDate();
  let todayId = getDateId();

  logActivity(logTxt, logTime, today, todayId);
  console.log(logTxt);
  console.log(logTime);
});

$logTxt.addEventListener("keypress", (event) => {
  if (event.keyCode == 13) $logBtn.click();
});

$getDataBtn.addEventListener("click", async () => {
  console.log("retrieving data");
  let data = await getData(getDate());
  console.log(formatData(data));
  $dataPre.innerHTML = formatData(data);
});

$getTimesBtn.addEventListener("click", async () => {
  let data = await getTimes(getDate());
  console.log(data);
  $dataPre.innerHTML = data;
})