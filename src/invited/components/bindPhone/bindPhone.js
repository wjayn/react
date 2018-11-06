import React, {Component} from 'react';
import {Toast, Flex, InputItem, Button} from 'antd-mobile';
import configuredAxios from '../../../ConfiguredAxios'

import 'antd-mobile/dist/antd-mobile.css';
import './bindPhone.less';
import {verifyImgCodeUrl, verifyUrl, verifyImgUrl} from "../../apiUrl";
import axios from "axios/index";

const ERR_OK = 200;

// 验证手机号码
function phoneVerify(str) {
    let phoneReg = /^1[0-9]{10}/;
    let phone = str.replace(/\s/g, '');
    if (phone.length === 11 && phoneReg.test(phone)) {
        return true;
    }
    Toast.fail('请输入正确的手机号码！', 2);
    return false;
}

// 验证用户输入的图片验证码是否规范
function picTextVerify(text) {
    let picTextReg = /^[0-9a-zA-Z]{4}/;
    if (picTextReg.test(text)) {
        return true;
    }
    Toast.fail('请输入正确的图片验证码！', 2);
    return false;
}


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
            imgCode: '' // 用户输入的图片验证码
        }
    }

    componentDidMount() {
        this.getVerifyImg();
    }

    // 手机号码文本框失去焦点
    phoneBlur = (phone) => {
        console.log(phoneVerify(phone))
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
            <div className='bind-phone'>
                <div className='form-wrap'>
                    <div className='box'>
                        <div className='caption'>请先绑定手机</div>
                        <InputItem className='input mb-24' type="phone" placeholder="请输入手机号码"
                                   error={this.state.hasError}
                                   onErrorClick={this.onErrorClick} onBlur={this.phoneBlur}
                                   phone={this.state.value} onChange={this.inputChange.bind(this, 'phone')}></InputItem>
                        <Flex className='verify-pic mb-24'>
                            <InputItem className='input' type='digit' placeholder='请输入验证码' maxLength='6'
                                       onChange={this.inputChange.bind(this, 'imgCode')}></InputItem>
                            <img src={this.state.verifyImg} alt="验证码" onClick={this.getVerifyImg}/>
                        </Flex>
                        <Flex className='verify'>
                            <InputItem className='input' type='digit' placeholder='请输入验证码' maxLength='6'></InputItem>
                            <Button disabled={!this.state.canClick} onClick={this.getVerify} className='btn' inline
                                    size='small'>{this.state.text}</Button>
                        </Flex>
                        <Button className='btn'>领取礼包</Button>
                    </div>
                </div>
            </div>
        )
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
            if (res.status === 200) {
                options.success(res.data);
            }
        }).catch((res)=>{
            Toast.fail('网络繁忙，请稍后再试！', 2);
        })
    }

    // 发送短信验证码
    sendMessage = (data) => {
        const phone = this.state.phone.replace(/\s/g, '');
        const params = {
            'checkId': data.checkId,
            'phoneNumber': phone,
            'types': 1,
            'autograph': 1,
            'appSecret': 1,
        }
        axios.post(verifyUrl, params).then((res) => {

        })
    }

    // 点击[获取验证码]按钮
    getVerify = () => {
        // 1、验证图片验证码是否规范
        const imgCode = this.state.imgCode;
        const phone = this.state.phone;
        if (phoneVerify(phone) && picTextVerify(imgCode)) {
            this.picTextVerifyApi({
                imgCode: imgCode,
                success: (res) => {
                    // 2.发送短信验证码
                    this.sendMessage(res);
                }
            });
        }
    }
}

export default BindPhone;