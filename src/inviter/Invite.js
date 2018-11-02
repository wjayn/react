import React, {Component} from 'react'
import {Button} from 'antd-mobile'
import './Invite.css'

class Invite extends Component {


    constructor(props) {
        super(props)
        this.state = {}
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    componentDidShow() {
    }

    componentDidHide() {
    }

    render() {
        return (
            <div class="invite_container">
                <p class="invite_tips01">邀请好友，您跟好友都可免费领取</p>
                <p class="invite_tips02">150元优驾行大礼包</p>
            </div>
        )
    }
}

export default Invite;
