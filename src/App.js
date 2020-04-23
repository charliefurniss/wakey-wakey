import React, { useState } from 'react';
import styled from 'styled-components';

import './app.css';

import NavBar from './components/nav-bar';
import AirQuality from './components/air-quality';
import PollenCount from './components/pollen-count';
import TravelInformation from './components/travel-information';
import WeatherForecast from './components/weather-forecast';
import Drawer from './components/drawer';

function App() {
  const [linesToCheck, setLinesToCheck] = useState([]);

  const handleLineCheckboxCheck = (lineId) => {
    if (!linesToCheck.includes(lineId)) {
      setLinesToCheck([...linesToCheck, lineId]);
    } else {
      const filteredLinesToCheck = linesToCheck.filter(
        (lineIdToCheck) => lineIdToCheck !== lineId
      );
      setLinesToCheck(filteredLinesToCheck);
    }
  };

  return (
    <div className='app-layout mdl-layout mdl-js-layout mdl-layout--fixed-header mdl-layout--fixed-drawer'>
      <NavBar />
      <Drawer handleLineCheckboxCheck={handleLineCheckboxCheck} />
      <StyledMain className='mdl-layout__content'>
        <PageContent>
          <AirQuality />
          <PollenCount />
          {linesToCheck.length > 0 && (
            <TravelInformation linesToCheck={linesToCheck.join()} />
          )}
          <WeatherForecast />
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
  justify-content: center;
`;

export default App;
