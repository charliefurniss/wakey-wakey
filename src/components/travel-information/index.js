import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import DashboardWidget from './../common/dashboard-widget';
import { warningColours } from '../utilities/warning-colours';

const GET_LINE_STATUSES = gql`
  query GetLineStatuses {
    lineStatuses {
      lineName
      reason
      severity
      description
    }
  }
`;

const TravelInformation = () => {
  return (
    <Query query={GET_LINE_STATUSES}>
      {({ loading, error, data }) => {
        if (loading)
          return <div className='mdl-spinner mdl-js-spinner is-active' />;
        if (error) return <h1>Error</h1>;
        return data.lineStatuses.map((status, index) => (
          <DashboardWidget
            key={index}
            heading={status.lineName}
            warning={status.description}
            details={status.reason}
            // validFrom={status.validityPeriods[0]}
            warningColour={setWarningColour(status.severity)}
          />
        ));
      }}
    </Query>
  );
};

const setWarningColour = statusSeverity => {
  let warningColour = warningColours.low;

  if (statusSeverity === 1) {
    warningColour = warningColours.veryHigh;
  }

  if ((statusSeverity > 1) & (statusSeverity < 5)) {
    warningColour = warningColours.high;
  }

  if ((statusSeverity >= 5) & (statusSeverity < 10)) {
    warningColour = warningColours.moderate;
  }

  return warningColour;
};

export default TravelInformation;
