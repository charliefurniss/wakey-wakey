import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import DashboardWidget from './../common/dashboard-widget';
import { warningColours } from '../utilities/warning-colours';

const GET_AIR_QUALITY = gql`
  query GetAirQuality {
    airQuality {
      band
      summary
    }
  }
`;

const AirQuality = () => {
  return (
    <Query query={GET_AIR_QUALITY}>
      {({ loading, error, data }) => {
        if (loading)
          return <div className='mdl-spinner mdl-js-spinner is-active' />;
        if (error) return <h1>Error</h1>;
        return (
          <DashboardWidget
            heading={'Air quality'}
            warning={data.airQuality.band}
            details={data.airQuality.summary}
            warningColour={colourSet[data.airQuality.band]}
          />
        );
      }}
    </Query>
  );
};

const colourSet = {
  Low: warningColours.low,
  Moderate: warningColours.moderate,
  High: warningColours.high,
  'Very High': warningColours.veryHigh
};

export default AirQuality;
