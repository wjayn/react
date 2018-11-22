import React, {Component} from 'react';

import top from '../../assets/image/already-top.png';
import use from '../../assets/image/already-use.png';
import QRcode from '../../assets/image/already-code.png';

import './already.css'

class Already extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className='already'>
                <div className='top'>
                    <img src={top} alt=""/>
                    <img src={use} alt="" className='use'/>
                </div>
                <img src={QRcode} alt="" className='QR-code'/>
                <p className='ac'><span className='arrow'></span></p>
                <div className='text'>
                    <p>优惠券已发放至您的优驾行账户</p>
                    <p>进入优驾行公众号使用优惠券</p>
                </div>
            </div>
        )
    }
}

export default Already;