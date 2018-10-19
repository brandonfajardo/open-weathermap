import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
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
    const { loading, error } = this.props;
    return (
      <Fragment>
        <TextField
          className={styles.input}
          value={this.state.inputValue}
          onChange={this.onInputChange}
          onKeyDown={e => e.keyCode === 13 && this.fetchWeather(e)}
          placeholder="City name"
        />
        {loading ? (
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
        {error && (
          <SnackbarContent style={{ margin: "10px" }} message={error} />
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

export default connect(
  mapState,
  mapDispatch
)(SearchBar);
