import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom'
import './App.css';
import Index from "./invited/Index";
import InviterIndex from "./inviter/InviterIndex"

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route path="/invited/index" component={Index}/>
                    <Route path="/inviter/index" component={InviterIndex}/>
                </div>
            </Router>
        );
    }
}
export default App;
