import React, {useState, useEffect} from 'react'
import {API_KEY} from '../config';
import styles from '../styles/main.module.css'
import Today from './Today'
import Week from './Week'
import Finder from './Finder'


export default function Weather() {
    const [forecast, setForecast] = useState(null);
    const [toggle, setToggle] = useState(false);
    
    async function geoSuccess(position) {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        let response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&units=metric&appid=${API_KEY}`)
        if (response.ok !== false) {
            let result = await response.json()
            setForecast(result);
        } else {
            let error = await response.text();
            console.log(error)
        };
        
    }

    async function geoError() {
        alert("Geocoder failed.");
    };

    useEffect(() => {
        if (forecast === null) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
            } else {
                alert("Geolocation is not supported by this browser.");
            };
        };
        
    }, [])

    function Header() {
        return(
            <div className={styles.header}>
                <div>
                    Forecast
                </div>
                <div>
                    <span className={styles.change_city_btn}
                        role = 'button'
                        onClick = {() => setToggle(!toggle)}
                        onKeyPress = {() => {}}
                        tabIndex = '0'>
                            City
                    </span>
                </div>
            </div>
        );
    }

    return (
        <React.Fragment>
            <Header />
            {toggle ? <Finder setForecast={setForecast} showmenu={setToggle}/> : null}
            <Today forecast={forecast}/>
            <Week forecast={forecast}/>
        </React.Fragment>
    );
}