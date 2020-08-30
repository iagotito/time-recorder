gapi.load("client", init);

async function init () {
    await gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        scope: SCOPES
    });
    await gapi.client.load('sheets', 'v4');
}


async function start() {
    try {
        let apiRequest = await gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: '1MhkvVs4OfkNUK1WL2D964yeXQnIFzVgjOw0WaudhFbw',
            range: 'Data!A:B',
        });
        let res = JSON.parse(apiRequest.body);
        console.log(res);
    } catch (e) {
        console.error(e);
    }
}