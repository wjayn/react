import React, {Component} from 'react';

import './end.less';

import EndPic from '../assets/end.png';

class End extends Component {
    render() {
        return (
            <div className='end container-ljj'>
                <img src={EndPic} alt="活动已结束"/>
                <p>活动已结束!</p>
            </div>
        );
    }
}

export default End;