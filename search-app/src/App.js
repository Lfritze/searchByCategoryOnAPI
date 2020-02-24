import React from "react";
import Searcher from "./components/search";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={Searcher} />
      </Router>
    </div>
  );
}

export default App;
