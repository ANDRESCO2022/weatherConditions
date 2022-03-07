import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

const Weathers = () => {
  const [weather, setWeather] = useState({});
  const [temp, setTemp] = useState();
  const [tempData, setTempData] = useState();

  const [isCelsius, setIsCelsious] = useState(false);
  const succes = (pos) => {
    const latitude = pos.coords.latitude;
    const longitude = pos.coords.longitude;
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=a8021a25163f04f5deb777ac6c66eeef`
      )
      .then((res) => {
        setWeather(res.data);
        setTempData(res.data.main.temp);
        setTemp((res.data.main.temp - 273.15).toFixed());

      });
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(succes);
  }, []);

  const convert = () => {
    let value = 0;
    if (isCelsius) {
      value = (tempData - 273.15).toFixed();
      setIsCelsious(false);
    } else {
      value = ((tempData - 273.15) * 1.8 + 32).toFixed();
      setIsCelsious(true);
    }
    setTemp(value);
  };
  const CardStyle = {
    backgroundImage: " url('https://picsum.photos/id/1019/400/350')",
   
  };
  

  return (
    <div className="card" style={CardStyle}>
      <div className="card-city">
        <h3>Climatic State</h3>
         <i><b>
          {weather.name},{weather.sys?.country}           
         </b> 
        </i>
      </div>
      <div className="card-info">
        <img
          src={` http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`}
          alt=""
        />

        <ul>
          <li>"{weather.weather?.[0].description}"</li>
          <br />
          <li>
            <i className="fa-solid fa-wind"></i> Speed: {weather.wind?.speed}m/s
          </li>
          <li>
            <i className="fa-solid fa-cloud"></i> Clouds:{weather.clouds?.all}%
          </li>
          <li>
            <i className="far fa-humidity"></i> Humidity:
            {weather.main?.humidity}%
          </li>
        </ul>
      </div>
      <div className="weather-convert">
        <p>
          {temp}
          {isCelsius ? "  °F" : " °C"}
        </p>
        <button onClick={convert}>
          <b>°C/°F</b>
        </button>
      </div>
    </div>
  );
};
export default Weathers;
