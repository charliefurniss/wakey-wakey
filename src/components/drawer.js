import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

function Drawer({ handleLineCheckboxCheck }) {
  const [isLoading, setIsLoading] = useState(true);
  const [lines, setLines] = useState([]);
  const [error, setError] = useState({});

  useEffect(() => {
    fetch('https://api.tfl.gov.uk/line/mode/overground,tube')
      .then(response => response.json())
      .then(lines => {
        setLines(lines);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error);
        setIsLoading(false);
      });
  });

  return (
    <>
      <div className='mdl-layout__drawer'>
        <DrawerContent>
          <h5>Select lines</h5>
          <Inputs numberOfLines={lines.length}>
            {!isLoading &&
              lines.map(line => {
                return (
                  <label
                    className='mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect'
                    htmlFor={`${line.id}Checkbox`}
                    key={line.id}
                  >
                    <input
                      id={`${line.id}Checkbox`}
                      name={`${line.id}Checkbox`}
                      type='checkbox'
                      value={line.id}
                      className='mdl-checkbox__input'
                      onClick={() => handleLineCheckboxCheck(line.id)}
                    />
                    <span className='mdl-checkbox__label'>{line.name}</span>
                  </label>
                );
              })}
          </Inputs>
        </DrawerContent>
      </div>
    </>
  );
}

const DrawerContent = styled.div`
  padding-left: 24px;
`;

const Inputs = styled.div`
  display: flex;
  flex-direction: column;
`;

export default Drawer;
