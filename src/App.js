import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom'
import './App.css';
import Index from "./invited/Index";
import QRCode from "./invited/QR-code";
import End from "./invited/end";
import MyPrize from './invited/my-prize';
import InviterIndex from "./inviter/InviterIndex"

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <Route exact path="/" component={InviterIndex}/>
                    <Route path="/invited/index" component={Index}/>
                    <Route path="/invited/QRCode" component={QRCode}/>
                    <Route path="/invited/end" component={End}/>
                    <Route path="/invited/prize" component={MyPrize}/>
                    <Route path="/inviter/index" component={InviterIndex}/>
                </div>
            </Router>
        );
    }
}
export default App;
