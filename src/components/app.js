import React, { Component } from "react";
import { connect } from "react-redux";
import { SearchBar, WeatherDescription, CityList } from "./index";

class App extends Component {
  render() {
    const { cities, loading } = this.props;
    return (
      <div>
        <SearchBar />
        {cities.length > 0 && <CityList cities={cities} />}
      </div>
    );
  }
}

const mapState = state => ({
  cities: state.weather.cities,
  loading: state.weather.loading
});

export default connect(mapState)(App);
