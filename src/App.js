import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Redirect
} from 'react-router-dom'
import './App.css';
import Index from "./invited/Index";
import QRCode from "./invited/QR-code";
import End from "./invited/end";
import MyPrize from './invited/my-prize';
import InviterIndex from "./inviter/InviterIndex"
import configuredAxios from "./ConfiguredAxios";
import {activeStatusUrl} from "./invited/apiUrl";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: false
        }
    }

    componentDidMount() {
        this.ActiveStatus();
    }

    ActiveStatus = () => {
        configuredAxios.doGet(activeStatusUrl).then((res) => {
            if (res.data !== 'OK') {
                this.setState({
                    status: true
                })
            }
        })
    }

    render() {
        return (
            <Router>
                <div className="App">
                    <Route exact path="/" component={InviterIndex}/>
                    <Route path="/invited/index/:phone" component={Index}/>
                    <Route path="/invited/QRCode" component={QRCode}/>
                    <Route path="/invited/end" component={End}/>
                    <Route path="/invited/prize/:phone" component={MyPrize}/>
                    <Route path="/inviter/index" component={InviterIndex}/>
                    {this.state.status && <Redirect to={`/invited/end`}/>}
                </div>
            </Router>
        );
    }
}

export default App;
