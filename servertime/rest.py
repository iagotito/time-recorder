import os

from flask import Flask, send_from_directory, jsonify, request, make_response, abort

from . import controller

FRONTEND_DIR = os.path.realpath('frontend')
if not os.path.exists(FRONTEND_DIR):
    os.mkdir(FRONTEND_DIR)

app = Flask(__name__, static_url_path='/', static_folder=FRONTEND_DIR)


def _assert(condition, status_code, message):
    if condition: return
    res = {
        "message": message,
        "status_code": status_code
    }
    response = make_response(jsonify(res), status_code)
    abort(response)


@app.route('/status')
def status():
    status = {
        'status': 'operacional',
    }
    return jsonify(status), 200


@app.route('/')
def index_endpoint():
    return send_from_directory(app.static_folder, 'index.html')


@app.route('/<filename>')
def files(filename):
    if os.path.exists(f'{app.static_folder}/{filename}.html'):
        filename = f'{filename}.html'
    mimetype = 'text/plain'
    mimetype = 'text/html' if filename.endswith('.html') else mimetype
    mimetype = 'application/javascript' if filename.endswith('.js') else mimetype
    mimetype = 'text/css' if filename.endswith('.css') else mimetype
    return send_from_directory(app.static_folder, filename, mimetype=mimetype, cache_timeout=60)


@app.route('/activity/<id>', methods=['GET'])
def get_activity(id):
    try:
        activity = controller.get_activity(id)
    except AssertionError as e:
        _assert(False, 400, str(e))
    res = {
        'activity': activity,
        'status_code': 200
    }
    return jsonify(res), 200


@app.route('/activities', methods=['GET'])
def get_activities():
    date = request.args.get('date', None)
    activities = controller.get_activities(date)
    res = {
        'activities_count': len(activities),
        'activities': activities,
        'status_code': 200
    }
    return jsonify(res), 200


@app.route('/activities', methods=['POST'])
def post_activity():
    data = request.get_json()
    _assert('name' in data, 400, 'Activity without name filed')
    _assert('date' in data, 400, 'Activity without date filed')
    _assert('begginning' in data, 400, 'Activity without begginning field')
    name = data.get('name')
    date = data.get('date')
    begginning = data.get('begginning')
    description = data.get('description', None)
    end = data.get('end', None)
    try:
        activity = controller.add_activity(name=name, date=date, begginning=begginning, description=description, end=end)
    except AssertionError as e:
        _assert(False, 400, str(e))
    res = {
        'activity': activity.to_dict(),
        'status_code': 201
    }
    return jsonify(res), 201


@app.route('/activity/<id>', methods=['PUT'])
def update_activity(id):
    data = request.get_json()
    _assert('name' in data, 400, 'New activity data without name filed')
    _assert('date' in data, 400, 'New activity data without date filed')
    _assert('begginning' in data, 400, 'New activity data without begginning field')
    try:
        activity = controller.update_activity(id=id, data=data)
    except AssertionError as e:
        _assert(False, 400, str(e))
    res = {
        'activity': activity.to_dict(),
        'status_code': 200
    }
    return jsonify(res), 200


@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers',
                         'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    return response
