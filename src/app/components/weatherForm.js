import React from 'react';

const WeatherForm = props => (
    <div className="card card-body">
        <form onSubmit={props.getWeather}>
            <div className="form-group">
                <input type="text" name="city" placeholder="Your City Name" className="form-control" autoFocus/>
            </div>
            
            <button className="btn btn-success btn-block">
                Get Weather
            </button>
        </form>
    </div>
);

export default WeatherForm;