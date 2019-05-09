import React, { Component } from "react";
import styled from "styled-components";

class LineNames extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      lines: []
    };
  }

  componentDidMount() {
    fetch("https://api.tfl.gov.uk/line/mode/overground,tube")
      .then(response => response.json())
      .then(lines => {
        console.log(lines);
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
        <h2>Select lines</h2>
        {error ? <p>{error.message}</p> : null}
        <Inputs numberOfLines={lines.length}>
          {!isLoading &&
            lines.map(line => {
              return (
                <InputWrapper key={line.id}>
                  <input
                    id={`${line.id}Checkbox`}
                    name={`${line.id}Checkbox`}
                    type="checkbox"
                    value={line.id}
                  />
                  <label for={`${line.id}Checkbox`}>{line.name}</label>
                </InputWrapper>
              );
            })}
        </Inputs>
      </React.Fragment>
    );
  }
}

const Inputs = styled.div`
  display: grid;
  text-align: left;
  grid-template-grid: ${({ numberOfLines }) =>
    numberOfLines && `repeat(3, auto)`};
  grid-template-columns: ${({ numberOfLines }) =>
    numberOfLines && `repeat(4, auto)`};
`;

const InputWrapper = styled.div`
  margin: 12px;
  input {
    margin: 0;
  }
  label {
    margin-left: 4px;
  }
`;

export default LineNames;
