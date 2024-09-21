import "./common.css";
const WeatherCondition = ({ condition, icon }) => {
    return (
        <div className="condition">
            <p>{condition}</p>
            <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt={condition} />
        </div>
    );
};

export default WeatherCondition;
