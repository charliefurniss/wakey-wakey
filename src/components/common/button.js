import React from 'react';
import styled from 'styled-components';

export default function Button() {
  return (
    <StyledButton className='mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent'>
      Button
    </StyledButton>
  );
}

const StyledButton = styled.button`
  width: 164px;
`;
