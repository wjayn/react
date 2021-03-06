import React, {Component} from 'react';
import {Toast, Flex, InputItem, Button} from 'antd-mobile';
import configuredAxios from '../../ConfiguredAxios';

import 'antd-mobile/dist/antd-mobile.css';
import './bindPhone.less';
import {verifyImgCodeUrl, verifyUrl, verifyImgUrl} from "./apiUrl";

class BindPhone extends Component {
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
    // 倒计时
    startCountDown = () => {
        if (this.isUnmount)
            return;
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
            if(this.isUnmount){
                return;
            }
            let verifyImg = 'data:image/png;base64,' + btoa(
                new Uint8Array(res).reduce((data, byte) => data + String.fromCharCode(byte), '')
            );
            this.setState({
                verifyImg: verifyImg
            })
            Toast.hide();
        }).catch(() => {
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
            if(this.isUnmount)
                return;
            Toast.hide();
            this.startCountDown();
            // 提交按钮可点击
            this.setState({
                canSubmit: true,
                msgVerifyId: res.text
            })
        }).catch(() => {
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
            let params = {
                mobile: this.state.phone,
                msgVerifyCode: this.state.msgCode,
                msgVerifyId: this.state.msgVerifyId,
            }
            this.props.onBtnClick(params);
        }
        return false;
    }

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
        this.isUnmount = false;
        this.getVerifyImg();
    }

    componentWillUnmount(){
        this.isUnmount = true;
    }

    render() {
        let borderClass = this.props.borderClass || '';
        return (
            <div className={`bind-phone ${borderClass}`}>
                <div className='form-wrap'>
                    <div className='box'>
                        <div className='caption'>{this.props.caption}</div>
                        <InputItem className='input mb-24' type="digit" placeholder="请输入手机号码"
                                   error={this.state.hasError}
                                   onErrorClick={this.onErrorClick} onBlur={this.phoneBlur}
                                   phone={this.state.value} onChange={this.inputChange.bind(this, 'phone')}></InputItem>
                        <Flex className='verify-pic mb-24'>
                            <InputItem className='input' placeholder='请输入图片验证码' maxLength='4'
                                       onChange={this.inputChange.bind(this, 'imgCode')}></InputItem>
                            <img src={this.state.verifyImg} alt="验证码" onClick={this.getVerifyImg}/>
                        </Flex>
                        <Flex className='verify'>
                            <InputItem className='input' type='digit' placeholder='请输入验证码' maxLength='6'
                                       onChange={this.inputChange.bind(this, 'msgCode')}></InputItem>
                            <Button disabled={!this.state.canClick} onClick={this.getVerify} className='btn' inline
                                    size='small'>{this.state.text}</Button>
                        </Flex>
                        <Button disabled={false && !this.state.canSubmit} className='btn' onClick={this.formSubmit}>{this.props.btnText}</Button>
                    </div>
                </div>
            </div>
        )
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