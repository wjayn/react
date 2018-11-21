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
                    <BindPhone></BindPhone>
                </div>
            </div>
        )
    }
}

export default receive;