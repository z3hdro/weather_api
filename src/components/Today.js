import styles from '../styles/today.module.css'


export default function Today({forecast}) {
    let data;
    if (forecast !== null) {
        let cityName = forecast.timezone.split('/')
        data = <div className={styles.current}>
            <div className={styles.today}>
                Сегодня
            </div>
            <div className={styles.city}>
                {cityName[1]}
            </div>
            <div className={styles.description}>   
                {forecast.current.weather[0].description}
            </div>
            <div className={styles.temperature}>
                {Math.round(forecast.current.temp)}<sup>o</sup>
            </div>
            <div className={styles.feels_like}>
                ощущается как {Math.round(forecast.current.feels_like)}<sup>o</sup>
            </div>
        </div>
    } else {
        data = <div className={styles.error}>
            Sorry, something went wrong
        </div>;
    }
    return(
        <div className={styles.forecast}>
            {data}
        </div>
    );
}