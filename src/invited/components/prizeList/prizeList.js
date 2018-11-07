import React, {Component} from 'react'
import {Flex} from 'antd-mobile';

import backY from '../../../assets/back-y.png';
import backB from '../../../assets/back-b.png';
import tag from '../../../assets/tag.png';

import './prizeList.less'

// 列表
function Items(props) {
    const listData = props.data;
    //  列表
    const listItems = listData.map((item, index) => {
        const textContentClass = (item.rewardSerial === '30_4') ? 'yellow' : 'blue';
        let price = 0;
        switch (item.rewardSerial) {
            case '30_4':
                price = 30;
                break;
            case '5_29':
                price = 5;
                break;
            case '3_99999_BI':
                price = 3;
                break;
            default:
                price = 2;
        }
        return (<li key={index}>
            {(textContentClass === 'yellow') ? (
                <img src={backY} alt=""/>
            ) : (
                <img src={backB} alt=""/>
            )}

            <Flex className={'text-content ' + textContentClass}>
                <div className='left'>
                    <p>¥<span>{price}</span>元
                        {item.num &&
                        <i className='number'>*{item.num}张</i>
                        }
                    </p>
                </div>
                <p className='border-1px-v'></p>
                <div className='right'>
                    <h6>{item.rewardContent}</h6>
                    <p>有效期至{item.validityTime}</p>
                </div>
            </Flex>

            <img className='tag' src={tag} alt=""/>

            {item.remark &&
            <p className='remark'><span>※</span><i>{item.remark}</i></p>
            }
        </li>)
    })
    return listItems;
}

class prizeList extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const listData = this.props.data;
        return (
            <div className='list-wrap'>
                <h5 className='caption'>
                    <p>
                        <span className='border-1px-h'></span>购油代金券<span className='border-1px-h'></span>
                    </p>
                </h5>
                <ul><Items data={listData}></Items></ul>
            </div>
        )
    }
}

export default prizeList;