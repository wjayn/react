import React, {Component} from 'react';
import {Modal} from 'antd-mobile';
import BindPhone from './components/bindPhone/bindPhone';

import ad from '../assets/ad.png';

import 'antd-mobile/dist/antd-mobile.css';
import './index.less';

// 活动暂未开放
class ActiveEnd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal1: true
        };
    }

    onClose = key => () => {
        this.setState({
            [key]: false,
        });
    }

    render() {
        return (
            <div>
                <Modal
                    visible={this.state.modal1} transparent title="活动已结束"
                    footer={[{
                        text: '确定', onPress: () => {
                            this.onClose('modal1')();
                        }
                    }]} wrapClassName='index-custom-wrap'>
                    <div className='text-content'>
                        <p>加入优驾行，我和你都将获得</p>
                        <p>150元大礼包一份！</p>
                        <p>下载优驾行APP，88折加油享不停！</p>
                    </div>
                </Modal>
            </div>
        )
    }
}

// 控制显示
// function ShowContent(props) {
//     const activeStatus = props.activeStatus;
//     const modal1 = true;
//     switch (activeStatus) {
//         case 'end':
//             return <ActiveEnd modal1={modal1}/>;
//             break;
//         case 'start':
//             return <BindPhone/>;
//             break;
//         default:
//             return <End></End>
//     }
// }

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

    render() {
        return (
            <div className='index container-ljj'>
                <div className='title'>
                    <p>加入优驾行，我和你都将获得</p>
                    <p>150元大礼包一份！</p>
                </div>
                <BindPhone/>
                <div className='desc'>
                    <p>11月9日——11月11日期间，通过该页面注册优驾行，您和邀请您的好友都可免费领取价值150元的优驾行大礼包一份，内含50元购油代金券、包邮并免费使用电信惠民生活卡一个月、惠民补贴等多重惊喜。</p>
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
