import React from 'react';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { useQuery } from 'react-apollo';

import { useAppContext } from './../../contexts/app-context';

const GET_LINES = gql`
  query GetLines {
    lines {
      name
      id
    }
  }
`;

function Drawer() {
  const { loading, error, data } = useQuery(GET_LINES);
  const { handleLineCheckboxCheck } = useAppContext();

  if (loading) return <div className='mdl-spinner mdl-js-spinner is-active' />;
  if (error) return <h1>{error}</h1>;

  return (
    <div className='mdl-layout__drawer'>
      <DrawerContent>
        <h5>Select lines</h5>
        <Inputs numberOfLines={data.lines.length}>
          {data.lines.map((line) => {
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
