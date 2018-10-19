import React from "react";
import { WeatherDescription } from "../index";
import Grid from "@material-ui/core/Grid";

const CityList = ({ cities }) => {
  return (
    <Grid spacing={8} container>
      {cities.map((city, i) => {
        return (
          <Grid
            key={`${city.name}-${i}`}
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            container
          >
            {" "}
            <WeatherDescription {...city} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default CityList;
