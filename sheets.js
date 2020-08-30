gapi.load("client", init);

async function init () {
    await gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        scope: SCOPES
    });
    await gapi.client.load("sheets", "v4");
    await gapi.load("auth2", async () => {
        await gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
        let isSignedIn = await gapi.auth2.getAuthInstance().isSignedIn.get()
        updateSigninStatus(isSignedIn);
    });
}

function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        authorizeButton.style.display = 'none';
        signoutButton.style.display = 'block';
    } else {
        authorizeButton.style.display = 'block';
        signoutButton.style.display = 'none';
    }
}

async function handleAuthClick(event) {
    await gapi.auth2.getAuthInstance().signIn();
}

async function handleSignoutClick(event) {
    await gapi.auth2.getAuthInstance().signOut();
}

async function start() {
    try {
        let apiRequest = await gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: "1MhkvVs4OfkNUK1WL2D964yeXQnIFzVgjOw0WaudhFbw",
            range: "Data!A:B",
        });
        let res = JSON.parse(apiRequest.body);
        console.log(res);
    } catch (e) {
        console.error(e);
    }
}