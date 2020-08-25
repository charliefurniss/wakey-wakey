import React from 'react';
import styled from 'styled-components';

import './../../app.css';

import { useAppContext } from './../../contexts/app-context';

import NavBar from './../nav-bar';
import AirQuality from './../air-quality';
import PollenCount from './../pollen-count';
import TravelInformation from './../travel-information';
import WeatherForecast from './../weather-forecast';
import Drawer from './../drawer';

const AppContent = () => {
  const { linesToCheck } = useAppContext();

  return (
    <div className='app-layout mdl-layout mdl-js-layout mdl-layout--fixed-header mdl-layout--fixed-drawer'>
      <NavBar />
      <Drawer />
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
};

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

export default AppContent;
