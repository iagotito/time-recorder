from servertime.models import Activity
from servertime.util import today, now, time_diff


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


def add_activity(name, date=None, begginning=None, description=None, end=None):
    assert name, 'Invalid name: name cant be empty'
    if begginning is None: begginning = now()
    if date is None: date = today()
    activity = Activity(name=name, description=description, date=date, begginning=begginning, end=end)
    activity.save()

    previous = Activity.find_previous_activity(activity.begginning)
    if previous and not previous.end:
        previous.end = activity.begginning
        previous.total = time_diff(previous.begginning, previous.end)
        previous.save()

    return activity.to_dict(), previous.to_dict() if previous else None


def update_activity(id, data):
    activity = Activity.find_by_id(id)
    assert activity, f'Activity {id} does not exists'
    if 'name' in data.keys():
        assert data.get('name'), 'Invalid name: name cant be empty'
    if 'begginning' in data.keys():
        assert data.get('begginning'), 'Invalid begginning: begginning cant be empty'
    if 'date' in data.keys():
        assert data.get('date'), 'Invalid date: date cant be empty'
    activity.update(data)

    if 'begginning' in data.keys() or 'end' in data.keys():
        activity.total = time_diff(activity.begginning, activity.end)

    activity.save()
    return activity.to_dict()


def mark_as_ended(id):
    activity = Activity.find_by_id(id)
    assert activity, f'Activity {id} does not exists'
    activity.end = now()
    activity.total = time_diff(activity.begginning, activity.end)
    activity.save()
    return activity.to_dict()
