import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as actions from "../../actions";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import styles from "./index.css";

class SearchBar extends Component {
  state = {
    inputValue: ""
  };

  onInputChange = e => {
    this.setState({
      inputValue: e.target.value
    });
  };

  fetchWeather = e => {
    if (!this.state.inputValue) return;
    this.props.fetchWeather(this.state.inputValue);
    this.setState({ inputValue: "" });
  };

  render() {
    return (
      <Fragment>
        <TextField
          className={styles.input}
          value={this.state.inputValue}
          onChange={this.onInputChange}
          onKeyDown={e => e.keyCode === 13 && this.fetchWeather(e)}
          placeholder="City name"
        />
        {this.props.loading ? (
          <CircularProgress />
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={this.fetchWeather}
          >
            Search
          </Button>
        )}
        {this.props.error && (
          <SnackbarContent
            style={{ margin: "10px" }}
            message={"City was unable to be found"}
          />
        )}
      </Fragment>
    );
  }
}

const mapState = state => ({
  error: state.weather.error,
  loading: state.weather.loading
});

const mapDispatch = {
  fetchWeather: actions.fetchWeather
};

SearchBar.propTypes = {
  fetchWeather: PropTypes.func
};

export default connect(
  mapState,
  mapDispatch
)(SearchBar);
