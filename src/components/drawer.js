import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

function Drawer({ handleLineCheckboxCheck, handleRefresh }) {
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
    <React.Fragment>
      {error ? <p>{error.message}</p> : null}
      <div className='mdl-layout__drawer'>
        <DrawerContent>
          <h5>Select lines</h5>
          <Inputs numberOfLines={lines.length}>
            {!isLoading &&
              lines.map(line => {
                return (
                  <InputWrapper key={line.id}>
                    <label
                      className='mdl-checkbox mdl-js-checkbox  mdl-js-ripple-effect'
                      htmlFor={`${line.id}Checkbox`}
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
                  </InputWrapper>
                );
              })}
          </Inputs>
          <button
            className='mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent'
            onClick={handleRefresh}
          >
            Refresh
          </button>
        </DrawerContent>
      </div>
    </React.Fragment>
  );
}

const DrawerContent = styled.div`
  padding-left: 24px;
`;

const Inputs = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputWrapper = styled.div`
  margin-bottom: 12px;
  input {
    margin: 0;
  }
  label {
    margin-left: 4px;
  }
`;

export default Drawer;
