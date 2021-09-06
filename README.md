# Time manager

This is a project to help to keep tack of how much time you spent in
one or many activities at the end of the day. It uses the Google Sheets
API to save the data of the day in a Google Spreadsheet and to retrieve
the data from it to calculate the activities realized in the day and
how much time was spent in each one of them.

## How to configure

It still don't have a friendly approach, so you have to set some
informations manually.

1. Create a new Google Spreadsheet that you will use to save the data;
2. Open the file `credentials.js` and place the spreadsheet ID in the
   const "SPREADSHEET\_ID";

See the `credentials.js` for more info

## How to use

1. Enter into the directory and run the web server. For example, using
   Python's http.sever module:
   ```bash
   python3 -m http.server 8000
   ```
   It will run the server on `localhost:8000`;
2. Login into a Google account with access to the spreadsheet defined
   in the `credentials.js`;
- There is a bug that after logging in you need to refresh the page in
  order to the app works.
3. Type something into the log field and sendo to the spreadsheet. Type
   "end" to finish an activity. If you changed something directly into
   the spreadsheet, click the button "Calculate time of activities" to
   refresh the times.

## How it works

It is local server that you can start and allows to start to log your
activities. Every day the API creates a new sheet page to that day, and
you can only log things in the current's day sheet. In the future you
will be able to choose another days.

When you type a new activity, it sets the end time of the previous
acitivity and the begin time of the new one. Type "end" to finish an
activity without start another.
