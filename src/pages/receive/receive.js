import React, {Component} from 'react';
import BindPhone from '../../components/bindPhone/bindPhone';

import top from '../../assets/image/receive-top.png';

import './receive.css';

class receive extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className='receive'>
                <img src={top} alt="" className='top'/>
                <div className='info-wrap'>
                    <div className='box'>
                        <BindPhone caption='送您一张5元加油优惠券' borderClass='border-all'></BindPhone>
                        <p className='title ac'>活动支持。。。。</p>
                        <dl className='text-box'>
                            <dt className='ac'><span>qqq</span></dt>
                            <dd>qq</dd>
                            <dd>qq</dd>
                            <dd>qq</dd>
                            <dd>qq</dd>
                        </dl>
                    </div>
                </div>
            </div>
        )
    }
}

export default receive;