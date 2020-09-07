
# Time manager

This is a project to help to keep tack of how much time you spent in one or many activities at the end of the day.  
It uses the Google Sheets API to save da data of the day in a Google Spreadsheet and to retrieve the data from it to calculate the activities realized in the day and how much time was spent in each one of them.

## How it works

It still don't have a friendly approach, so you have to set some informations manually. See the `credentials.json` for more info. It is local server that you can start and allows to start to log your activities.  
Every day the API creates a new sheet page to that day, and you can only log things in the current's day sheet. In the future you will be able to choose another days.

## How to use

- To log some activity in your spreadsheet just type the activity name in the text area and click the button or press enter and this will log the start time of this activity.
- If you log another activity, the previous activity will have it's end time setted to the same as the beggiging of the new one.
- To end the activity without start a new one just type "end".


## How it should look at the end

Some of my ideas of how it should work are based on [this repository](https://github.com/anvaka/time), but I want to make it myself to learn how to do it and because this project don't have somethings that I want.

It shall have extra camps in the main page such as a date selector to which day do you want to retrieve data or even add info.  
Functions to help the type os activities like as you type the activity name it will show a list of the open tasks to make it easy re-log an repeated activity.
