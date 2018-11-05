import React, {Component} from 'react';
import {Flex, InputItem, Button} from 'antd-mobile';

import ad from '../../../assets/ad.png';
import 'antd-mobile/dist/antd-mobile.css';
import './bindPhone.less';


class BindPhone extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputError: false,
            phone: '',
            text: '获取验证码',
            count: 60,
            canClick: true
        }
    }

    componentDidMount(){

    }


    // 手机号码文本框失去焦点
    phoneBlur = (phone) => {
        if (phone.replace(/\s/g, '').length < 11) {
            this.setState({
                hasError: true,
            });
        } else {
            this.setState({
                hasError: false,
            });
        }
    }

    // 手机文本框改变
    phoneChange = (phone) => {
        this.setState({
            phone: phone
        })
    }

    startCountDown = () => {
        if (this.state.count > 0) {
            this.setState({
                text: this.state.count + 's后重新获取',
                count: this.state.count - 1,
                canClick: false
            })
            setTimeout(() => {
                this.startCountDown();
            }, 1000)
        } else {
            this.setState({
                text: '获取验证码',
                count: 60,
                canClick: true
            });
        }
    }


    render() {
        return (
            <div className='bind-phone container-ljj'>
                <div className='title'>
                    <p>加入优驾行，我和你都将获得</p>
                    <p>150元大礼包一份！</p>
                </div>
                <div className='form-wrap'>
                    <div className='box'>
                        <div className='caption'>请先绑定手机</div>
                        <InputItem className='input' type="phone" placeholder="请输入手机号码" error={this.state.hasError}
                                   onErrorClick={this.onErrorClick} onBlur={this.phoneBlur}
                                   phone={this.state.value} onChange={this.phoneChange}></InputItem>
                        <Flex className='verify'>
                            <InputItem className='input' type='digit' placeholder='请输入验证码' maxLength='6'></InputItem>
                            <Button disabled={!this.state.canClick} onClick={this.startCountDown} className='btn' inline
                                    size='small'>{this.state.text}</Button>
                        </Flex>
                        <Button className='btn'>领取礼包</Button>
                    </div>
                </div>
                <div className='desc'>
                    <p>11月9日——11月11日期间，通过该页面注册优驾行，您和邀请您的好友都可免费领取价值150元的优驾行大礼包一份，内含50元购油代金券、包邮并免费使用电信惠民生活卡一个月、惠民补贴等多重惊喜。</p>
                    <p>同时优驾行APP还有还有100%中奖的抽奖，延长壳牌加油券、西安咸阳机场头等舱通道，手机代金券等等应有尽有。</p>
                </div>
                <div className='ad'>
                    <img src={ad} alt=""/>
                </div>
            </div>
        )
    }

    // 获取图片验证码
    getPicVerify = () => {

    }
}

export default BindPhone;