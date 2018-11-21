import React, {Component} from 'react';
import Receive from './receive';
import Already from './already';
import No from './no';
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
        switch(this.state.status){
            case 0:
                htmlType = <Receive></Receive>;
                break;
            case 1:
                htmlType = <Already></Already>;
                break;
            default:
                htmlType = <No></No>;
        }
        return (
            <div className='container-ljj'>
                {htmlType}
            </div>
        )
    }
}

export default ReceiveIndex;