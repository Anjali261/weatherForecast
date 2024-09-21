import "../components/ForecastCard.css";

const ForecastCard = ({ day, high, low, icon, unit }) => {
    return (

        <div className="forecast-card">
            <h4>{day}</h4>
            <p>High: {high}°{unit}</p> 
            <p>Low: {low}°{unit}</p>  
            <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="weather icon" />
        </div>
    );
};

export default ForecastCard;
