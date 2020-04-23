import React, { useEffect } from 'react';

import DashboardWidget from '../common/dashboard-widget';
import { warningColours } from '../utilities/warning-colours';

function PollenCount() {
  const pollenCount = {
    status_code: '200 OK',
    date: '2019-07-12T14:35:06+00:00',
    forecast: [
      {
        date: '2019-07-09T08:00:01+00:00',
        pollen_count: 'High',
      },
      {
        date: '2019-07-10T08:00:01+00:00',
        pollen_count: 'High',
      },
      {
        date: '2019-07-11T08:00:01+00:00',
        pollen_count: 'High',
      },
      {
        date: '2019-07-12T08:00:01+00:00',
        pollen_count: 'Moderate',
        temperature: '23',
        weather_code: '07',
        weather: 'Medium-level cloud',
      },
      {
        date: '2019-07-13T08:00:01+00:00',
        pollen_count: 'High',
        temperature: '22',
        weather_code: '10',
        weather: 'Light rain shower (day)',
      },
      {
        date: '2019-07-14T08:00:01+00:00',
        pollen_count: 'High',
        temperature: '20',
        weather_code: '07',
        weather: 'Medium-level cloud',
      },
    ],
  };

  useEffect(() => {
    // fetch(
    //   'https://socialpollencount.co.uk/api/forecast?location=[51.7546407,0.0014544000000569213]'
    // )
    //   .then(response => response.json())
    //   .then(data => {
    //     setPollenCount(dummyData);
    //     setForecastBand(dummyData.forecast[3].pollen_count);
    //     setIsLoading(false);
    //   })
    //   .catch(error => {
    //     setError(error);
    //     setIsLoading(false);
    //   });
  });

  return (
    <DashboardWidget
      heading={'Pollen Count'}
      warning={pollenCount.forecast[3].pollen_count}
      warningColour={colourSet['Moderate']}
    />
  );
}

const colourSet = {
  Low: warningColours.low,
  Moderate: warningColours.moderate,
  High: warningColours.high,
  'Very High': warningColours.veryHigh,
};

export default PollenCount;
