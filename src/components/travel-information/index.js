import React from 'react';
import styled from 'styled-components';

const TravelInformation = ({ travelInfo }) => {
  return (
    <TravelInfo>
      {travelInfo.map((line, index) => (
        <React.Fragment key={index}>
          <h3>{line.name}</h3>
          {line.lineStatuses.length > 0 &&
            line.lineStatuses.map(status => {
              return status.statusSeverity < 10 ? (
                <TravelDetails key={status.id}>
                  <h4>{status.statusSeverityDescription}</h4>
                  <p>{status.reason}</p>
                </TravelDetails>
              ) : (
                <TravelDetails key={status.id}>
                  <h4 key={status.id}>Good service</h4>
                </TravelDetails>
              );
            })}
          <StyledHr />
        </React.Fragment>
      ))}
    </TravelInfo>
  );
};

const TravelInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const TravelDetails = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StyledHr = styled.hr`
  width: 300px;
`;

export default TravelInformation;
