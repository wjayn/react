import React, {Component} from 'react';

import top from '../../assets/image/already-top.png';
import topAlready from '../../assets/image/already-top2.jpg';
import use from '../../assets/image/already-use.png';
import QRcode from '../../assets/image/already-code.png';

import './already.css'
import Tool from "../../tools";

class Already extends Component {
    constructor(props) {
        super(props)
        this.state = {
            received: false
        }
    }

    componentDidMount() {
        let received = Tool.getParams(this.props.location.search, 'received');
        received = received && received === 'alreadyReceived';
        this.setState({
            received
        })
    }

    render() {
        let useUrl = '', textPrompt = '';
        if(localStorage.getItem('isApp') === "1"){
            useUrl = "https://mobile.sxwinstar.net/app/index.html";
            textPrompt = "优驾行App";
        }else if(localStorage.getItem('isApp') === "0"){
            useUrl = "https://mobile.sxwinstar.net/ccb/web/#/user/discount";
            textPrompt = "优驾行公众号";
        }
        return (
            <div className='already'>
                <div className='top'>
                    {this.state.received ?
                        <img src={topAlready} alt=""/>
                        :
                        <img src={top} alt=""/>
                    }
                    <a href={useUrl}><img src={use} alt="" className='use'/></a>
                </div>
                <img src={QRcode} alt="" className='QR-code'/>
                <p className='ac'><span className='arrow'></span></p>
                <div className='text'>
                    <p>优惠券已发放至您的{textPrompt}账户</p>
                    <p>进入{textPrompt}使用优惠券</p>
                </div>
            </div>
        )
    }
}

export default Already;