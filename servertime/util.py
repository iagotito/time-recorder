from datetime import datetime


def today():
    ''' Return current date in dd/mm/YYYY format '''
    return datetime.now().date().strftime('%d/%m/%Y')


def now():
    ''' Return current time in HH:MM:SS format '''
    return datetime.now().time().strftime('%H:%M:%S')
