import React, {Component} from 'react';

import './QR-code.less';
import Code from '../assets/code.png';

class Index extends Component {
    render() {
        return (
            <div className='QR-code container-ljj'>
                <div className='top shrink0'>
                    <p className='first'>价值200元优驾行大礼包</p>
                    <p className='second'>已放入您的优驾行APP账户中</p>
                    <p className='third'>内含油券、免费电话卡等...</p>
                </div>
                <div className='code'>
                    <img src={Code} alt="长按二维码享受更多优惠"/>
                    <p className='text'>长按二维码享受更多优惠</p>
                </div>
                <div className='bot shrink0'>
                    <p>下载优驾行APP前往领取</p>
                    <p>还有100%中奖的双十一心动抽奖等着你！</p>
                </div>
            </div>
        );
    }
}

export default Index;