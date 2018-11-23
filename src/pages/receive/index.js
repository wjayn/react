import React, {Component} from 'react';
import configAxios from '../../ConfiguredAxios';
import BindPhone from '../../components/bindPhone/bindPhone';

import top from '../../assets/image/receive-top.png';
import './index.css';

const apiUrl = {
    receiveUrl: '/winstar-api/api/v1/orders/weekendBrand/noauth/weekendGiveCoupon'
}

class ReceiveIndex extends Component {
    initData = () => {
        if (!localStorage.getItem('tokenId')) {
            setTimeout(this.initData, 1000);
        }
    }
    // 立即领取
    receiveApi = (params) => {
        let data = {
            "orderId": "ff8080816512352e016521c2e5e60091",
            "account": params.mobile,
            "alias": "2",
            "msgVerifyCode": params.msgVerifyCode,
            "msgVerifyId": params.msgVerifyId,
            "password": "",
            "visitType": 2
        }
        console.log("提交数据");
        console.log(data);
        configAxios.doPost(apiUrl.receiveUrl, data, false,{
            headers: {
                "token_id": localStorage.getItem('tokenId')
            }
        }).then((res) => {
            console.log('领取成功');
            console.log(res);
            //  领取成功跳转already.js
            // this.props.history.push('/receive/already');
            //  没有优惠券跳转no.js
            // this.props.history.push('/receive/no');
        }).catch(() => {
        });
    }

    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        console.log(this.props.match.params.orderId);
    }

    render() {
        return (
            <div className='receive'>
                <img src={top} alt="" className='top'/>
                <div className='info-wrap'>
                    <div className='box'>
                        <BindPhone caption='送您一张5元加油优惠券' borderClass='border-all' onBtnClick={this.receiveApi}
                                   btnText='立即领取'></BindPhone>
                        <dl className='text-box'>
                            <dt className='ac'><p><b>优惠券使用规则</b></p></dt>
                            <dd className='flex'>
                                <span>1、</span>
                                <span>该优惠券仅限在“优驾行”公众号购买油卡使用，不兑现不找零；</span>
                            </dd>
                            <dd className='flex'>
                                <span>2、</span>
                                <span>该优惠券可用于除“周六品牌日”油券之外的其他任何油券购买；</span>
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

export default ReceiveIndex;