let $log_txt = document.querySelector("#log_txt");
let $log_btn = document.querySelector("#log_btn");

init();

function init () {
    $log_btn.addEventListener("click", () => {
    log_txt = $log_txt.value;
    $log_txt.value = "";

    let log_time = get_time();

    //TODO: exclude this logs and save informations in google sheets
    console.log(log_txt);
    console.log(log_time);
    });
}

function get_time () {
  let today = new Date();

  let date = today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
  let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  return date + " " + time;
}
