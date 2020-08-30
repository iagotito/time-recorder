let $logTxt = document.querySelector("#log_txt");
let $logBtn = document.querySelector("#log_btn");
let $testConnectionBtn = document.querySelector("#test_connection_btn");
let authorizeButton = document.querySelector('#authorize_button');
let signoutButton = document.querySelector('#signout_button');

authorizeButton.addEventListener("click", () => {
  handleAuthClick();
});

signoutButton.addEventListener("click", () => {
  handleSignoutClick();
});

$logBtn.addEventListener("click", () => {
  let logTxt = $logTxt.value;
  $logTxt.value = "";

  let log_time = get_time();

  //TODO: exclude this logs and save informations in google sheets
  console.log(logTxt);
  console.log(log_time);
});

$testConnectionBtn.addEventListener("click", () => {
  start();
});

init();

function init () {
  console.log("init main");
}

function get_time () {
  let today = new Date();

  let date = today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
  let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  return date + " " + time;
}