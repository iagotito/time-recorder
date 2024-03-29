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

function getDateId () {
    let today = getDate();
    let todayId = today.slice(0, 4) + today.slice(5, 7) + today.slice(8, 10);
    return parseInt(todayId);
}

function pad (num) {
    return (num < 10 ? "0" : "") + num;
}

function calculateTimeDiff (beginnig, end) {
    beginnig = new Date(beginnig);
    end = new Date(end);
    
    let diff = end.getTime() - beginnig.getTime();
    let hoursDiff = diff / (1000 * 60 * 60);

    return +(hoursDiff.toFixed(2));
}