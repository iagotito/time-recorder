let $authorizeButton = document.querySelector('#authorize_button');
let $signoutButton = document.querySelector('#signout_button');

let $logTxt = document.querySelector("#log_txt");
let $logBtn = document.querySelector("#log_btn");
let $getDataBtn = document.querySelector("#get_data_btn");

let $getTimesBtn = document.querySelector("#get_times_btn");

let $dataPre = document.querySelector("#data_pre");

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