async function getData (sheetName) {
    let params = {
        spreadsheetId: SPREADSHEET_ID,
        range: sheetName + "!A:C"
    }
    try {
        let req = await gapi.client.sheets.spreadsheets.values.get(params);
        let res = JSON.parse(req.body);
        console.log("res do get data");
        console.log(res.values);
        return res.values;
    } catch (e) {
        console.error(e);
        return e;
    }
}

async function createTodaysSheet () {
    let today = getDate();
    let todayId = getDateId();
    let params = {
        spreadsheetId: SPREADSHEET_ID,
        requests: [{
            addSheet: {
                properties: {
                    "sheetId": todayId,
                    "title": today
                }
            }}
        ]
    }
    try {
        await gapi.client.sheets.spreadsheets.batchUpdate(params);
        createSheetLayout(today);
    } catch (e){}
}

async function createSheetLayout (sheetName) {
    let range = sheetName + "!A1:H1";
    let params = {
        spreadsheetId: SPREADSHEET_ID,
        range: range,
        valueInputOption: 'USER_ENTERED'
    }
    let reqBody = {
        "range": range,
        "majorDimension": "ROWS",
        "values": [
          ["ACTIVITY", "BEGINNING", "END", "", "ACTIVITY", "TIME", "TIME (HOURS)", "TIME (MINUTES)"]
        ]
    }
    try {
        let req = await gapi.client.sheets.spreadsheets.values.update(params, reqBody);
        console.log(req.result);
    } catch (e) {
        console.log(e);
    }
}

async function logActivity (log, time, sheetName) {
    await logEnd(time, sheetName);
    if (log === "end") return;
    let range = sheetName + "!A:B";
    let params = {
        spreadsheetId: SPREADSHEET_ID,
        range: range,
        valueInputOption: "USER_ENTERED",
        insertDataOption: "INSERT_ROWS"
    }
    let reqBody = {
        "range": range,
        "majorDimension": "ROWS",
        "values": [
          [log, time]
        ]
    }
    try {
        let req = await gapi.client.sheets.spreadsheets.values.append(params, reqBody);
    } catch (e) {}
}

async function logEnd (endTime, sheetName) {
    let params = {
        spreadsheetId: SPREADSHEET_ID,
        range: sheetName + "!A2:C"
    }
    try {
        let req = await gapi.client.sheets.spreadsheets.values.get(params);
        let res = JSON.parse(req.body);

        let logsMatrix = res.values;
        
        // if there is no log rows yet, do not set any end time
        if (typeof logsMatrix === "undefined") return;
        // if the last activity already have the end time setted, do not set ir again
        if (logsMatrix.slice(-1)[0].length === 3) return;

        let sheetPosition = logsMatrix.length + 1;
        logEndTime(endTime, sheetName, sheetPosition);
    } catch (e) {
        console.error(e);
        return e;
    }
}

async function logEndTime (endTime, sheetName, sheetPosition) {
    let range = sheetName + "!C" + sheetPosition;
    let params = {
        spreadsheetId: SPREADSHEET_ID,
        range: range,
        valueInputOption: "USER_ENTERED"
    };
    let reqBody = {
        "range": range,
        "majorDimension": "ROWS",
        "values": [
          [endTime]
        ]
    };
    console.log("response do update");
    try {
        let req = await gapi.client.sheets.spreadsheets.values.update(params, reqBody);
        console.log(req.result);
        getTimes(sheetName);
    } catch (e) {
        console.log(e);
    }
}

async function getTimes (sheetName) {
    let times = await calculateTimes(sheetName);

    let timesTable = []

    for (let key in times) {
        let name = key;
        let time = Math.floor(times[key]) + " hours and " + Math.floor(((times[key] % 1) * 60)) + " minutes";
        let hours = times[key] + " hours";
        let minutes = (times[key] * 60) + " minutes";

        timesTable.push([name, time, hours, minutes]);
    }

    let range = sheetName + "!E2:H";
    let params = {
        spreadsheetId: SPREADSHEET_ID,
        range: range,
        valueInputOption: "USER_ENTERED"
    };
    let reqBody = {
        "range": range,
        "majorDimension": "ROWS",
        "values": timesTable
    };
    console.log("response do update");
    try {
        let req = await gapi.client.sheets.spreadsheets.values.update(params, reqBody);
        console.log(req.result);  
    } catch (e) {}

    return timesTable;
}

async function calculateTimes (sheetName) {
    let data = await getData(sheetName);
    if (data.length === 1) return;
    let logs = data.slice(1);

    let times = {};
    let total = 0;
    for (i = 0; i < logs.length; i++) {
        if (logs[i].length === 2) break;
        let timeDiff = calculateTimeDiff(logs[i][1],logs[i][2]);

        if (!(logs[i][0] in times)) {
            times[logs[i][0]] = timeDiff;
        } else {
            times[logs[i][0]] += timeDiff;
        }

        total += timeDiff;
    }

    times["TOTAL"] = total;

    return times;
}