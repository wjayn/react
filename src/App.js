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
import PrizeList from './prize/PrizeList'
import Invite from './inviter/Invite'


class App extends Component {
    render() {
        return (
            <Router>
                <div class="App">
                    <Route exact path="/" component={Invite}/>
                    <Route path="/invited/index" component={Index}/>
                    <Route path="/invited/QRCode" component={QRCode}/>
                    <Route path="/invited/end" component={End}/>
                    <Route path="/invited/prize" component={MyPrize}/>
                    <Route path="/inviter/index" component={InviterIndex}/>
                    <Route path='/prize/prizeList' component={PrizeList}/>
                    <Route path='/inviter/invite' component={Invite}/>
                </div>
            </Router>
        );
    }
}
export default App;
