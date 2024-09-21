import './common.css';

const TemperatureDisplay = ({ temperature, unit }) => {
    return (
        <div className="temperature-display">
            <p>
                Temperature: {temperature.toFixed(1)}°{unit}
            </p>
        </div>
    );
};

export default TemperatureDisplay;
