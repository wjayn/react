import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {PullToRefresh, Toast, Tabs, Badge} from 'antd-mobile';
import configuredAxios from '../ConfiguredAxios';
import giftTemplateData from '../assets/data2';
import {prizeListUrl} from './apiUrl';

import PrizeList from './components/prizeList/prizeList';
import PrizeAd from './components/prizeAd/prizeAd';

import noPic from '../assets/nothing.png';

import './my-prize.less';

// 空空如也
function Nothing(props) {
    const type = props.type;
    let link = '';
    switch (type) {
        case 'giftBag':
            link = <p>快去<Link to={`/inviter/inviter/${props.phone}`}>邀请好友</Link>
                共同获得礼包吧！</p>
            break;
        case 'prize':
            link = <p><Link to={`/inviter/index/${props.phone}`}>快去抽奖吧！</Link></p>
            break;
        default:
            link = <p></p>
    }
    return (
        <div className='nothing'>
            <img className='noPic' src={noPic} alt=""/>
            <p>空空如也!</p>
            {link}
        </div>
    )
}

// 200元礼包内容
function GiftBag(props) {
    let lifeData = [{
        rewardSerial: "99_600",
        href: 'http://activity.tylmw.cn/DXWeb/findActivityDxActivityInfoAction.action?activity=26&dt='
    }];
    let nothingDom = null,
        prizeListDom = null,
        prizeAdDom = null;
    if (props.giftData.length > 0) {
        prizeListDom = <PrizeList data={props.giftData}></PrizeList>
        prizeAdDom = <PrizeAd title='电信惠民生活卡' data={lifeData}></PrizeAd>
    } else {
        nothingDom = <Nothing type='giftBag' phone={props.phone}/>
    }
    return (
        <div>
            {prizeListDom}
            {prizeAdDom}
            {nothingDom}
        </div>
    )
}

// 抽奖奖品
function PrizeDom(props) {
    let nothingDom = null,
        prizeListDom = null,
        prizeAdDXDom = null,
        prizeAdJCDom = null;
    if ((props.prizeData.length === 0) && (props.telecomData.length === 0) && (props.telecomData.length === 0)) {
        nothingDom = <Nothing type='prize' phone={props.phone}/>;
    } else {
        if (props.prizeData.length > 0) {
            prizeListDom = <PrizeList data={props.prizeData}></PrizeList>;
        }
        if (props.telecomData.length > 0) {
            prizeAdDXDom = <PrizeAd title='电信购机代金券' data={props.telecomData}></PrizeAd>;
        }
        if (props.airportData.length > 0) {
            prizeAdJCDom = <PrizeAd title='机场安检通道卡' data={props.airportData}></PrizeAd>;
        }
    }

    return (
        <div>
            {nothingDom}
            {prizeListDom}
            {prizeAdDXDom}
            {prizeAdJCDom}
        </div>
    )
}

class Index extends Component {
    constructor() {
        super();
        this.state = {
            tabs: [
                {title: <Badge>200元礼包</Badge>},
                {title: <Badge>抽奖奖品</Badge>}
            ],
            airport: [], // 机场安检通道卡
            telecom: [], // 电信购机代金券
            prizeData: [], // 抽奖奖品列表
            giftBagData: [] // 200元礼包列表
        }
    }

    componentDidMount() {
        Toast.loading('请稍后...', 0);
        this.getListData();
    }

    render() {
        const tabs = this.state.tabs;
        const prizeData = this.state.prizeData;
        const airportData = this.state.airport;
        const giftData = this.state.giftBagData;
        const telecomData = this.state.telecom;
        return (
            <PullToRefresh className='prize container-ljj' onRefresh={this.getListData}>
                <h3 className='nav-title'>我的奖品</h3>
                <Tabs tabs={tabs} className='demo'>
                    <GiftBag giftData={giftData} phone={this.props.match.params.phone}></GiftBag>
                    <PrizeDom prizeData={prizeData} airportData={airportData}
                              telecomData={telecomData} phone={this.props.match.params.phone}></PrizeDom>
                </Tabs>
            </PullToRefresh>
        );
    }

    //  获得列表数据
    getListData = () => {
        configuredAxios.doGet(prizeListUrl, {mobile: this.props.match.params.phone}).then(res => {
            Toast.hide();
            let data = res;
            let lotteryRewardList = data.lotteryRewardList;
            let sharingRewardList = data.sharingRewardList;

            if (lotteryRewardList.length > 0) {
                listPrizeL(lotteryRewardList);
            }

            if (sharingRewardList.length > 0) {
                list200(sharingRewardList);
            }
        })

        //  生成200元礼包列表数据 == 如果用户有200元大礼包，则使用礼包数据模版，因为代金券是固定的
        let list200 = (sharingRewardList) => {
            const validityTime = formatDate(sharingRewardList[0].updateAt);
            giftTemplateData.map((item) => {
                item.validityTime = validityTime;
            })
            this.setState({
                giftBagData: giftTemplateData
            })
        }

        //  生成抽奖奖品列表数据
        let listPrizeL = (lotteryRewardList) => {
            let airport = []; // 机场安检通道卡
            let telecom = []; // 电信购机代金券
            let prizeData = []; // 抽奖奖品列表
            lotteryRewardList.map((item) => {
                item.validityTime = formatDate(item.updateAt);
                switch (item.rewardSerial) {
                    case "99_999_BI":
                    case "1_190":
                        airport.push(item);
                        break;
                    case "388_600":
                        telecom.push(item);
                        break;
                    default:
                        prizeData.push(item);
                }
            })
            this.setState({
                airport,
                telecom,
                prizeData
            })
        }

    }
}

// 格式化日期
function formatDate(str) {
    let date = new Date(str);
    let y = date.getFullYear();
    let m = formatNum(date.getMonth());
    let d = formatNum(date.getDay());

    function formatNum(num) {
        if (num < 10) {
            return '0' + num;
        }
        return num;
    }

    return y + "-" + m + "-" + d;
}

export default Index;