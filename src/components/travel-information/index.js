import React from 'react';

import DashboardWidget from './../common/dashboard-widget';
import { warningColours } from '../utilities/warning-colours';

const TravelInformation = ({ travelInfo }) => {
  console.log(travelInfo);
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
                  warningColour={setWarningColour(status.statusSeverity)}
                />
              ) : (
                <DashboardWidget
                  key={status.id}
                  heading={line.name}
                  warning={'Good service'}
                  details={status.reason}
                  warningColour={setWarningColour(status.statusSeverity)}
                />
              );
            })}
        </React.Fragment>
      ))}
    </>
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
