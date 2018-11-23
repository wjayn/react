import React, {Component} from 'react';
import {Modal} from 'antd-mobile';
import BindPhone from '../../components/bindPhone/bindPhone';
import configuredAxios from '../../ConfiguredAxios';

import './homePage.less';
import topBgImage from '../../assets/image/homePage-top.png';

const apiUrl = {
    statusUrl: 'winstar-api/api/v1/orders/weekendBrand/judgeOpen',
    bindPhoneUrl: '/ccb-api/api/v1/cbc/auth/updateMobile',
    judgeBindPhoneUrl: '/ccb-api/api/v1/cbc/auth/isBindMobile'
}

class homePage extends Component {
    initData = () => {
        if (localStorage.getItem('tokenId')) {
            this.getActiveStatus();
            this.judgeBindPhone();
        } else {
            setTimeout(this.initData, 1000);
        }
    }
    // 判断当前openid是否绑定手机号
    judgeBindPhone = () => {
        configuredAxios.doPost(apiUrl.judgeBindPhoneUrl, {}, false, {
            headers: {
                "token_id": localStorage.getItem('tokenId')
            }
        }).then((res) => {
            // 0未绑定，1已绑定
            console.log("返回结果")
            console.log(res)
            let isBindPhone = (res === 1) ? true : false;
            this.setState({
                isBindPhone
            })
        }).catch(() => {
        })
    }
    // 立即参与 按钮点击
    joinActivityClick = () => {
        // 当前用户已经绑定过手机号，直接跳转订单页面，否则，弹出绑定手机号弹窗
        if (this.state.isBindPhone) {
            this.props.history.push('/oilCard');
        } else {
            this.setState({
                isModal: true
            })
        }
    }
    // 绑定手机号码
    bindPhoneApi = (params) => {
        configuredAxios.doPost(apiUrl.bindPhoneUrl, {data: JSON.stringify(params)}, true,{
            headers: {
                "token_id": localStorage.getItem('tokenId')
            }
        }).then(() => {
            // 跳转到订单页面
            this.props.history.push('/oilCard');
        }).catch(() => {
        });

    }

    // 获取当前活动状态
    getActiveStatus = () => {
        configuredAxios.doGet(apiUrl.statusUrl, {}, {
            headers: {
                "token_id": localStorage.getItem('tokenId')
            }
        }).then((res) => {
            this.setState({
                openDay: res.differDay,
                activityIsOpen: res.state
            })
        })
    }

    constructor(props) {
        super(props)
        this.state = {
            activityIsOpen: false, // 活动是否开启
            openDay: 0, // 距离活动的开始剩余天数
            isModal: true,// 是否显示绑定手机号弹窗
            isBindPhone: false // 当前openid是否绑定过手机号
        }
    }

    // 关闭绑定按钮
    onClose = () => {
        this.setState({
            isModal: false
        })
    }

    componentDidMount() {
        this.initData();
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
                        {this.state.openDay > 0 &&
                        <div className='homePage-openDay'>距离动活开放还有 {this.state.openDay} 天</div>}
                        <div className='homePage-activityBtn notOpenBtn'>活动暂未开放</div>
                    </div>
                }
                <div className='homePage-line homePage-padding'/>
                <div className='homePage-padding introduceTitle'>
                    <div className='introduce-line leftLine'/>
                    <div className='introduceText'>活动介绍</div>
                    <div className='introduce-line rightLine'/>
                </div>
                <div className='homePage-padding introduce-contenDiv'>
                    <dl className='text-box'>
                        <dd className='flex'>
                            <span>1、</span>
                            <span>每周六可9折购买300元加油券，即270元就可以买到300元的油券；</span>
                        </dd>
                        <dd className='flex'>
                            <span>2、</span>
                            <span>“周末品牌日”油券不叠加使用其他优惠券；</span>
                        </dd>
                        <dd className='flex'>
                            <span>3、</span>
                            <span>每个“周末品牌日”期间，每个微信用户限购买1次；</span>
                        </dd>
                        <dd className='flex'>
                            <span>4、</span>
                            <span>购买成功后，可与好友分享领优惠券，您和您的好友都可领取“满300减5元的红包”可与微信96折购油活动叠加，每次分享优惠券仅限10人领取，一个订单仅可使用一张优惠券（优惠券不支持“周末品牌日”使用）。</span>
                        </dd>
                    </dl>
                </div>
                {/*  绑定手机号弹窗  */}
                <Modal className='homePage-modal' visible={this.state.isModal} transparent>
                    <BindPhone caption='绑定手机号参与活动' btnText='绑定手机号' onBtnClick={this.bindPhoneApi}></BindPhone>
                    <div className='close-modal' onClick={this.onClose}></div>
                </Modal>
            </div>
        )
    }
}

export default homePage;