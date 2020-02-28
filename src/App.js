import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import './app.css';

import AirQuality from './components/air-quality';
import PollenCount from './components/pollen-count';
import TravelInformation from './components/travel-information';
import Drawer from './components/drawer';

function App() {
  const [linesToCheck, setLinesToCheck] = useState([]);

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

  useEffect(() => {}, [linesToCheck]);

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

      <Drawer handleLineCheckboxCheck={handleLineCheckboxCheck} />
      <StyledMain className='mdl-layout__content'>
        <PageContent>
          <AirQuality />
          <PollenCount />
          <TravelInformation />
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
