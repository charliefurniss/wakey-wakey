import React, { useState } from 'react';

import { AppContext } from './contexts/app-context';

import AppContent from './components/app-content';

const App = () => {
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
    <AppContext.Provider value={{ linesToCheck, handleLineCheckboxCheck }}>
      <AppContent handleLineCheckboxCheck={handleLineCheckboxCheck} />
    </AppContext.Provider>
  );
};

export default App;
