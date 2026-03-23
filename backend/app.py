from flask import Flask, request, jsonify
from scraper.scraper import scrape_website

app = Flask(__name__)

@app.route("/")
def home():
    return {"status": "Prospector API running"}

@app.route("/scrape", methods=["POST"])
def scrape():
    data = request.json
    url = data.get("url")
    result = scrape_website(url)
    return jsonify(result)
