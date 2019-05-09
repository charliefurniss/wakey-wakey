import React, { Component } from "react";
import "./app.css";

import TravelInformation from "./components/travel-information";

class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="app-content">
          <header>
            <h1>Wakey wakey</h1>
          </header>
          <main className="app-main">
            <TravelInformation />
          </main>
        </div>
      </div>
    );
  }
}

export default App;
