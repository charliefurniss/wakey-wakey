import React, { useState } from 'react';
import styled from 'styled-components';

function DashboardWidget({ heading, indicator, details, indicatorColour }) {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <Card className='mdl-card'>
      <CardTitle className='mdl-card__title' backgroundColour={indicatorColour}>
        <h4 className='mdl-card__title-text'>{heading}</h4>
      </CardTitle>
      <CardIndicator>
        <h5>{indicator}</h5>
      </CardIndicator>
      <div className='mdl-card__actions mdl-card--border'>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className='mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect'
        >
          {!showDetails ? <span>Show details</span> : <span>Hide details</span>}
        </button>
      </div>
      {showDetails && (
        <CardDetails className='mdl-card__supporting-text'>
          <p>{details}</p>
        </CardDetails>
      )}
    </Card>
  );
}

const Card = styled.div`
  text-align: left;
`;

const CardTitle = styled.div`
  background-color: ${({ backgroundColour }) => `${backgroundColour}`};
  color: #fff;
`;

const CardIndicator = styled.div`
  color: black;
  font-size: 24px;
  padding: 0 16px;
`;

const CardDetails = styled.div`
  color: black;
  padding: 0 24px;
`;

export default DashboardWidget;
