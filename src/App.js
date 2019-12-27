import React from 'react';
import M from "materialize-css";
import 'materialize-css/dist/css/materialize.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Cart from './components/Cart';


class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/cart" component={Cart} />
          </Switch>
        </div>
      </Router>
    )
  }
}


export default App;
