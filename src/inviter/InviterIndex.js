import React, {Component} from 'react'
import Lottery from './Lottery'
import './Index.css'
import titleText from '../assets/title_text.png'
import viewList from '../assets/view_list.png'
import jingli from '../assets/jingli.png'
import { Button } from 'antd-mobile';
import {
    Link
} from 'react-router-dom'

class InviterIndex extends Component {


    constructor(props) {
        super(props)
        this.state = {

        }
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
            <div class="inviter_index_container" >
                <img class="title_text_img" src={titleText} />
                <Lottery className='inviter_index_lottery'/>
                <li><Link to="/prize/prizeList"><img class="view_list_img" src={viewList} /></Link></li>
                <img class="jingli_img" src={jingli}/>
                <p class="inviter_index_tips">11月9日-11月11日每天都能抽一次奖</p>
                <p class="inviter_index_tips">100%中奖！延长壳牌加油券 ,西安咸阳机场头等舱通道，手机代金券应有尽有 </p>
                <Button className="inviter_index_button">领取150元礼包</Button>
            </div>
        )
    }

}

export default InviterIndex;
