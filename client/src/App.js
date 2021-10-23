import React from 'react';
import 'react-bootstrap/dist/react-bootstrap.min.js';
import Modal from 'react-modal';
import { NavBar } from './Components/NavBar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// import signUp from './Components/Locations';
import HighPoint from './Components/HighPoint'
import Home from './Components/Home'
import StnMtn from './Components/StnMtn'
import Hewatt from './Components/Hewatt'
import MyEvents from './Components/MyEvents';

Modal.setAppElement('#root');

function App() {
  return (
  <Router>
   <div>
<NavBar />
    <div className="schedule">
<Switch>
  <Route exact path='/' component={Home}></Route>
  <Route path='/locations/HighPoint_Rd'component={HighPoint}></Route>
  {/* <Route path="/locations/Stn_Mtn_Park_and_Ride" render={() => <Location location_url="Stone Mountain P&R" />} />
  <Route path="/locations/Hewatt_Park_and_Ride" render={() => <Location location_url="Hewatt Road" />} /> */}
  <Route path='/locations/Stn_Mtn_Park_and_Ride'component={StnMtn}></Route>
  <Route path='/locations/Hewatt_Park_and_Ride' component={Hewatt}></Route>
  <Route path='/locations/myEvents' component={MyEvents}></Route>
  {/* <Route path='/calendar' component={Calendar}></Route> */}
</Switch>

  </div>
  </div>
  
  </Router>
   
  );
}

export default App;
