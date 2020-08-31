function formatData (dataMatrix) {
    let dataStr = "";
    for (i = 0; i < dataMatrix.length; i++) {
        for (j = 0; j < dataMatrix[i].length; j++) {
            dataStr += dataMatrix[i][j];
            dataStr += (i < 1 ? " " : "       ")
        }
        dataStr += "<br>";
    }
    return dataStr;
}

function getTime () {
    let today = new Date();
    let date = getDate(today);
    let hours = getHours(today);

    return date + " " + hours;
}

function getHours () {
    let today = new Date();
    return pad(today.getHours()) + ":" +
        pad(today.getMinutes()) + ":" +
        pad(today.getSeconds());
}

function getDate () {
    let today = new Date();
    return today.getFullYear() + "-" + 
        pad((today.getMonth() + 1)) + "-" +
        pad(today.getDate());
}

function pad (num) {
    return (num < 10 ? "0" : "") + num;
}