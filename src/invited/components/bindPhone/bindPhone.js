import React, {Component} from 'react';
import {Toast, Flex, InputItem, Button} from 'antd-mobile';
import configuredAxios from '../../../ConfiguredAxios';

import Popup from '../popup/popup';

import 'antd-mobile/dist/antd-mobile.css';
import './bindPhone.less';
import {receiveInvite, activeStatusUrl, verifyImgCodeUrl, verifyUrl, verifyImgUrl} from "../../apiUrl";

class BindPhone extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,   // 手机号码是否正确的状态
            phone: '',  // 手机号码
            text: '获取验证码', // 短信验证码按钮的文本
            count: 60,  // 短信验证码倒计时
            canClick: true, //  短信验证码按钮是否可点击
            verifyImg: '',  // 图片验证码地址
            imgCode: '', // 用户输入的图片验证码
            msgCode: '', // 用户输入的短信验证码
            activeEnd: false, // 活动是否结束
            canSubmit: false, // 领取礼包按钮是否可以点击
            msgVerifyId: 0 // 短信验证码序号
        }
    }

    componentDidMount() {
        this.getVerifyImg();
    }

    // 手机号码文本框失去焦点
    phoneBlur = (phone) => {
        let hasError = false;
        if (!phoneVerify(phone)) {
            hasError = true;
        }
        this.setState({
            hasError: hasError
        })
    }

    // 同步state
    inputChange = (key, e) => {
        this.setState({
            [key]: e
        })
    }

    render() {
        return (
            <div className='bind-phone'>
                <div className='form-wrap'>
                    <div className='box'>
                        <div className='caption'>请先绑定手机</div>
                        <InputItem className='input mb-24' type="phone" placeholder="请输入手机号码"
                                   error={this.state.hasError}
                                   onErrorClick={this.onErrorClick} onBlur={this.phoneBlur}
                                   phone={this.state.value} onChange={this.inputChange.bind(this, 'phone')}></InputItem>
                        <Flex className='verify-pic mb-24'>
                            <InputItem className='input' placeholder='请输入验证码' maxLength='4'
                                       onChange={this.inputChange.bind(this, 'imgCode')}></InputItem>
                            <img src={this.state.verifyImg} alt="验证码" onClick={this.getVerifyImg}/>
                        </Flex>
                        <Flex className='verify'>
                            <InputItem className='input' type='digit' placeholder='请输入验证码' maxLength='6'
                                       onChange={this.inputChange.bind(this, 'msgCode')}></InputItem>
                            <Button disabled={!this.state.canClick} onClick={this.getVerify} className='btn' inline
                                    size='small'>{this.state.text}</Button>
                        </Flex>
                        <Button disabled={!this.state.canSubmit} className='btn' onClick={this.formSubmit}>领取礼包</Button>
                    </div>
                </div>
                <Popup modal1={this.state.activeEnd}>
                    <div className='text-content'>
                        <p>加入优驾行，我和你都将获得</p>
                        <p>150元大礼包一份！</p>
                        <p>下载优驾行APP，88折加油享不停！</p>
                    </div>
                </Popup>
            </div>
        )
    }

    // 倒计时
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

    //  获取图片验证码
    getVerifyImg = () => {
        Toast.loading('请稍后...', 0);
        configuredAxios.doGetImage(verifyImgUrl).then((res) => {
            let verifyImg = 'data:image/png;base64,' + btoa(
                new Uint8Array(res).reduce((data, byte) => data + String.fromCharCode(byte), '')
            );
            this.setState({
                verifyImg: verifyImg
            })
            Toast.hide();
        }).catch(() => {
            Toast.hide();
            Toast.fail('网络繁忙，请稍后再试！', 2);
        })
    }

    // 验证图片验证码
    picTextVerifyApi = (options) => {
        configuredAxios.doGet(verifyImgCodeUrl + options.imgCode).then((res) => {
            options.success(res);
        }).catch(() => {
            Toast.fail('请输入正确的图片验证码！', 2);
        })
    }

    // 发送短信验证码
    sendMessage = (params) => {
        const phone = this.state.phone.replace(/\s/g, '');
        const data = {
            "checkId": params.checkId,
            "phoneNumber": phone,
            "types": "1",
            "autograph": "1",
            "appSecret": "1"
        }
        configuredAxios.doPost(verifyUrl, data, true).then((res) => {
            Toast.hide();
            this.startCountDown();
            // 领取礼包按钮可点击
            this.setState({
                canSubmit: true,
                msgVerifyId: res.text
            })
        }).catch(() => {
            Toast.hide();
            Toast.fail('网络繁忙，请稍后再试！', 2);
        })
    }

    // 点击[获取验证码]按钮
    getVerify = () => {
        // 1、验证图片验证码是否规范
        const imgCode = this.state.imgCode;
        const phone = this.state.phone;
        if (phoneVerify(phone) && picTextVerify(imgCode)) {
            Toast.loading('请稍后...', 0);
            this.picTextVerifyApi({
                imgCode: imgCode,
                success: (res) => {
                    // 2.发送短信验证码
                    this.sendMessage(res);
                }
            });
        }
        if (!phoneVerify(phone)) {
            Toast.fail('请输入正确的手机号码！', 2);
        }
    }

    // 领取礼包
    formSubmit = () => {
        const phone = this.state.phone;
        if (!phoneVerify(phone)) Toast.fail('请输入正确的手机号码！', 2);

        const imgCode = this.state.imgCode;
        const msgCode = this.state.msgCode;

        if (phoneVerify(phone) && picTextVerify(imgCode) && msgVierfy(msgCode)) {
            // 1、查询活动是否结束；
            Toast.loading("请稍后...", 0);
            this.activeStatus({
                success: () => {
                    // 2、接受邀请
                    this.receiveInvite();
                }
            });
        }
        return false;
    }

    // 接受邀请
    receiveInvite = () => {
        let phone = this.state.phone.replace(/\s/g, '');
        let data = {
            "inviteAccount": this.props.inviteAccount,
            "account": phone,
            "alias": "2",
            "msgVerifyCode": this.state.msgCode,
            "msgVerifyId": this.state.msgVerifyId,
            "password": "",
            "visitType": 2
        }
        configuredAxios.doPost(receiveInvite, data, false).then((res) => {
            Toast.hide();
            if (res.code === 'success') {
                this.props.onSkipQRCode();
            }else{
                Toast.fail(res.message, 2);
            }
        }).catch(() => {
            Toast.hide();
        })
    }

    // 查询活动是否结束；
    activeStatus = (options) => {
        configuredAxios.doGet(activeStatusUrl).then((res) => {
            if (res === 'OK') {
                options.success();
            } else {
                Toast.hide();
                this.setState({
                    activeEnd: true
                })
            }
        })
    }
}

// 验证手机号码
function phoneVerify(str) {
    let phoneReg = /^1[0-9]{10}/;
    let phone = str.replace(/\s/g, '');
    if (phone.length === 11 && phoneReg.test(phone)) {
        return true;
    }
    return false;
}

// 验证短信验证码是否输入
function msgVierfy(str) {
    let msgReg = /^[0-9]{6}$/;
    if (msgReg.test(str)) {
        return true;
    }
    Toast.fail('请输入正确的短信验证码！', 2);
    return false;
}

// 验证用户输入的图片验证码是否规范
function picTextVerify(text) {
    let picTextReg = /^[0-9a-zA-Z]{4}$/;
    if (picTextReg.test(text)) {
        return true;
    }
    Toast.fail('请输入正确的图片验证码！', 2);
    return false;
}

export default BindPhone;