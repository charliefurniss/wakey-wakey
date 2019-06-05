import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import './app.css';

import TravelInformation from './components/travel-information';
import Drawer from './components/drawer';

function App() {
  const [linesToCheck, setLinesToCheck] = useState([]);
  const [displayTravelInfo, setDisplayTravelInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({});

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

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          'https://api.tfl.gov.uk/line/mode/overground,tube/status'
        );
        const data = await response.json();
        setDisplayTravelInfo(filterLines(data, linesToCheck));
        setIsLoading(false);
      } catch (error) {
        setError(error);
      }
    }
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

      <Drawer handleLineCheckboxCheck={handleLineCheckboxCheck} />
      <StyledMain className='mdl-layout__content'>
        <div className='page-layout'>
          <div className='page-content'>
            <h2>Travel</h2>
            {error ? <p>{error.message}</p> : null}
            {!isLoading && displayTravelInfo.length > 0 ? (
              <TravelInformation travelInfo={displayTravelInfo} />
            ) : (
              <h3>Loading...</h3>
            )}
          </div>
        </div>
      </StyledMain>
    </div>
  );
}

const StyledMain = styled.main`
  margin-left: ;
`;

const filterLines = (lines, linesToCheck) => {
  return lines.filter(line => {
    return linesToCheck.includes(line.id);
  });
};

export default App;
