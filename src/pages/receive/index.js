import React, {Component} from 'react';
import Receive from './receive';
import Already from './already';
import no from './no';
import './index.css'

class ReceiveIndex extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: 0 // 判断当前优惠券的领取状态，0-》未领取，1-》已领取。2-》已领完
        }
    }

    componentDidMount() {
    }

    render() {
        let htmlType = null;
        if(this.state.status === 0){
            htmlType = <Receive></Receive>
        }
        return (
            <div className='container-ljj'>

            </div>
        )
    }
}

export default ReceiveIndex;