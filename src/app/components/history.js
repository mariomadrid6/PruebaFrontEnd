import React, { Component } from 'react';

class SearchHistory extends Component {

    // En props recibo el history y getWeather
    constructor(props) {
        super(props);

        // si history viene vacio, busco en el local storage
        if (props.history.length <=0){
            // el ?? es para validar si es null, entonces se asigna "[]"
            // Obtengo el hsitory almacenado en formato de string del local storage
            const stringHistory = localStorage.getItem("history") ?? "[]"

            // Establezco el estatus incial del componente
            this.state = {
                history: JSON.parse(stringHistory)
            };
        }else{
            this.state = {
                history: props.history
            };
        }
    }

    render() {
        return <ul>
            {this.state.history.map((city,i)=><li key={i} onClick={()=>this.props.getWeather(city)}>{city}</li>)}
        </ul>
    }
}

export default SearchHistory;