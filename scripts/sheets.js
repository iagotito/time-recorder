async function getData () {
    try {
        let params = {
            spreadsheetId: SPREADSHEET_ID,
            range: "Data!A:C"
        }
        let req = await gapi.client.sheets.spreadsheets.values.get(params);
        let res = JSON.parse(req.body);
        return res.values;
    } catch (e) {
        console.error(e);
        return e;
    }
}

async function createSheetForToday () {
    try {
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
        await gapi.client.sheets.spreadsheets.batchUpdate(params);
    } catch (e){
        
    }
}