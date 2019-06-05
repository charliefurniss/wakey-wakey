import React, { Component } from 'react';
import styled from 'styled-components';

class Drawer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      lines: []
    };
  }

  componentDidMount() {
    fetch('https://api.tfl.gov.uk/line/mode/overground,tube')
      .then(response => response.json())
      .then(lines => {
        this.setState({
          lines: lines,
          isLoading: false
        });
      })
      .catch(error => this.setState({ error, isLoading: false }));
  }

  render() {
    const { lines, error, isLoading } = this.state;

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
                      <input
                        id={`${line.id}Checkbox`}
                        name={`${line.id}Checkbox`}
                        type='checkbox'
                        value={line.id}
                        onClick={() =>
                          this.props.handleLineCheckboxCheck(line.id)
                        }
                      />
                      <label htmlFor={`${line.id}Checkbox`}>{line.name}</label>
                    </InputWrapper>
                  );
                })}
            </Inputs>
          </DrawerContent>
        </div>
      </React.Fragment>
    );
  }
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
