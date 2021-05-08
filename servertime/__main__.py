import sys
from urllib.parse import urlparse

from flask import Flask, request, jsonify

from . rest import app

url = urlparse('http://0.0.0.0:8000')
host, port = url.hostname, url.port
app.run(host=host, port=port, debug=True)
