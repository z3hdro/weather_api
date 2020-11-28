import styles from '../styles/week.module.css'

export default function week({forecast}) {

    function DayDate(utc) {
        let date = new Date(utc * 1000);
        let result = new Intl.DateTimeFormat('en-US', { weekday: 'long'}).format(date);
        return result[0].toUpperCase() + result.substring(1);
    }

    let data;
    if (forecast !== null) {
        data = forecast.daily.slice(1).map(day => {
            if (day.dt !== forecast.current.dt) {
                return (<div className={styles.week_day} key={`id_${day.dt}`}>
                <div>
                    {DayDate(day.dt)}
                </div>
                <div className={styles.description}>
                    {day.weather[0].description}
                </div>
                <div>
                    <span>Day : {Math.round(day.temp.day)}<sup>o</sup> </span>       
                    <span>Night : {Math.round(day.temp.night)}<sup>o</sup></span>
                </div>
            </div>);
            }
        });
    } else {
        data = null;
    }
    return(
        <div className={styles.week}>
            {data}
        </div>
    );
}