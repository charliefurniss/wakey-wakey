import React, { Component } from "react";
import LineNames from "./line-names";

class TravelInformation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      lineData: []
    };
  }

  componentDidMount() {
    const linesToCheck = ["victoria", "london-overground"];

    fetch("https://api.tfl.gov.uk/line/mode/overground,tube/status")
      .then(response => response.json())
      .then(data => {
        this.setState({
          lineData: filterLines(data, linesToCheck),
          isLoading: false
        });
      })
      .catch(error => this.setState({ error, isLoading: false }));
  }

  render() {
    const { lineData, error, isLoading } = this.state;

    return (
      <React.Fragment>
        <h2>Travel</h2>
        <LineNames />
        {error ? <p>{error.message}</p> : null}
        {!isLoading ? (
          lineData.map(line => {
            return (
              <div key={line.id}>
                <h3>{line.name}</h3>
                {line.lineStatuses.length > 0 &&
                  line.lineStatuses.map(status => {
                    return status.statusSeverity < 10 ? (
                      <div key={status.id}>
                        <h4>{status.statusSeverityDescription}</h4>
                        <p>{status.reason}</p>
                      </div>
                    ) : (
                      <h4 key={status.id}>Good service</h4>
                    );
                  })}
                <hr />
              </div>
            );
          })
        ) : (
          <h3>Loading...</h3>
        )}
      </React.Fragment>
    );
  }
}

const filterLines = (lines, linesToCheck) => {
  return lines.filter(line => {
    return linesToCheck.includes(line.id);
  });
};

export default TravelInformation;
