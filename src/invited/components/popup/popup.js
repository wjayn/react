// 活动暂未开放
import React, {Component} from "react";
import {Modal} from 'antd-mobile';

class Popup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal1: this.props.modal1
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
                    {this.props.children}
                </Modal>
            </div>
        )
    }
}

export default Popup;