import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom'
import './App.css';
import Index from "./invited/Index";
import InviterIndex from "./inviter/InviterIndex"
import PrizeList from './prize/PrizeList'


class App extends Component {
    render() {
        return (
            <Router>
                <div class="App">
                    <Route exact path="/" component={InviterIndex}/>
                    <Route path="/invited/index" component={Index}/>
                    <Route path='/prize/prizeList' component={PrizeList}/>
                </div>
            </Router>
        );
    }
}
export default App;
