import React, {Component} from 'react';
import {HashRouter as Router, Route} from 'react-router-dom'
import HomePage from './pages/homePage/homePage';
import OilCard from './pages/oilCard/oilCard';
import Receive from './pages/receive/index';
import Already from './pages/receive/already';
import No from './pages/receive/no';
import getToken from './getToken';

class App extends Component {

    constructor(props) {
        super(props);
    }

    initData = () => {
        if (!localStorage.getItem('tokenId')) {
            this.token();
        }
    }

    //获取token
    token = () => {
        getToken.token().then((tokenData) => {
        })
    };

    componentDidMount() {
        this.initData();
    }

    render() {
        return (
            <Router>
                <div className="App">
                    <Route path="/homePage" component={HomePage}/>
                    <Route path="/oilCard" component={OilCard}/>
                    <Route path="/receive/:orderId" component={Receive}/>
                    <Route path="/already" component={Already}/>
                    <Route path="/no" component={No}/>
                </div>
            </Router>
        );
    }
}

export default App;
