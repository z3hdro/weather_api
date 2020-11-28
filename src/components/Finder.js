import {useState} from 'react'
import styles from '../styles/finder.module.css'
import {list} from '../cities'
import {API_KEY} from '../config'

export default function Finder({setForecast, showmenu}) {
    const [toggle, setToggle] = useState(false);
    const [cities, setCities] = useState(list);

    async function fetchData(cityname) {
        showmenu(false);
        let response_lat_lon = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${API_KEY}`)
        if (response_lat_lon.ok !== false) {
            let answer = await response_lat_lon.json()
            let lat = await answer.coord.lat;
            let lon = await answer.coord.lon;
            let response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&lang=ru&units=metric&appid=${API_KEY}`)
            if (response.ok !== false) {
                let result = await response.json()
                
                setForecast(result);
            } else {
                let error = await response.text();
                console.log(error)
            };
        } else {
            let error = await response_lat_lon.text();
            console.log(error);
        };
    } 

    const data = cities.map((city) =>
        <div className={styles.town} 
            key={`city_id_${city}`}
            role = 'button'
            onClick = {() => {fetchData(city)}}
            onKeyPress = {() => {}}
            tabIndex = '0'>
            {city}
        </div>
    );

    const ChangeList = (name) => {
        if (name === '') {
            setCities(list)
        } else {
            const filtered = list.filter(city => city.toLowerCase().includes(name.toLowerCase()));
            if (filtered.length < 1) {
                setToggle(true);
            } else {
                setToggle(false);
            }
            setCities(filtered)
        }
    }  

    return(
        <div className={styles.cities}>
            <input className={styles.finder} 
                placeholder='Write a name of a city'
                onChange={(event) => {
                    ChangeList(event.target.value)
                }}
                />
            {toggle ? <div className={styles.nothing}>Nothing was found</div> : null}
            {data}
        </div>
    );
}