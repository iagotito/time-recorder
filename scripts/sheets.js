async function getData() {
    try {
        let apiRequest = await gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: "1MhkvVs4OfkNUK1WL2D964yeXQnIFzVgjOw0WaudhFbw",
            range: "Data!A:C",
        });
        let res = JSON.parse(apiRequest.body);
        return res.values;
    } catch (e) {
        console.error(e);
        return e;
    }
}