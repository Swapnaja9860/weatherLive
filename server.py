import os
from dotenv import load_dotenv
from flask import Flask, jsonify, request, render_template
from scripts.helper import get_current_weather, get_air_pollutant, get_forecast_air_pollutant
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)

load_dotenv()
app = Flask(
    __name__,
    static_url_path="",
    static_folder="client/build/",
    template_folder="client/build/",
)

CORS(app)

api_key = os.getenv("API_KEY", None)

@app.route("/", methods=["GET"])
def index():
    return render_template("index.html", startPage=True)

@app.route("/weather", methods=["GET"])
def get_current_weather_data():
 
    city = request.args.get("city")
    units = request.args.get("units")

    if not city:
        return jsonify({"error": "Missing required parameter: city"}), 400
    if not units:
        return jsonify({"error": "Missing required parameter: units"}), 400

    response = get_current_weather(city, units)
    
    if response:
        return jsonify(response), 200
    else:
        return jsonify({"error": "Failed to fetch weather data"}), 500

@app.route("/pollutant", methods=["GET"])
def get_air_pollutant_data():
    city = request.args.get("city")
    if not city:
        return jsonify({"error": "Missing required parameter: city"}), 400
    
    response = get_air_pollutant(city)
    if response:
        return jsonify(response), 200
    else:
        return jsonify({"error": "Failed to fetch air pollutant data"}), 500
    
@app.route("/forecast_pollutant", methods=["GET"])
def get_air_pollutant_forecast_data():
    city = request.args.get("city")

    if not city:
        return jsonify({"error": "Missing required parameter: city"}), 400
    
    response = get_forecast_air_pollutant(city)
    
    if response:
        return jsonify(response), 200
    else:
        return jsonify({"error": "Failed to fetch air pollutant data"}), 500

port = os.getenv("PORT", "443")
if __name__ == '__main__':
    app.run(
        host="0.0.0.0",
        port=int(port),
        debug=True,
        threaded=True,
        processes=1,
    )
