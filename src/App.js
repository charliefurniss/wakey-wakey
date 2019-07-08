import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import './app.css';

import AirQuality from './components/air-quality';
import TravelInformation from './components/travel-information';
import Drawer from './components/drawer';

function App() {
  const [linesToCheck, setLinesToCheck] = useState([
    'london-overground',
    'victoria'
  ]);
  const [displayTravelInfo, setDisplayTravelInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({});

  const fetchData = async () => {
    try {
      const response = await fetch(
        'https://api.tfl.gov.uk/line/mode/overground,tube/status'
      );
      const data = await response.json();
      setDisplayTravelInfo(filterLines(data, linesToCheck));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  };

  const handleLineCheckboxCheck = lineId => {
    if (!linesToCheck.includes(lineId)) {
      setLinesToCheck([...linesToCheck, lineId]);
    } else {
      const filteredLinesToCheck = linesToCheck.filter(
        lineIdToCheck => lineIdToCheck !== lineId
      );
      setLinesToCheck(filteredLinesToCheck);
    }
  };

  const handleRefresh = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [linesToCheck]);

  return (
    <div className='app-layout mdl-layout mdl-js-layout mdl-layout--fixed-header mdl-layout--fixed-drawer'>
      <header className='mdl-layout__header mdl-layout__header--transparent'>
        <div className='mdl-layout__header-row'>
          <span className='mdl-layout-title'>Wakey wakey</span>
          <div className='mdl-layout-spacer' />
          <nav className='mdl-navigation'>
            <a className='mdl-navigation__link' href='/'>
              Link
            </a>
          </nav>
        </div>
      </header>

      <Drawer
        handleLineCheckboxCheck={handleLineCheckboxCheck}
        handleRefresh={handleRefresh}
      />
      <StyledMain className='mdl-layout__content'>
        <PageContent>
          <AirQuality />
          {!isLoading && displayTravelInfo.length > 0 ? (
            <TravelInformation travelInfo={displayTravelInfo} />
          ) : (
            <h3>Loading...</h3>
          )}
        </PageContent>
      </StyledMain>
    </div>
  );
}

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PageContent = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const filterLines = (lines, linesToCheck) => {
  return lines.filter(line => {
    return linesToCheck.includes(line.id);
  });
};

export default App;
