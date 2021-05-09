from . models import Activity


def get_activities(date):
    if not date: return []
    activities = Activity.find_by_date(date)
    activities = [a.to_dict() for a in activities]
    return activities


def add_activity(name, description=''):
    assert name, 'Invalid name: name cant be empty'
    activity = Activity(name, description)
    activity.begin()
    activity.save()
    return activity
