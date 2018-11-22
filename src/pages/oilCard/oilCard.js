import React, {Component} from 'react'
import {Grid} from 'antd-mobile'
import './oilCard.less'
import oilCardBanner from '../../assets/image/oilCard-banner.png'
import oilCardBtn from '../../assets/image/observeCouponBtn.png'
import Discount from '../../assets/image/discountSelcted.png'
import BuyBtn from '../../assets/image/oilCardBuyBtn.png'

const data = [{'title':1},{'title':2},{'title':3},{'title':4},{'title':5},{'title':6},{'title':6}]

class oilCard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedIndex: 0,
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
        const SelectedItem =(props) => {
            return(
                <div className='selectedItem oilCard-oilItem'>
                    <img className='discountImage' src={Discount} alt=""/>
                    <div className='oilCard-originalPrice'>300元</div>
                    <div className='oicCard-salePrice'>售价:270:00元</div>
                </div>
            )
        };
        const NormalItem =(props) => {
            return(
                <div className='normalItem oilCard-oilItem'>
                    <div className='oilCard-originalPrice'>300元</div>
                    <div className='oicCard-salePrice'>售价:270:00元</div>
                </div>
            )
        };
        return (
            <div className='oilCard-root'>
                <img className='oilCard-banner' src={oilCardBanner} alt=""/>
                <div className='observeCouponDiv'>
                    <img className='oilCouponBtn' src={oilCardBtn} alt="" onClick={this.observeCouponClick}/>
                </div>
                <div className='chooseCouponTitle oilCard-padding'>
                  请选择油券
                </div>
                <div className='oilCard-padding oicCardItemDiv'>
                    <Grid
                        data={data}
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
                            this.oilItemClick(item,index)
                        }}
                    />
                </div>
                <div className='oilCard-line'/>
                <div className='oilCard-padding oilCard-introduction'>
                    <p className='introduction-title'>使用规则：</p>
                    <p>1.本电子油券仅限汽油品类并长期有效。</p>
                    <p>2.本电子油券是不记名券，不挂失，不退换，本服务不与延长壳牌活动叠加使用。</p>
                    <p>3.电子油券以一百元为单位，不找零不兑现。</p>
                    <p>4.加油券以电子油券的形式在优驾行easy“加油券”-“查看我的加油券”中显示，使用时在陕西省境内延长壳牌加油站车队卡收银系统中输入电子码或扫二维码即可。</p>
                    <p>5.如有电子油券使用问题，请联系我们的官方免费客服热线400-8012122（工作日：09:00-18:00），我们会第一时间为您解决。</p>
                </div>
                <img className='oicCard-buyBtn' src={BuyBtn} alt=""/>
            </div>
        )
    }
    observeCouponClick = () => {
        alert('查看我的加油券')
    }
    oilItemClick = (item, index) => {
        this.setState({
            selectedIndex: index,
        })
    }
}

export default oilCard;