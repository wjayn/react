import React, {Component} from 'react';
import {HashRouter as Router, Route, Redirect} from 'react-router-dom'

import getToken from './getToken';
// import fx from './fx';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: false
        }
    }

    initData = () => {
        if (localStorage.getItem('token_id')) {
            // fx.toShareBack();
        } else {
            this.token();
        }
    }
    //获取token
    token = () => {
        getToken.token()
            .then((tokenData) => {
                localStorage.setItem('token_id', tokenData.tokenId);
                if (tokenData) {
                    //分享
                    // fx.toShareBack();
                }
            })
    };

    componentDidMount() {
        this.initData();
    }

    render() {
        return (
            <Router>
                <div className="App">
                    {/*
                     <Route path="/" component={InviterIndex}/>
                     <Route path="/invited/index/:phone" component={Index}/>
                     */}
                    {this.state.status && <Redirect to={`/invited/end`}/>}
                </div>
            </Router>
        );
    }
}

export default App;
