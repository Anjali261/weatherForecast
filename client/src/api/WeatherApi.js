import axios from 'axios';

const API_KEY = `52efe578bffd9ca4021efd48e8851957`;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getWeatherByCity = async (city) => {
    try {
        const response = await axios.get(`${BASE_URL}/weather`, {
            params: {
                q: city,
                units: 'metric',
                appid: API_KEY
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};

export const getFiveDayForecast = async (city) => {
    try {
        const response = await axios.get(`${BASE_URL}/forecast`, {
            params: {
                q: city,
                units: 'metric',
                appid: API_KEY
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};
