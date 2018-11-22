import React, {Component} from 'react'
import {Button} from 'antd-mobile'
import './homePage.less'
import topBgImage from '../../assets/image/homePage-top.png'

class homePage extends Component {


    constructor(props) {
        super(props)
        this.state = {
            activityIsOpen: true,
            openDay: 5,
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
            <div className='homePage-root'>
                <img className='homePage-topImage' src={topBgImage} alt=""/>
                {this.state.activityIsOpen ?
                    <div className='activityBgDiv'>
                       <div className='homePage-activityBtn openBtn' onClick={this.joinActivityClick}>立即参与</div>
                    </div>
                    :
                    <div className='activityBgDiv'>
                        <div className='homePage-openDay'>距离动活开放还有 {this.state.openDay} 天</div>
                        <div className='homePage-activityBtn notOpenBtn'>活动暂未开放</div>
                    </div>
                }
                <div className='homePage-line homePage-padding'/>
                <div className='homePage-padding introduceTitle'>
                    <div className='introduce-line leftLine' />
                    <div className='introduceText'>活动介绍</div>
                    <div className='introduce-line rightLine'/>
                </div>
                <div className='homePage-padding introduce-contenDiv'>
                    <p>1、每周六可9折购买300元加油券，即270元就可以买到300元的油券；</p>
                    <p>2、“周末品牌日”油券不叠加使用其他优惠券；</p>
                    <p>3、每个“周末品牌日”期间，每个微信用户限购买1次；</p>
                    <p>4、购买成功后，可与好友分享领优惠券，您和您的好友都可领取“满300减5元的红包”可与微信96折购油活动叠加，每次分享优惠券仅限10人领取，一个订单仅可使用一张优惠券（优惠券不支持“周末品牌日”使用）。</p>
                </div>
            </div>
        )
    }
    joinActivityClick = () => {
        alert('参与活动')
    }
}

export default homePage;