import Head from 'next/head';
import { useState, useEffect } from 'react'


export default function Weather(props) {
    const [currWeather, setCurrWeather] = useState({ text: 'fetching weather...', icon: '' });
    const weatherAPIKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
    const zipCode = '95014';

    useEffect(() => {
        fetchWeather(weatherAPIKey, zipCode)
            .then(data => setCurrWeather(data.current.condition))
            .catch(error => console.error(error));
    }, []);

    const { text, icon } = currWeather;
    if (icon != '') {
        return (<>
            <img src={'https:' + icon} />
            <h1>{text}</h1>
        </>);
    }
    return;
}


const fetchWeather = async (key, location) => {
    const url = 'http://api.weatherapi.com/v1/current.json?';
    const response = await fetch(url + `key=${key}&q=${location}&aqi=no`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
    return await response.json();
}
