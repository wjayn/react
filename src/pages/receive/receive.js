import React, {Component} from 'react';
import BindPhone from '../../components/bindPhone/bindPhone';

import top from '../../assets/image/receive-top.png';

import './receive.css';

class receive extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
    }

    test = (options) => {
        console.log(options);
    }

    render() {
        return (
            <div className='receive'>
                <img src={top} alt="" className='top'/>
                <div className='info-wrap'>
                    <div className='box'>
                        <BindPhone caption='送您一张5元加油优惠券' borderClass='border-all' onBtnClick={this.test}></BindPhone>
                        <dl className='text-box'>
                            <dt className='ac'><p><b>优惠券使用规则</b></p></dt>
                            <dd className='flex'>
                                <span>1、</span>
                                <span>该优惠券仅限在“优驾行”公众号购买油卡使用，不兑现不找零；</span>
                            </dd>
                            <dd className='flex'>
                                <span>2、</span>
                                <span>该优惠券可用于除“超级品牌日”油券之外的其他任何油券购买；</span>
                            </dd>
                            <dd className='flex'>
                                <span>3、</span>
                                <span>该优惠券新老用户均可使用；</span>
                            </dd>
                            <dd className='flex'>
                                <span>4、</span>
                                <span>该优惠券有效期为领取之日起30天有效；</span>
                            </dd>
                            <dd className='flex'>
                                <span>5、</span>
                                <span>其他未尽事宜，请咨询客服:<br/>400-801-2122。</span>
                            </dd>
                        </dl>
                    </div>
                </div>
            </div>
        )
    }
}

export default receive;