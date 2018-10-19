import {
  GET_CITY_LOADING,
  GET_CITY_WEATHER_FAIL,
  GET_CITY_WEATHER_SUCCESS,
  REMOVE_CITY
} from "./types";

const API_KEY = "c208656018436ef08364f0d2894d2fc1";

export const fetchWeather = city => dispatch => {
  dispatch({ type: GET_CITY_LOADING });
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}&units=metric`
  )
    .then(res => res.json())
    .then(cityData => {
      if (cityData.message === "city not found") {
        setTimeout(() => {
          // Just want to show loading state
          dispatch({
            type: GET_CITY_WEATHER_FAIL,
            payload: "City was unable to be found"
          });
        }, 750);
      } else {
        setTimeout(() => {
          // Just want to show loading state
          dispatch({ type: GET_CITY_WEATHER_SUCCESS, payload: cityData });
        }, 750);
      }
    })
    .catch(e => {
      dispatch({ type: GET_CITY_WEATHER_FAIL, payload: "Internal Error" });
    });
};

export const removeCity = id => ({ type: REMOVE_CITY, payload: id });
