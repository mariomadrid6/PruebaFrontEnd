import React, { Component } from 'react';

import WeatherForm from './components/WeatherForm';
import WeatherInfo from './components/WeatherInfo';
import SearchHistory from './components/history';
import { WEATHER_KEY } from './keys';

class App extends Component {

    state = {
        temperature: '',
        description: '',
        humidity: '',
        wind_speed: 0,
        city: '',
        country: '',
        error: null,
        // Estado para guardar el historial de busqueda
        history : []
    };

    

    getWeather = async (e) => {
        e.preventDefault();
        const { city, country } = e.target.elements;
        const cityValue = city.value;

        if (cityValue) {
            // metric parameter is for Celcius Unit
           
            await this.sendRequest(cityValue)
        } else {
            this.setState({
                error: 'Please enter a City name.'
            });
        }

    }

    getWeatherFromHistory = async (cityValue) => {
        await this.sendRequest(cityValue)
    }

    sendRequest = async (cityValue) => {
        const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${WEATHER_KEY}&units=metric`;
        const response = await fetch(API_URL);
        const data = await response.json();
        console.log(data)

        if (!response.ok) {
            this.setState({
                error: data.message
            });
            return
        }
        
        this.setState((state, _) => {
            // Guardo en local storage para que persista en el navegador
            localStorage.setItem("history",JSON.stringify([...state.history, data.name]))
            return{
                temperature: data.main.temp,
                description: data.weather[0].description,
                humidity: data.main.humidity,
                wind_speed: data.wind.speed,
                city: data.name,
                country: data.sys.country,
                error: null,
                // Guardamos al historial solo si la peticion salio correcta
                history: [...state.history, data.name]
                

            }
        })
    }

    render() {
        return <div className="container p-4">
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <WeatherForm
                        getWeather={this.getWeather}
                    />
                    <WeatherInfo {...this.state} />
                </div>
                
                <div className="column">
            <div className="card card-body mt-4" >
                <div className="col-md-12 mx-auto">
                <SearchHistory getWeather={this.getWeatherFromHistory} history={this.state.history} />
                </div>
            </div>    
            </div>
            </div>

            
        </div>
    }

   
}
export default App;