import React, {Component} from 'react';
import {Toast, Modal} from 'antd-mobile';
import BindPhone from './components/bindPhone/bindPhone';
import End from './end';

import 'antd-mobile/dist/antd-mobile.css';
import './index.less';

// 活动结束
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
function ShowContent(props) {
    const activeStatus = props.activeStatus;
    const modal1 = true;
    switch (activeStatus) {
        case 'end':
            return <ActiveEnd modal1={modal1}/>;
            break;
        case 'start':
            return <BindPhone/>;
            break;
        default:
            return <End></End>
    }
}

class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeStatus: 'start'
        }
    }

    componentWillMount() {
    }

    componentDidMount() {
        // Toast.loading('请稍后...', 0);
    }

    render() {
        return (
            <div className='index'>
                <ShowContent activeStatus={this.state.activeStatus}/>
            </div>
        )
    }
}

export default Index;
