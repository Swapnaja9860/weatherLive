import unittest
from unittest.mock import patch, MagicMock
import sys
import os

# Adjust the path to import the helper module
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from scripts.helper import get_lat_lon, get_current_weather, get_air_pollutant, get_forecast_air_pollutant

class TestHelperFunctions(unittest.TestCase):

    def setUp(self):
        self.mock_response = MagicMock()
        self.mock_response.json.return_value = [{'lat': 18.5204, 'lon': 73.8567}]
        self.mock_lat_lon = (18.5204, 73.8567)
        self.weather_response = {
            'coord': {'lon': 73.8567, 'lat': 18.5204},
            'weather': [{'description': 'clear sky'}],
            'main': {'temp': 300.15, 'humidity': 40, 'feels_like': 302.15},
            'wind': {'speed': 3.1},
            'dt': 1625440855
        }
        self.air_pollutant_response = {
            'list': [{'main': {'aqi': 1}, 'components': {'pm2_5': 5.0, 'pm10': 10.0}}]
        }
        self.air_pollutant_forecast_response = {
            'list': [{'main': {'aqi': 1}, 'components': {'pm2_5': 5.0, 'pm10': 10.0}},
                     {'main': {'aqi': 1}, 'components': {'pm2_5': 5.2, 'pm10': 10.2}}]
        }

    @patch('requests.get')
    def test_get_lat_lon_success(self, mock_get):
        self.mock_response.status_code = 200
        mock_get.return_value = self.mock_response
        
        lat, lon = get_lat_lon("Pune, IN")
        self.assertEqual(lat, 18.5204)
        self.assertEqual(lon, 73.8567)

    @patch('requests.get')
    def test_get_lat_lon_failure(self, mock_get):
        self.mock_response.status_code = 404
        mock_get.return_value = self.mock_response
        
        lat, lon = get_lat_lon("Pune, IN")
        self.assertIsNone(lat)
        self.assertIsNone(lon)

    @patch('requests.get')
    def test_get_current_weather_success(self, mock_get):
        mock_get_lat_lon = patch('scripts.helper.get_lat_lon', return_value=self.mock_lat_lon).start()
        self.mock_response.status_code = 200
        self.mock_response.json.return_value = self.weather_response
        mock_get.return_value = self.mock_response

        response = get_current_weather("Pune, IN", "standard")
        self.assertIsNotNone(response)
        self.assertEqual(response['coord'], {'lon': 73.8567, 'lat': 18.5204})
        self.assertEqual(response['weather'], {'description': 'clear sky'})
        self.assertEqual(response['temperature'], 300.15)
        self.assertEqual(response['humidity'], 40)
        self.assertEqual(response['wind_speed'], 3.1)
        self.assertEqual(response['feels_like'], 302.15)
        self.assertEqual(response['datetime'], 1625440855)

        mock_get_lat_lon.stop()

    @patch('requests.get')
    def test_get_current_weather_failure(self, mock_get):
        mock_get_lat_lon = patch('scripts.helper.get_lat_lon', return_value=(None, None)).start()
        self.mock_response.status_code = 404
        mock_get.return_value = self.mock_response

        response = get_current_weather("Pune, IN", "standard")
        self.assertIsNone(response)

        mock_get_lat_lon.stop()

    @patch('requests.get')
    def test_get_air_pollutant_success(self, mock_get):
        self.mock_response.status_code = 200
        self.mock_response.json.return_value = self.air_pollutant_response
        mock_get.return_value = self.mock_response

        response = get_air_pollutant("Pune, IN")
        self.assertIsNotNone(response)
        self.assertEqual(response[0]['main']['aqi'], 1)
        self.assertEqual(response[0]['components']['pm2_5'], 5.0)
        self.assertEqual(response[0]['components']['pm10'], 10.0)

    @patch('requests.get')
    def test_get_air_pollutant_failure(self, mock_get):
        self.mock_response.status_code = 404
        mock_get.return_value = self.mock_response

        response = get_air_pollutant("Pune, IN")
        self.assertIsNone(response)

    @patch('requests.get')
    def test_get_forecast_air_pollutant_success(self, mock_get):
        self.mock_response.status_code = 200
        self.mock_response.json.return_value = self.air_pollutant_forecast_response
        mock_get.return_value = self.mock_response

        response = get_forecast_air_pollutant("Pune, IN")
        self.assertIsNotNone(response)
        self.assertGreater(len(response), 1)

    @patch('requests.get')
    def test_get_forecast_air_pollutant_failure(self, mock_get):
        self.mock_response.status_code = 404
        mock_get.return_value = self.mock_response

        response = get_forecast_air_pollutant("Pune, IN")
        self.assertIsNone(response)

if __name__ == '__main__':
    unittest.main()
