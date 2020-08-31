async function getData () {
    let params = {
        spreadsheetId: SPREADSHEET_ID,
        range: "Data!A:C"
    }
    try {
        let req = await gapi.client.sheets.spreadsheets.values.get(params);
        let res = JSON.parse(req.body);
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
    let range = sheetName + "!A1:C1";
    let params = {
        spreadsheetId: SPREADSHEET_ID,
        range: range,
        valueInputOption: 'USER_ENTERED'
    }
    let reqBody = {
        "range": range,
        "majorDimension": "ROWS",
        "values": [
          ["ACTIVITY", "BEGINNING", "END"]
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
        console.log(req.result);   
    } catch (e) {}
}

async function logEnd (endTime, sheetName) {
    console.log("Seet name em logEnd");
    console.log(sheetName);
    let params = {
        spreadsheetId: SPREADSHEET_ID,
        range: sheetName + "!A2:C"
    }
    try {
        let req = await gapi.client.sheets.spreadsheets.values.get(params);
        let res = JSON.parse(req.body);

        let logsMatrix = res.values;
        console.log("matrix:");
        console.log(logsMatrix);
        
        // if there is no log rows yet, do not set any end time
        if (typeof logsMatrix === "undefined") return;
        // if the last activity already have the end time setted, do not set ir again
        if (logsMatrix.slice(-1).length == 3) return;

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
    } catch (e) {
        console.log(e);

    }

}