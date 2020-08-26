
# Time manager

This is a project to help to keep tack of how much time you spent in one or many activities at the end of the day.  
It uses the Google Sheets API to save da data of the day in a Google Sheets sheets and to retrieve the data from it to calculate the activities realized in the day and how much time was spent in each one of them.

## How it should work

In the beggining I don't intent to share this to everybody so I don't have to worry about to make it friendly. It can be a local server that I start and allows me to open my localhost and start to log my times.  
The site will have an text area, where I will type my command, and a button to log this commando. for example:
- start studying for math  
> This will log the start time of this activity.
-  start studying for english
> This will log the end time of the previous activity and the beggining time of this activity.
- end studying for english 
- end
> This will just log the end time of the last open activity.

As you type the activity name it will show a list of the open tasks to make it easy.

It will also have an area that shows an table or something like that with all the daily logs information.

## How it should look at the end

Some of my ideas of how it should work are based on [this repository](https://github.com/anvaka/time), but I want to make it myself to learn how to do it and because this project don't have somethings that I want.

This is a picture of how I imagine that the API will save the sheets:  
![Template](https://imgur.com/a/bIYsCVy)

