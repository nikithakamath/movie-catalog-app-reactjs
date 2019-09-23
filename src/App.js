import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import HomePage from './HomePage/HomePage';
import MovieDetails from './MovieDetails/MovieDetails';
import { Navbar } from './_components/navbar'

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{paddingTop: '80px'}}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/movie/:movie_id" component={MovieDetails} />
          <Redirect to="/"/>
        </Switch>
        </div>
    </Router>
  );
}

export default App;