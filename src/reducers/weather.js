import {
  GET_CITY_LOADING,
  GET_CITY_WEATHER_FAIL,
  GET_CITY_WEATHER_SUCCESS,
  REMOVE_CITY
} from "../actions/types";

const initialState = {
  error: "",
  loading: false,
  cities: []
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_CITY_LOADING:
      return {
        ...state,
        loading: true,
        error: false
      };
    case GET_CITY_WEATHER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        cities: [payload, ...state.cities]
      };
    case GET_CITY_WEATHER_FAIL:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case REMOVE_CITY:
      return {
        ...state,
        cities: [...state.cities].filter(city => city.id !== payload)
      };
    default:
      return state;
  }
};
