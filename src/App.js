import React, {Component} from 'react';

import Titles from './components/Titles';
import Form from './components/Form';
import Weather from './components/Weather';

const API_KEY = `c1b252d79afc95c74b3d0820235b12d4`;

class App extends Component {
    state = {
        temperature: null,
        city: null,
        country: null,
        humidity: null,
        description: null,
        error: null
    };

    getWeather = async event => {
        event.preventDefault();
        const city = event.target.elements.city.value;
        const country = event.target.elements.country.value;

        const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
        const data = await api_call.json();

        if (city && country) {
            this.setState({
                temperature: data.main.temp,
                city: data.name,
                country: data.sys.country,
                humidity: data.main.humidity,
                description: data.weather[0].description,
                icon: data.weather[0].icon,
                error: ''
            });
        } else {
            this.setState(prevState => ({
                ...prevState,
                error: 'Please, enter city and country.'
            }));
        }
    };

    render() {
        const {city, country, temperature, humidity, description, error} = this.state;

        return (
            <div>
                <div className='wrapper'>
                    <div className='main'>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-md-5 title-container'>
                                    <Titles/>
                                </div>
                                <div className='col-md-7 form-container'>
                                    <Form getWeather={this.getWeather}/>
                                    <Weather
                                        temperature={temperature}
                                        humidity={humidity}
                                        city={city}
                                        country={country}
                                        description={description}
                                        error={error}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
