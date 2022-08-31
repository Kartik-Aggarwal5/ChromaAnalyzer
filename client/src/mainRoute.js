import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./App";
import "./App.css";

function App() {
  return (
    <div className="wrapper">
      <h1>Marine Mammals</h1>
      <BrowserRouter>
        <Switch>
          <Route path="/">
            <App />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
