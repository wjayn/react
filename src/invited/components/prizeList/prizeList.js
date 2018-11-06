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
        const textContentClass = (index === 0) ? 'yellow' : 'blue';
        return (<li key={index}>
            {(index === 0) ? (
                <img src={backY} alt=""/>
            ) : (
                <img src={backB} alt=""/>
            )}

            <Flex className={'text-content ' + textContentClass}>
                <div className='left'>
                    <p>¥<span>{item.price}</span>元
                        {item.num &&
                        <i className='number'>*{item.num}张</i>
                        }
                    </p>
                </div>
                <p className='border-1px-v'></p>
                <div className='right'>
                    <h6>{item.title}</h6>
                    <p>有效期至{item.date}</p>
                </div>
            </Flex>

            <img className='tag' src={tag} alt=""/>

            {item.remark &&
            <p className='remark'><span>※</span> {item.remark}</p>
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