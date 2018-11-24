import React, {Component} from 'react';
import configAxios from '../../ConfiguredAxios';
import BindPhone from '../../components/bindPhone/bindPhone';
import Tool from '../../tools'
import top from '../../assets/image/receive-top.png';
import './index.css';
import getToken from '../../getToken'
import fx from '../../fx'

const apiUrl = {
    receiveUrlApp: '/wechat_access/api/v1/orders/weekendBrand/noauth/weekendGiveCoupon',
    receiveUrl: '/ccb-api/api/v1/cbc/weekendBrand/receiveRedPackage'
}

class ReceiveIndex extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        this.initParams();
        fx.judgeShareCondition('receive');
    }


    initParams() {
        let orderId = this.props.match.params.orderId;
        let isApp = Tool.getParams(this.props.location.search, 'isApp');
        if (orderId && isApp === '0') {// 微信
            localStorage.setItem('orderId', orderId);
            localStorage.setItem('isApp', '0');
        } else if (orderId) { // APP
            localStorage.setItem('orderId', orderId);
            localStorage.setItem('isApp', '1');
            isApp = '1';
        } else { // PHP
            orderId = localStorage.getItem('orderId');
            isApp = localStorage.getItem('isApp');
        }

        if (isApp === '0') {
            getToken.autoGetToken('weekendShare').then(res => {
                console.log(res)
            });
        }

        this.setState({
            isApp,
            orderId
        });
    }

    // 立即领取
    receiveApi(params) {
        let data = {}, url = '', header = {};
        let {isApp, orderId} = this.state;
        if (isApp === '0') {
            data = {
                "mobile": params.mobile,
                "msgVerifyCode": params.msgVerifyCode,
                "msgVerifyId": params.msgVerifyId,
                "orderId": orderId
            }
            url = apiUrl.receiveUrl;
            header.headers = {
                "token_id": localStorage.getItem('ccbToken')
            }
        } else {
            data = {
                "orderId": orderId,
                "account": params.mobile,
                "alias": "2",
                "msgVerifyCode": params.msgVerifyCode,
                "msgVerifyId": params.msgVerifyId,
                "password": "",
                "visitType": 2
            }
            url = apiUrl.receiveUrlApp;
        }

        if (url) {
            configAxios.doPost(url, data, false, header).then((res) => {
                console.log('领取成功');
                console.log(res);
                //  领取成功跳转already.js
                this.props.history.push(`/already?received=${res.receiveStatus}`);
            }).catch((err) => {
                //  没有优惠券跳转no.js
                if (err.code === 'noRedPackageLeft.ordersRedPackageInfo.NotRule'){
                    this.props.history.push('/no');
                }

                console.log(err);

            });
        }
    }

    render() {
        return (
            <div className='receive'>
                <img src={top} alt="" className='top'/>
                <div className='info-wrap'>
                    <div className='box'>
                        <BindPhone caption='送您一张5元加油优惠券' borderClass='border-all'
                                   onBtnClick={this.receiveApi.bind(this)}
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