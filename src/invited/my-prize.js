import React, {Component} from 'react';
import {Tabs, Badge} from 'antd-mobile';

import PrizeList from './components/prizeList/prizeList';
import PrizeAd from './components/prizeAd/prizeAd';


import noPic from '../assets/nothing.png';

import ad1 from '../assets/ad1.png';
import ad2 from '../assets/ad2.png';
import ad3 from '../assets/ad3.png';
import ad4 from '../assets/ad4.png';
// import giftData from '../assets/data.json';
// import prizeData from '../assets/data2.json';

import './my-prize.less';

// 空空如也
function Nothing(props) {
    const type = props.type;
    let link = '';
    switch (type) {
        case 'giftBag':
            link = <p>快去<a href="/invited/index">邀请好友</a>共同获得礼包吧！</p>
            break;
        case 'prize':
            link = <p><a href="/invited/index">快去抽奖吧！</a></p>
            break;
        default:
            link = <p></p>
    }
    return (
        <div className='nothing'>
            <img className='noPic' src={noPic} alt=""/>
            <p>空空如也</p>
            {link}
        </div>
    )
}

// 150元礼包内容
function GiftBag(props) {
    return (
        <div>
            <PrizeList data={props.data}></PrizeList>
            <PrizeAd title='电信惠民生活卡' imgs={[ad4]}></PrizeAd>
        </div>
    )
}

// 抽奖奖品
function PrizeDom(props) {
    return (
        <div>
            <PrizeList data={props.data}></PrizeList>
            <PrizeAd title='电信购机代金券' imgs={[ad1]}></PrizeAd>
            <PrizeAd title='机场安检通道卡' imgs={[ad2, ad3]}></PrizeAd>
        </div>
    )
}

class Index extends Component {
    constructor() {
        super();
        this.state = {
            tabs: [
                {title: <Badge>150元礼包</Badge>},
                {title: <Badge>抽奖奖品</Badge>}
            ]
        }
    }

    // componentDidMount() {
    //     Toast.loading('loading', 0);
    // }

    render() {
        const tabs = this.state.tabs;
        const giftData = [];
        const prizeData = [];
        return (
            <div className='prize container-ljj'>
                <h3 className='nav-title'>我的奖品</h3>
                <Tabs tabs={tabs}>
                    {(giftData.length > 0) ?
                        <GiftBag data={giftData}></GiftBag>
                        :
                        <Nothing type='giftBag'></Nothing>
                    }
                    {(prizeData.length > 0) ?
                        <PrizeDom data={prizeData}></PrizeDom>
                        :
                        <Nothing type='prize'></Nothing>
                    }
                </Tabs>
            </div>
        );
    }
}

export default Index;