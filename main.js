let $logTxt = document.querySelector("#logTxt");
let $logBtn = document.querySelector("#logBtn");
let $testConnectionBtn = document.querySelector("#testConnectionBtn");

init();

function init () {
    $logBtn.addEventListener("click", () => {
    logTxt = $logTxt.value;
    $logTxt.value = "";

    let log_time = get_time();

    //TODO: exclude this logs and save informations in google sheets
    console.log(logTxt);
    console.log(log_time);
    });
    
    $testConnectionBtn.addEventListener("click", () => {
      start();
    });
}

function get_time () {
  let today = new Date();

  let date = today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
  let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  return date + " " + time;
}