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
    let params = {
        spreadsheetId: SPREADSHEET_ID,
        requests: [{
            addSheet: {
                properties: {
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
/*
async function logActivity (log, time) {
    try {
        let params = {

        }
    } catch (e) {}
}
*/