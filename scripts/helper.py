import os
import requests
import url as URL
from dotenv import load_dotenv

load_dotenv()
API_KEY = os.getenv("API_KEY", None)

def get_lat_lon(city="Pune, IN"):
    headers = {}
    payload = {}
    params = {'q': city, 'appid': API_KEY}
    response = requests.get(URL.GEOLOCATION, params=params, headers=headers, data=payload)
    
    if response.status_code == 200:
        try:
            data = response.json()
            return data[0]["lat"], data[0]["lon"]
        except (IndexError, KeyError, TypeError) as e:
            print(f"Error parsing geolocation response: {e}")
            return None, None
    else:
        print(f"Error fetching geolocation data: {response.status_code}")
        return None, None

def get_current_weather(city="Pune, IN", units="standard"):
    lat, lon = get_lat_lon(city)
    if lat is None or lon is None:
        print("Invalid geolocation data. Cannot fetch weather information.")
        return None

    headers = {}
    payload = {}
    params = {'lat': lat, 'lon': lon, 'appid': API_KEY, 'units': units}
    response = requests.get(URL.CURRENT_WEATHER, params=params, headers=headers, data=payload)
    
    if response.status_code == 200:
        try:
            data = response.json()
            return {
                'coord': data["coord"],
                'weather': data["weather"][0],
                'temperature': data["main"]["temp"],
                'feels_like': data["main"]["feels_like"],
                'humidity': data["main"]["humidity"],
                'wind_speed': data["wind"]["speed"],
                "datetime" : data["dt"]
            }
        except (KeyError, TypeError) as e:
            print(f"Error parsing weather response: {e}")
            return None
    else:
        print(f"Error fetching weather data: {response.status_code}")
        return None

def get_air_pollutant(city="Pune, IN"):
    lat, lon = get_lat_lon(city)
    if lat is None or lon is None:
        print("Invalid geolocation data. Cannot fetch weather information.")
        return None

    headers = {}
    payload = {}
    params = {'lat': lat, 'lon': lon, 'appid': API_KEY}
    response = requests.get(URL.AIR_POLLUTION, params=params, headers=headers, data=payload)
    
    if response.status_code == 200:
        try:
            data = response.json()
            return data["list"]
        except (KeyError, TypeError) as e:
            print(f"Error parsing air pollution response: {e}")
            return None
    else:
        print(f"Error fetching air pollution data: {response.status_code}")
        return None
    
def get_forecast_air_pollutant(city="Pune, IN"):
    lat, lon = get_lat_lon(city)
    if lat is None or lon is None:
        print("Invalid geolocation data. Cannot fetch weather information.")
        return None

    headers = {}
    payload = {}
    params = {'lat': lat, 'lon': lon, 'appid': API_KEY}
    response = requests.get(URL.FORECAST_AIR_POLLUTION, params=params, headers=headers, data=payload)
    
    if response.status_code == 200:
        try:
            data = response.json()
            return data["list"]
        except (KeyError, TypeError) as e:
            print(f"Error parsing air pollution response: {e}")
            return None
    else:
        print(f"Error fetching air pollution data: {response.status_code}")
        return None
