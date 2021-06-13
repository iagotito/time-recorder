from datetime import datetime

DATE_FORMAT = '%d:%m:%Y'
TIME_FORMAT = '%H:%M:%S'


def today():
    ''' Return current date in dd/mm/YYYY format '''
    return datetime.now().date().strftime(DATE_FORMAT)


def now():
    ''' Return current time in HH:MM:SS format '''
    return datetime.now().time().strftime(TIME_FORMAT)


def time_diff(begginning, end):
    ''' Return the time diff between two time strings in HH:MM:SS format '''
    begginning = datetime.strptime(begginning, TIME_FORMAT)
    end = datetime.strptime(end, TIME_FORMAT)
    return str(end - begginning)
