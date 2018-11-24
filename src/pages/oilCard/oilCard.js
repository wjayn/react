import React, {Component} from 'react'
import {Grid} from 'antd-mobile'
import {Redirect} from 'react-router-dom'
import configAxios from '../../ConfiguredAxios';
import './oilCard.less'
import oilCardBanner from '../../assets/image/oilCard-banner.png'
import oilCardBtn from '../../assets/image/observeCouponBtn.png'
import Discount from '../../assets/image/discountSelcted.png'
import BuyBtn from '../../assets/image/oilCardBuyBtn.png'
import getToken from '../../getToken'

import fx from '../../fx';

const apiUrl = {
    listUrl: 'ccb-api/api/v1/cbc/goods/query'
}

class oilCard extends Component {

    skipBuy = () => {
        let cur = this.state.listData[this.state.selectedIndex];
        window.location.href =  `https://mobile.sxwinstar.net/ccb/web/#/activity/payment?salePrice=${cur.saledPrice}&shopPrice=${cur.price}&activityId=${cur.type}&id=${cur.id}&backActivityTwo=one&disCount=${cur.disCount}`
    }

    // 获取商品列表
    getList = () => {
        configAxios.doGet(apiUrl.listUrl, {activityId: 203}, {
            headers: {
                "token_id": localStorage.getItem('ccbToken')
            }
        }).then((res) => {
            this.setState({listData: res});
        }).catch(() => {
        })
    }

    getDisplayPrice(itemData){
        return itemData.disCount * itemData.price;
    }

    oilItemClick = (item, index) => {
        this.setState({
            selectedIndex: index,
        })
    }

    constructor(props) {
        super(props)
        this.state = {
            selectedIndex: 0,
            listData: []
        }
    }

    componentDidMount() {
        this.getList();
        fx.judgeShareCondition(false);
    }


    getUrl(){
        console.log(process.env.NODE_ENV);
        if (process.env.NODE_ENV === "qa"){
            return "http://wechat.sxeccellentdriving.com/ccb/#/user/oilVouchers";//测试包地址
        }else if(process.env.NODE_ENV === 'production'){
            return "https://mobile.sxwinstar.net/ccb/web/#/user/orderForm";//线上包地址
        }else if(process.env.NODE_ENV === 'development'){
            return "";//开发地址
        }
        throw new Error(
            '未知环境错误'
        );
    }

    render() {
        const SelectedItem = (props) => {
            return (
                <div className='selectedItem oilCard-oilItem'>
                    <img className='discountImage' src={Discount} alt=""/>
                    <div className='oilCard-originalPrice'>{props.itemData.price}</div>
                    <div className='oicCard-salePrice'>售价{this.getDisplayPrice(props.itemData)}元</div>
                </div>
            )
        };
        const NormalItem = (props) => {
            return (
                <div className='normalItem oilCard-oilItem'>
                    <div className='oilCard-originalPrice'>{props.itemData.price}</div>
                    <div className='oicCard-salePrice'>售价{props.itemData.saledPrice}元</div>
                </div>
            )
        };
        const tokenId = localStorage.getItem("ccbToken");

        return (
            <div className='oilCard-root'>
                <div className='oilCard-wrap'>
                    <img className='oilCard-banner' src={oilCardBanner} alt=""/>
                    <div className='observeCouponDiv'>
                        <a className='oilCouponBtn' href={this.getUrl()}>
                            <img src={oilCardBtn} alt=""/>
                        </a>
                    </div>
                    <div className='chooseCouponTitle oilCard-padding'>
                        请选择油券
                    </div>
                    <div className='oilCard-padding oicCardItemDiv'>
                        <Grid
                            data={this.state.listData}
                            columnNum={3}
                            activeStyle={false}
                            square={false}
                            hasLine={false}
                            renderItem={(item, index) => {
                                return (
                                    this.state.selectedIndex === index ?
                                        <SelectedItem itemData={item}/>
                                        :
                                        <NormalItem itemData={item}/>
                                );
                            }}
                            onClick={(item, index) => {
                                this.oilItemClick(item, index)
                            }}
                        />
                    </div>
                    <div className='oilCard-line'/>
                    <div className='oilCard-padding oilCard-introduction'>
                        <p className='introduction-title'>使用规则：</p>
                        <dl className='text-box'>
                            <dd className='flex'>
                                <span>1、</span>
                                <span>本电子油券仅限汽油品类并长期有效。</span>
                            </dd>
                            <dd className='flex'>
                                <span>2、</span>
                                <span>本电子油券是不记名券，不挂失，不退换，本服务不与延长壳牌活动叠加使用。</span>
                            </dd>
                            <dd className='flex'>
                                <span>3、</span>
                                <span>电子油券以一百元为单位，不找零不兑现。</span>
                            </dd>
                            <dd className='flex'>
                                <span>4、</span>
                                <span>加油券以电子油券的形式在优驾行公众号“客户中心—个人中心—我的加油券”中显示，使用时在陕西省境内延长壳牌加油站车队卡收银系统中输入电子码或扫二维码即可。</span>
                            </dd>
                            <dd className='flex'>
                                <span>5、</span>
                                <span>如有电子油券使用问题，请联系我们的官方免费客服热线400-8012122（工作日：09:00-18:00），我们会第一时间为您解决。</span>
                            </dd>
                        </dl>
                    </div>
                </div>
                <img className='oicCard-buyBtn' src={BuyBtn} alt="" onClick={this.skipBuy}/>

                {!tokenId && <Redirect to={`/homePage`}/>}
            </div>
        )
    }
}

export default oilCard;