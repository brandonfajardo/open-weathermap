import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import { get } from "lodash";
import * as actions from "../../actions";
import { connect } from "react-redux";
import styles from "./index.css";
import cn from "classnames";

class WeatherDescription extends Component {
  state = {
    displayFarenheit: false,
    displayCelsius: true
  };

  toggleTemp = measurement => {
    this.setState({
      displayFarenheit: measurement === "celsius" ? false : true,
      displayCelsius: measurement === "celsius" ? true : false
    });
  };

  render() {
    const iconCode = get(this.props, "weather[0].icon");
    const description = get(this.props, "weather[0].main");
    const temp = get(this.props, "main.temp");
    const humidity = get(this.props, "main.humidity");
    const wind = get(this.props, "wind.speed");

    const convertTemp = temp => {
      return this.state.displayFarenheit
        ? (Math.floor(temp) * 9) / 5 + 32
        : Math.floor(temp);
    };

    return (
      <Card className={styles.card}>
        <div className={styles.topContainer}>
          <span className={styles.cityName}>{this.props.name}</span>
          <DeleteOutlinedIcon
            onClick={() => this.props.removeCity(this.props.id)}
            style={{ cursor: "pointer" }}
          />
        </div>
        <span className={styles.cityDescription}>{description}</span>
        <div className={styles.midContainer}>
          <img
            className={styles.cityPhoto}
            src={`http://openweathermap.org/img/w/${iconCode}.png`}
          />
          <p className={styles.cityTemp}>
            {`${convertTemp(temp)} `}
            <sup className={styles.cityTempSize}>
              <span
                onClick={() => this.toggleTemp("celsius")}
                style={{
                  cursor: "pointer",
                  color: this.state.displayCelsius && "#3e51b5"
                }}
              >
                &#8451;
              </span>{" "}
              |{" "}
              <span
                onClick={this.toggleTemp}
                style={{
                  cursor: "pointer",
                  color: this.state.displayFarenheit && "#3e51b5"
                }}
              >
                &#x2109;
              </span>
            </sup>
          </p>
        </div>
        <span className={styles.cityExtraDescription}>
          Humidity: {humidity}%
        </span>
        <span className={styles.cityExtraDescription}>
          Wind: {wind}
          km/h
        </span>
      </Card>
    );
  }
}

const mapDispatch = {
  removeCity: actions.removeCity
};

export default connect(
  null,
  mapDispatch
)(WeatherDescription);
