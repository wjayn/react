import React, {Component} from 'react'
import {Button} from 'antd-mobile'
import './Invite.css'
import bag from '../assets/bag.png'

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

        let style = {
            border: 'solid 1px red'
        }

        return (
            <div class="invite_container">
                <p class="invite_tips01">邀请好友，您跟好友都可免费领取</p>
                <p class="invite_tips02">150元优驾行大礼包</p>
                <p class="invite_tips03">150元优驾行大礼包</p>
                <div class='invite_href'>
                <a href="/inviter/index">活动细则</a></div>
                <img className="invite_bag_img" src={bag}/>
                <Button className='invite_button_01' inline='true'>邀请好友赢取礼包</Button>
                <Button className='invite_button_02' style={style} inline='true'>领取礼包</Button>
            </div>
        )
    }
}

export default Invite;
