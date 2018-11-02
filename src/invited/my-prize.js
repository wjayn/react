import React, {Component} from 'react';
import {Flex, Tabs, Badge} from 'antd-mobile';

import backY from './img/back-y.png';
import backB from './img/back-b.png';
import noPic from './img/nothing.png';
import giftData from './img/data.json';

import './my-prize.less';

// 空空如也
function nothing(props) {
    const type = props.type;
    let link = '';
    switch (type) {
        case 'giftBag':
            link = <p>快去<a href="">邀请好友</a>共同获得礼包吧！</p>
            break;
        case 'prize':
            link = <p><a href="">快去抽奖吧！</a></p>
            break;
    }
    return (
        <div className='nothing'>
            <img src={noPic} alt=""/>
            <p>空空如也</p>
            {link}
        </div>
    )
}

// 150元礼包
function GiftBag(props) {
    const listData = props.data;

    const listItems = listData.map((item, index) => {
        const textContentClass = (index === 0) ? 'yellow' : 'blue';
        return (<li>
            {(index === 0) ? (
                <img src={backY} alt=""/>
            ) : (
                <img src={backB} alt=""/>
            )}

            <Flex className='text-content '>
                <div className='left'>
                    <p>¥<span>{item.price}</span>元</p>
                </div>
                <p className='border-1px-v'></p>
                <div className='right'>
                    <p>{item.title}</p>
                    <p>有效期至{item.date}</p>
                </div>
            </Flex>
            {item.remark &&
            <p>{item.remark}</p>
            }
        </li>)
    })
    return (
        <div className='list-wrap'>
            <h5 className='caption'>
                <p>
                    <span className='border-1px-h'></span>购油代金券<span className='border-1px-h'></span>
                </p>
            </h5>
            <ul>{listItems}</ul>
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

    render() {
        const tabs = this.state.tabs;
        return (
            <div className='prize container-ljj'>
                <h3 className='nav-title'>我的奖品</h3>
                <Tabs tabs={tabs}>
                    <GiftBag data={giftData}></GiftBag>
                    <div>抽奖奖品</div>
                </Tabs>
            </div>
        );
    }
}

export default Index;