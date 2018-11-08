import React, {Component} from 'react';
import BindPhone from './components/bindPhone/bindPhone';

import ad from '../assets/ad.png';

import 'antd-mobile/dist/antd-mobile.css';
import './index.less';

class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeStatus: 'start',
            verifyPic: ''
        }
    }

    componentDidMount() {
    }

    skipQRCode = () => {
        this.props.history.push('/invited/QRCode');
    }

    render() {
        return (
            <div className='index container-ljj'>
                <div className='title'>
                    <p>加入优驾行，我和你都将获得</p>
                    <p>200元大礼包一份！</p>
                </div>
                <BindPhone onSkipQRCode={this.skipQRCode} inviteAccount={this.props.match.params.phone}/>
                <div className='desc'>
                    <p>11月9日——11月11日期间，通过该页面注册优驾行，您和邀请您的好友都可免费领取价值200元的优驾行大礼包一份，内含50元购油代金券、包邮并免费使用电信惠民生活卡三个月、惠民补贴等多重惊喜。</p>
                    <p>同时优驾行APP还有还有100%中奖的抽奖，延长壳牌加油券、西安咸阳机场头等舱通道，手机代金券等等应有尽有。</p>
                </div>
                <div className='ad'>
                    <img src={ad} alt=""/>
                </div>
            </div>
        )
    }
}

export default Index;
