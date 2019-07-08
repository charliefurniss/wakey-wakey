import React from 'react';

import DashboardWidget from './../common/dashboard-widget';
import { warningColours } from '../utilities/warning-colours';

const TravelInformation = ({ travelInfo }) => {
  return (
    <>
      {travelInfo.map((line, index) => (
        <React.Fragment key={index}>
          {line.lineStatuses.length > 0 &&
            line.lineStatuses.map(status => {
              return status.statusSeverity < 10 ? (
                <DashboardWidget
                  key={status.id}
                  heading={line.name}
                  warning={status.statusSeverityDescription}
                  details={status.reason}
                  validFrom={status.validityPeriods[0]}
                  warningColour={colourSet[status.statusSeverityDescription]}
                />
              ) : (
                <DashboardWidget
                  key={status.id}
                  heading={line.name}
                  warning={'Good'}
                  details={status.reason}
                  warningColour={colourSet['Low']}
                />
              );
            })}
        </React.Fragment>
      ))}
    </>
  );
};

const colourSet = {
  Low: warningColours.low,
  Moderate: warningColours.moderate,
  High: warningColours.high,
  'Very High': warningColours.veryHigh
};

export default TravelInformation;
