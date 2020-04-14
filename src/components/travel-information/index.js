import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';

import DashboardWidget from './../common/dashboard-widget';
import { warningColours } from '../utilities/warning-colours';

const GET_LINE_STATUSES = gql`
  query GetLineStatuses($lineIds: String!) {
    lineStatuses(lineIds: $lineIds) {
      name
      reason
      severity
      description
    }
  }
`;

const TravelInformation = ({ linesToCheck }) => {
  const { loading, error, data } = useQuery(GET_LINE_STATUSES, {
    variables: {
      lineIds: linesToCheck,
    },
  });

  if (loading) return <div className='mdl-spinner mdl-js-spinner is-active' />;
  if (error) return <h1>Error</h1>;

  return data.lineStatuses.map((status, index) => (
    <DashboardWidget
      key={index}
      heading={status.name}
      warning={status.description}
      details={status.reason}
      // validFrom={status.validityPeriods[0]}
      warningColour={setWarningColour(status.severity)}
    />
  ));
};

const setWarningColour = (statusSeverity) => {
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
