import React, {Component} from 'react'
import {Button} from 'antd-mobile'
import './Invite.css'
import bag from '../assets/bag.png'
import close from '../assets/close.png'
import rule from '../assets/rule.png'
import  tools from '../tools'

class Invite extends Component {


    constructor(props) {
        super(props)
        this.state = {showTips:false}
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
                <p class="invite_tips01">邀请好友，你和好友都可免费领取</p>
                <p class="invite_tips02">200元优驾大礼包</p>
                <p class="invite_tips03">11月9日——11月11日期间，凡邀请好友成功注册优驾行APP的用户，你和注册好友都可免费领取价值200元的优驾行大礼包一份，内含50元购油代金券、包邮并免费使用电信惠民生活卡3个月，惠民补贴等多重惊喜。</p>
                <div class='invite_href'>
                    <span onClick={this.showTips} style={{'text-decoration':'underline'}}>活动细则</span></div>
                <img className="invite_bag_img" src={bag}/>
                <Button className='invite_button_01' inline='true' onClick={this.onInviteClick}>邀请好友赢取礼包</Button>
                <Button className='invite_button_02' style={style} inline='true' onClick={this.onGetBag}>领取礼包</Button>
                {this.tips()}
            </div>
        )
    }


    onInviteClick = ()=>{

        let baseUrl ;

        if (process.env.NODE_ENV === "qa"){
            baseUrl =  "http://wechat.sxeccellentdriving.com/finance/wr20181111/#";//测试包地址
        }else if(process.env.NODE_ENV === 'production'){
            baseUrl =  "https://mobile.sxwinstar.net";//线上包地址
        }else if(process.env.NODE_ENV === 'development'){
            baseUrl =  "";//开发地址
        }

        let url = baseUrl +  '/invited/index/'+this.props.match.params.phone

        tools.doAppShare(url)
    }

    onGetBag = ()=>{
        this.props.history.push('/invited/prize/'+this.props.match.params.phone)
    }

    showTips = ()=>{
        this.setState({showTips:true})
    }


    tips = ()=>{
        return (this.state.showTips && <div className="invite_tips_container">
            <div className="invite_tips_content">
                <h3 className="invite_tips_rule_title">抽全年免费加油!</h3>
                <img className="invite_tips_rule_img" src={rule}/>
                <p className="invite_activity_text">活动时间：11月9日——11月11日</p>
                <p className="invite_activity_text">{this.h1_text()}</p>
                <p className="invite_activity_text">{this.h2_text()}</p>
                <p className="invite_activity_text">{this.h3_text()}</p>
            </div>
            <div className="invite_tips_close_container" >
                <img className="invite_tips_close_img" src={close}  onClick={()=>{this.setState({showTips:false})}} />
            </div>
        </div>)
    }


    h1_text = ()=>{
        return tools.typeset('活动详情：活动期间，凡邀请好友成功注册优驾行APP的用户，你和注册好友都可免费领取价值200元的优驾行大礼包一份，内含50元购油代金券、包邮并免费使用电信惠民生活卡三个月、惠民补贴等多重惊喜');
    }

    h2_text = ()=>{
        return tools.typeset('同时，每天都能参与一次100%中奖的抽奖，锦鲤奖为：2019年，优驾行免费给你加一年油！中锦鲤奖用户绑定车牌后，优驾行为该车免费加一年延长壳牌的油。')
    }

    h3_text = ()=>{
        return tools.typeset('活动中所有奖品将于活动结束后（11月12日）发放至您的账户中，机场通道兑换码及手机购金券将以短信形式发送至您的手机，届时请注意查收。');
    }

}

export default Invite;
