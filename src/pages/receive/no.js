import React, {Component} from 'react';

import top from '../../assets/image/no.png';
import bot from '../../assets/image/no-ico.png';

import './no.css';

class receiveNo extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className='no'>
                <div className='top'><img src={top} alt=""/></div>
                <p className='text ac'>优惠券已经被抢完了</p>
                <div className='bot ac'><img src={bot} alt="" /></div>
            </div>
        )
    }
}

export default receiveNo;