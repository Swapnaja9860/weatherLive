# weatherLive

weatherLive is a web application designed to provide live weather and air pollutant data for selected cities. It allows users to fetch current weather conditions, air pollutant concentrations, and forecasted air pollutant data.

## Features
Current Weather:
Retrieve real-time weather data including temperature, humidity, and wind speed based on selected city and temperature unit.

Air Pollutant Data:
Fetch air pollutant concentrations and their corresponding indices with different ranges for the selected city.

Forecasted Air Pollutant Data:
Get predictions for air pollutant concentrations over a specified period for the chosen city.

## Build the frontend

From the root directory :

```bash
cd client
npm install
npm run build
```

## To start the server

_If it's your first time running the server, create a virtual environment and install the required libs._

```bash
# create your virualenv
conda create --name weather_live python=3.10
conda activate weather_live
```

create .env file at the same level as server.py :
get the api key from ```https://openweathermap.org/```

```bash
API_KEY=
PORT=
```

From the root directory :

```bash
# activate your virualenv
python server.py
```

The project is now running at <http://localhost:5000>

