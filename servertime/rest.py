import os

from flask import Flask, send_from_directory, jsonify, request

FRONTEND_DIR = os.path.realpath('frontend')
if not os.path.exists(FRONTEND_DIR):
    os.mkdir(FRONTEND_DIR)

app = Flask(__name__, static_url_path='/', static_folder=FRONTEND_DIR)


@app.route('/status_all')
def status_endpoint():
    return send_from_directory(f'{app.static_folder}/status', 'index.html')


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


@app.route('/


@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers',
                         'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    return response
