from . models import Activity


def get_activity(id):
    if not id: return None
    activity = Activity.find_by_id(id)
    assert activity is not None, f'Activity {id} does not exists'
    activity = activity.to_dict()
    return activity


def get_activities(date):
    if not date: return []
    activities = Activity.find_by_date(date)
    activities = [a.to_dict() for a in activities]
    return activities


def add_activity(name, date, begginning, description=None, end=None):
    assert name, 'Invalid name: name cant be empty'
    assert date, 'Invalid date: date cant be empty'
    assert begginning, 'Invalid begginning: begginning cant be empty'
    activity = Activity(name=name, description=description, date=date, begginning=begginning, end=end)
    activity.save()
    return activity

def update_activity(id, data):
    activity = Activity.find_by_id(id)
    assert activity, f'Activity {id} does not exists'
    assert data.get('name'), 'Invalid name: name cant be empty'
    assert data.get('date'), 'Invalid date: date cant be empty'
    assert data.get('begginning'), 'Invalid begginning: begginning cant be empty'
    activity.update(data)
    activity.save()
    return activity
