import React, { useState } from 'react';
import styled from 'styled-components';

import { colours } from './../utilities/core-colours';
import { getTimeSinceReported } from './../utilities/time';

function DashboardWidget({
  heading,
  warning = null,
  numeric = null,
  details = null,
  validFrom,
  warningColour,
  warningTextColour,
  icon = null,
}) {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <DashboardContainer className='mdl-card mdl-shadow--4dp'>
      <Title className='mdl-card__title'>
        <h4 className='mdl-card__title-text'>{heading}</h4>
      </Title>
      <WarningContainer
        color={warningTextColour}
        backgroundColour={warningColour}
      >
        <Warning>{warning || icon}</Warning>
        {validFrom && validFrom.isNow && (
          <WarningTime>
            {`${getTimeSinceReported(validFrom.fromDate)} ago`}
          </WarningTime>
        )}
        <Numeric>{numeric}</Numeric>
      </WarningContainer>
      <ButtonContainer className='mdl-card__actions'>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className='mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect'
        >
          {!showDetails ? <span>Show details</span> : <span>Hide details</span>}
        </button>
      </ButtonContainer>
      {showDetails && (
        <Details className='mdl-card__supporting-text'>
          <p>{details ? details : 'No further details'}</p>
        </Details>
      )}
    </DashboardContainer>
  );
}

const DashboardContainer = styled.div`
  text-align: left;
  background-color: ${colours.lighterBackground};
  color: ${colours.primaryText};
  margin: 12px;
  border-radius: 8px;
`;

const Title = styled.div`
  color: ${colours.primaryText};
`;

const WarningContainer = styled.div`
  background-color: ${({ backgroundColour }) => `${backgroundColour}`};
  color: ${({ color }) => `${color}`};
  font-size: 24px;
  height: 60px;
  padding: 8px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Warning = styled.span``;

const Numeric = styled.span``;

const WarningTime = styled.div`
  font-size: 12px;
  align-self: flex-end;
`;

const Details = styled.div`
  padding: 0 24px;
  color: ${colours.primaryText};
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  & > button > span {
    color: ${colours.primaryText};
  }
`;

export default DashboardWidget;
