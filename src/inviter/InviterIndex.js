import React, {Component} from 'react'
import Lottery from './Lottery'
import './Index.css'
import titleText from '../assets/title_text.png'
import viewList from '../assets/view_list.png'
import jingli from '../assets/jingli.png'
import { Button,ActivityIndicator,Modal } from 'antd-mobile';
import {
    Link
} from 'react-router-dom'
import configuredAxios from '../ConfiguredAxios'
import Tools from '../tools'


class InviterIndex extends Component {

    phoneNumberFromApp = '18681807016';

    prize = {
        "id": "",
        "mobile": "",
        "type": 0,
        "rewardSerial": "",
        "rewardContent": "",
        "createAt": 0,
        "updateAt": 0
    }

    constructor(props) {
        super(props)

        this.state = {
            animating : false,
            showPrizewinning:false
        }

    }

    componentWillMount() {
    }

    componentDidMount() {
        if(process.env.NODE_ENV != 'development'){
            this.phoneNumberFromApp = Tools.getUrlParam("phoneNumber");
        }
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
                <Lottery className='inviter_index_lottery' onLotteryClick={this.onLotteryClick}/>
                <img class="view_list_img" src={viewList} onClick={this.toLotteryList}/>
                <img class="jingli_img" src={jingli}/>
                <p class="inviter_index_tips">11月9日-11月11日每天都能抽一次奖</p>
                <p class="inviter_index_tips">100%中奖！延长壳牌加油券 ,西安咸阳机场头等舱通道，手机代金券应有尽有 </p>
                <Button className="inviter_index_button" onClick={this.onClickGiftBag}>领取200元礼包</Button>

                <ActivityIndicator
                    toast
                    text="正在为您抽奖请等候..."
                    animating={this.state.animating}
                />


                <Modal
                    visible={this.state.showPrizewinning}
                    transparent
                    maskClosable={false}
                    title="恭喜中奖"
                    footer={[{ text: '我知道啦', onPress: () => {this.setState({showPrizewinning:false}); } }]}
                    wrapProps={{ }}
                >
                    <div className="Prizewinning">
                        <p>您已获得:{this.prize.rewardContent},奖品将于活动结束后(11月12日)发放到您的账户中</p>
                    </div>
                </Modal>

            </div>
        )
    }

    toLotteryList = ()=>{
        this.props.history.push('/invited/prize/'+this.phoneNumberFromApp)
    }

    onLotteryClick = ()=>{
        this.setState({animating:true})
        this.doLottery();
    }

    doLottery(){
        let param = {
            mobile:this.phoneNumberFromApp
        }
        let url = '/winstar-api/api/v1/activity/noauth/doubleElvenSharing/lottery'
        configuredAxios.doPost(url,param,false).then((data)=>{
            this.setState({animating:false});
            this.showPrizewinning(data);
        }).catch((error)=>{
            this.setState({animating:false});
        })
    }

    showPrizewinning(data){
        this.prize = {...data}
        this.setState({showPrizewinning:true});
    }

    onClickGiftBag = ()=>{
        this.props.history.push('/inviter/inviter/'+this.phoneNumberFromApp)
    }

}

export default InviterIndex;
