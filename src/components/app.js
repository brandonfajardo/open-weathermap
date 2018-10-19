import React, { Component } from "react";
import { connect } from "react-redux";
import { SearchBar, CityList } from "./index";

class App extends Component {
  render() {
    const { cities } = this.props;
    return (
      <div>
        <SearchBar />
        {cities.length > 0 && <CityList cities={cities} />}
      </div>
    );
  }
}

const mapState = state => ({
  cities: state.weather.cities
});

export default connect(mapState)(App);
